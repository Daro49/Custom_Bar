import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { activeUser } from '@/stores/Login.js'
import User from '@/stores/User.js'
import Header from '@/components/Header.vue'
import pastOrders from "@/assets/OrderHistory.svg?raw";
import { addPoints } from './AddPoints'
import { removePackageFromOrder } from './CSModels/Packages'
import { getMilestonesOfUser, milestones, setMilestonesOfUser } from './CSModels/Milestones'
import { addToast } from './ToastStore'
import { userCoupons, getUserCoupons } from './CSModels/Coupons'

export default {
    name: 'OrderView',
    components: { Header },
    setup(props, { expose }) {
        const router = useRouter()
        const orderItems = ref([])
        const isLoading = ref(true)
        const error = ref(null)

        const goOrderHistory = () => {
            router.push('/orders')
        }

        /**
         * Fetches the current active order items for the logged-in user.
         * Updates orderItems state or handles fetch errors.
         */
        const fetchOrder = async () => {
            try {
                isLoading.value = true
                const username = activeUser.value.username
                const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order`)
                if (!response.ok) throw new Error('Failed to fetch order')
                const data = await response.json()
                orderItems.value = data
                console.log('Order items fetched:', data)
            } catch (err) {
                console.error('Error fetching order:', err)
                error.value = err.message
            } finally {
                isLoading.value = false
            }
        }

        /**
         * Handles the complete order confirmation flow.
         * Processes milestones, calculates final price with coupons, sends POST request,
         * updates local user storage, and awards points based on the final total.
         */
        const confirmOrder = async () => {
            try {
                const username = activeUser.value.username
                // get milestones to keep track of progress
                await getMilestonesOfUser();

                const { euroTotal, usedCouponIds } = calculateOrderTotals(orderItems.value);
                const { updates, milestoneReached } = await getMilestoneUpdates(euroTotal);

                if (updates.length > 0) {
                    await setMilestonesOfUser(updates);
                }
                // confirm order 
                const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order/confirm`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ price: euroTotal })
                })
                if (!response.ok) throw new Error('Failed to confirm order')
                const data = await response.json()
                console.log('Order confirmed:', data)
                const newExpirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
                await fetch(`https://itu-wb12.onrender.com/users/${username}/table/select`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tableCode: activeUser.value.table, expirationTime: newExpirationTime })
                });
                const newUser = new User(
                    activeUser.value.username,
                    activeUser.value.points,
                    activeUser.value.email,
                    activeUser.value.table,
                    newExpirationTime
                );
                activeUser.value = newUser.toJSON();
                localStorage.setItem('activeUser', JSON.stringify(activeUser.value));
                orderItems.value = []
                // if user had activated coupons 
                console.log(euroTotal);
                userCoupons.value = userCoupons.value.filter(c => !usedCouponIds.includes(c.id));
                if (usedCouponIds.length > 0) {
                    for (const id of usedCouponIds) {
                        await fetch(`https://itu-wb12.onrender.com/coupons/${username}/remove/${id}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }
                    await getUserCoupons(username);
                }

                alert('Order confirmed! Thank you for your purchase.')
                if (milestoneReached) addToast("Milestone reached, check it in milestones!");
                if (euroTotal) await addPoints(Math.floor(euroTotal));
                router.push('/')
            } catch (err) {
                console.error('Error confirming order:', err)
                alert('Failed to confirm order: ' + err.message)
            }
        }

        /**
         * Main action handler for the primary order button.
         * Redirects to menu if empty, otherwise triggers confirmOrder.
         */
        const handleButtonClick = () => {
            if (orderItems.value.length === 0) {
                router.push('/menu')
            } else {
                confirmOrder()
            }
        }

        onMounted(async () => {
            fetchOrder()
            //check just in case 
            if (activeUser.value?.username) {
                await getUserCoupons(activeUser.value.username);
            }
        })

        /**
         * Removes a specific item from the order based on its ID and class.
         * @param {Object} item - The item object to remove.
         */
        async function removeFromOrder(item) {
            const username = activeUser.value.username;

            if (!item.id || !item.class) {
                console.error("Error: invalid order object.");
                return;
            }

            try {
                const res = await fetch(
                    `https://itu-wb12.onrender.com/users/${username}/order/remove`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ itemId: item.id, itemClass: item.class }),
                    }
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const result = await res.json();
                orderItems.value = result.order;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }

        async function removePackage(pkg) {
            const result = await removePackageFromOrder(activeUser.value.username, pkg.id);
            if (!result) {
                addToast("Cannot remove package");
                return;
            }
            const result2 = await addPoints(pkg.price);
            if (!result2) {
                addToast("Error occured while removing package");
            }
            fetchOrder();
        }

        async function addToOrder(item) {
            if (!activeUser.value?.username || !activeUser.value?.table || activeUser.value?.table === 'N/A') {
                throw new Error("User not logged in or table not set");
            }
            const username = activeUser.value.username;
            const payload = {
                item,
                tableCode: activeUser.value.table
            };
            try {
                const res = await fetch(
                    `https://itu-wb12.onrender.com/users/${username}/order/add`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    }
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const result = await res.json();
                orderItems.value = result.order;
                return result;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }

        /** * Calculates totals for drinks and packages. 
         * Functions calculates price with activated coupons included. 
         * @param {Array} items - The array of items in the order 
         * @returns {Object} - Object containing euroTotal and pointsTotal 
         */
        function calculateOrderTotals(items) {
            if (!items || items.length === 0) return { euroTotal: 0, usedCouponIds: [] };
            // Count basic price 
            let subtotal = items
                .filter(item => !item.isCoupon && item?.class !== "pkg") // do not count coupon price 
                .reduce((acc, item) => acc + ((item.quantity || 0) * (item.price || 0)), 0);
            let discountAmount = 0;
            let usedCouponIds = [];

            // Go through coupons 
            for (const coupon of userCoupons.value) {
                let applied = false;
                // Percentage discount 
                if (coupon.discount.includes('%')) {
                    const percentage = parseInt(coupon.discount) / 100;
                    discountAmount += subtotal * percentage;
                    applied = true;
                }
                // Eur discount 
                else if (coupon.discount.includes('€')) {
                    const eurosOff = parseFloat(coupon.discount);
                    discountAmount += eurosOff;
                    applied = true;
                }

                else if (coupon.discount === 'free') {

                    //Most expensive drink free 
                    if (coupon.code === "FREEDRINK") {
                        availableForDiscount.sort((a, b) => b.price - a.price);
                        if (availableForDiscount.length > 0) {
                            const freeItem = availableForDiscount.shift();
                            discountAmount += freeItem.price;
                            applied = true;
                        }
                    }

                    //N for M 
                    else if (coupon.code.includes("FOR")) {
                        const parts = coupon.code.split("FOR");
                        const N = parseInt(parts[0]);
                        const M = parseInt(parts[1]);

                        for (const item of items) {
                            if (item.quantity >= N) {
                                const setsOfN = Math.floor(item.quantity / N); // how much discounts available 
                                const freeItemsCount = setsOfN * M;
                                discountAmount += freeItemsCount * item.price;
                                applied = true;
                            }
                        }
                    }
                }
                if (applied) {
                    usedCouponIds.push(coupon.id);
                }
            }

            return {
                euroTotal: Math.max(0, subtotal - discountAmount),
                usedCouponIds
            };
        }

        async function getMilestoneUpdates(currentEuroTotal) {
            const updates = [];
            let milestoneReached = false;
            for (const m of milestones.value) {
                if (m.progress < m.goal) {
                    let newProgress = m.progress;
                    // check for type of milestone                     
                    if (m.class === "orderCount") {
                        const countInOrder = orderItems.value
                            .filter(item => item.name.includes(m.drink))
                            .reduce((sum, item) => sum + (item.quantity || 1), 0);
                        // nothing to check 
                        if (countInOrder <= 0) continue;

                        newProgress = m.type === "total" ? m.progress + countInOrder : Math.max(m.progress, countInOrder);
                    } else {
                        newProgress = m.type === "total" ? m.progress + currentEuroTotal : Math.max(m.progress, currentEuroTotal);
                    }

                    const cappedProgress = Math.min(newProgress, m.goal);

                    if (cappedProgress > m.progress) {
                        updates.push({ id: m.id, progress: cappedProgress });

                        if (cappedProgress === m.goal) {
                            milestoneReached = true;
                        }
                    }
                }
            }
            return { updates, milestoneReached };
        }

        // reactive var for order button 
        const buttonText = computed(() => {
            if (!orderItems.value || orderItems.value.length === 0) {
                return 'ORDER SOMETHING';
            }

            const { euroTotal, } = calculateOrderTotals(orderItems.value);

            return 'PAY ' + `${euroTotal.toFixed(2)}€`;
        });

        const exposed = {
            orderItems,
            isLoading,
            error,
            goOrderHistory,
            handleButtonClick,
            removeFromOrder,
            addToOrder,
            pastOrders,
            removePackage,
            buttonText,
            userCoupons,
        }
        expose(exposed)
        return exposed
    }
}
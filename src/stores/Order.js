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

        /**
         * Navigates the user to the past orders history page.
         */
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
                // Fetch milestones to keep track of current progress
                await getMilestonesOfUser();

                const { euroTotal, usedCouponIds } = calculateOrderTotals(orderItems.value);
                const { updates, milestoneReached } = await getMilestoneUpdates(euroTotal);

                // Update milestone progress if any changes occurred
                if (updates.length > 0) {
                    await setMilestonesOfUser(updates);
                }

                // Final order confirmation request to the backend
                const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order/confirm`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ price: euroTotal })
                })
                if (!response.ok) throw new Error('Failed to confirm order')

                // Update table selection expiration
                const newExpirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
                await fetch(`https://itu-wb12.onrender.com/users/${username}/table/select`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tableCode: activeUser.value.table, expirationTime: newExpirationTime })
                });

                // Update global user state
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

                // Cleanup used coupons locally and on server
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
                if (euroTotal > 0) await addPoints(Math.floor(euroTotal));
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
            // only purchasable items
            const realItems = orderItems.value.filter(item => item.class !== "coupon");
            if (realItems.length === 0) {
                router.push('/menu');
            } else {
                confirmOrder();
            }
        }

        onMounted(async () => {
            fetchOrder()
            if (activeUser.value?.username) {
                await getUserCoupons(activeUser.value.username);
            }
        })

        /**
         * Removes a specific drink or item from the order based on its ID and class.
         * @param {Object} drink - The drink object to remove.
         */
        async function removeFromOrder(drink) {
            if (!activeUser.value?.username || !activeUser.value?.table || activeUser.value?.table === 'N/A') {
                throw new Error("User not logged in or table not set");
            }
            if (!drink.id || !drink.class) {
                throw new Error("Error: Drink object is missing ID or CLASS.");
            }
            const username = activeUser.value.username;
            try {
                const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order/remove`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ drinkId: drink.id, drinkClass: drink.class, tableCode: activeUser.value.table }),
                });
                const result = await response.json();
                if (response.ok) {
                    orderItems.value = result.order || result.items;
                    return result;
                }
            } catch (err) { console.error(err); throw err; }
        }

        /**
         * Removes an experience package from the current order.
         * Returns points back to the user since packages are pre-paid.
         * @param {Object} pkg - The package object to remove.
         */
        async function removePackage(pkg) {
            const result = await removePackageFromOrder(activeUser.value.username, pkg.id);
            if (!result) return;
            await addPoints(pkg.price);
            fetchOrder();
        }

        /**
         * Adds a specific drink to the current order on the server.
         * @param {Object} drink - The drink object to add.
         */
        async function addToOrder(drink) {
            if (!activeUser.value?.username || !activeUser.value?.table) throw new Error("Missing user/table");
            try {
                const response = await fetch(`https://itu-wb12.onrender.com/users/${activeUser.value.username}/order/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ drink, tableCode: activeUser.value.table })
                });
                const result = await response.json();
                if (response.ok) {
                    orderItems.value = result.order || result.items;
                    return result;
                }
            } catch (err) { console.error(err); throw err; }
        }

        /**
         * Logic to calculate the final price after applying activated coupons.
         * Handles percentage, fixed EUR discounts, and special coupons like 1+1 or Free Drink.
         * @param {Array} items - List of items in the order.
         * @returns {Object} - euroTotal and usedCouponIds.
         */
        function calculateOrderTotals(items) {
            if (!items || items.length === 0) return { euroTotal: 0, usedCouponIds: [] };

            let subtotal = items
                .filter(item => item?.class !== "coupon" && item?.class !== "pkg")
                .reduce((acc, item) => acc + ((item.quantity || 0) * (item.price || 0)), 0);

            let discountAmount = 0;
            let usedCouponIds = [];

            // Prepare pool of items for free-item allocation
            let availableForDiscount = items
                .filter(item => item?.class !== "coupon" && item?.class !== "pkg")
                .flatMap(item => Array(item.quantity || 1).fill({ ...item, quantity: 1 }));

            for (const coupon of userCoupons.value) {
                let applied = false;
                if (coupon.discount.includes('%')) {
                    discountAmount += subtotal * (parseInt(coupon.discount) / 100);
                    applied = true;
                } else if (coupon.discount.includes('€')) {
                    discountAmount += parseFloat(coupon.discount);
                    applied = true;
                } else if (coupon.discount === 'free') {
                    if (coupon.code === "FREEDRINK") {
                        // get the most expensive for discount
                        availableForDiscount.sort((a, b) => (b.price || 0) - (a.price || 0));
                        if (availableForDiscount.length > 0) {
                            discountAmount += (availableForDiscount.shift().price || 0);
                            applied = true;
                        }
                    } else if (coupon.code.includes("FOR")) {
                        const [required, free] = coupon.code.split("FOR").map(num => parseInt(num));

                        for (const item of items) {
                            // if count of items in order is equal or more than required, apply discount
                            if (item?.class !== "coupon" && item?.class !== "pkg" && (item.quantity || 0) >= required) {
                                // How many groups to apply
                                discountAmount += free * (item.price || 0);
                                applied = true;
                                break; // apply only once
                            }
                        }
                    }
                }
                if (applied) usedCouponIds.push(coupon.id);
            }

            return {
                euroTotal: Math.max(0, subtotal - discountAmount),
                usedCouponIds
            };
        }

        /**
         * Checks if the current order pushes the user over any milestone goals.
         * @param {Number} currentEuroTotal - The total price of the order.
         * @returns {Object} - updates (milestone progress) and milestoneReached (boolean).
         */
        async function getMilestoneUpdates(currentEuroTotal) {
            const updates = [];
            let milestoneReached = false;
            for (const m of milestones.value) {
                if (m.progress < m.goal) {
                    let newProgress = m.progress;
                    if (m.class === "orderCount") {
                        const countInOrder = orderItems.value
                            .filter(item => item?.class !== "coupon" && item.name.includes(m.drink))
                            .reduce((sum, item) => sum + (item.quantity || 1), 0);
                        if (countInOrder <= 0) continue;
                        newProgress = m.type === "total" ? m.progress + countInOrder : Math.max(m.progress, countInOrder);
                    } else {
                        newProgress = m.type === "total" ? m.progress + currentEuroTotal : Math.max(m.progress, currentEuroTotal);
                    }
                    const cappedProgress = Math.min(newProgress, m.goal);
                    if (cappedProgress > m.progress) {
                        updates.push({ id: m.id, progress: cappedProgress });
                        if (cappedProgress === m.goal) milestoneReached = true;
                    }
                }
            }
            return { updates, milestoneReached };
        }

        /**
         * Reactive computation for the bottom payment button text.
         */
        const buttonText = computed(() => {
            // only real items that can be ordered
            const realItems = orderItems.value.filter(item => item.class !== "coupon");

            // if no real order something
            if (!orderItems.value || realItems.length === 0) {
                return 'ORDER SOMETHING';
            }

            const { euroTotal } = calculateOrderTotals(orderItems.value);
            return 'PAY ' + `${euroTotal.toFixed(2)}€`;
        });

        const exposed = {
            orderItems, isLoading, error, goOrderHistory, handleButtonClick,
            removeFromOrder, addToOrder, pastOrders, removePackage, buttonText, userCoupons,
        }
        expose(exposed)
        return exposed
    }
}
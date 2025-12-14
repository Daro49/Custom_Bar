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

        const confirmOrder = async () => {
            try {
                const username = activeUser.value.username

                await getMilestonesOfUser();

                const { euroTotal } = calculateOrderTotals(orderItems.value);
                const { updates, milestoneReached } = await getMilestoneUpdates(euroTotal);

                if (updates.length > 0) {
                    await setMilestonesOfUser(updates);
                }

                const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order/confirm`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
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
                alert('Order confirmed! Thank you for your purchase.')
                if (milestoneReached) addToast("Milestone reached, check it in milestones!");
                router.push('/')
            } catch (err) {
                console.error('Error confirming order:', err)
                alert('Failed to confirm order: ' + err.message)
            }
        }

        const handleButtonClick = () => {
            if (orderItems.value.length === 0) {
                router.push('/menu')
            } else {
                confirmOrder()
            }
        }

        onMounted(() => {
            fetchOrder()
        })

        async function removeFromOrder(drink) {
            if (!activeUser.value?.username || !activeUser.value?.table || activeUser.value?.table === 'N/A') {
                throw new Error("User not logged in or table not set");
            }

            if (!drink.id || !drink.class) {
                throw new Error("Error: Drink object is missing ID or CLASS. Server cannot uniquely remove the item.");
            }

            const username = activeUser.value.username;
            const payload = {
                drinkId: drink.id,
                drinkClass: drink.class,
                tableCode: activeUser.value.table
            };

            try {
                const response = await fetch(
                    `https://itu-wb12.onrender.com/users/${username}/order/remove`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );

                const result = await response.json();

                if (response.ok) {
                    if (result.order) {
                        orderItems.value = result.order;
                    } else if (result.items) {
                        orderItems.value = result.items;
                    }
                    if (typeof result.orderLength === 'number') {
                        activeUser.value.orderLength = result.orderLength;
                    }

                    return result;
                } else {
                    const errorMessage = result.message || response.statusText;
                    throw new Error(`HTTP ${response.status}: ${errorMessage}`);
                }
            } catch (err) {
                console.error(err);
                throw err;
            }
        }

        async function removePackage(pkg) {
            const result = await removePackageFromOrder(activeUser.value.username, pkg.id);
            if (!result) {
                alert("Cannot remove package");
                return;
            }
            const result2 = await addPoints(pkg.price);
            if (!result2) {
                alert("Error occured while removing package");
            }
            fetchOrder();
        }

async function addToOrder(drink) {
    if (!activeUser.value?.username || !activeUser.value?.table || activeUser.value?.table === 'N/A') {
        throw new Error("User not logged in or table not set");
    }
    const username = activeUser.value.username;
    const payload = {
        drink,
        tableCode: activeUser.value.table
    };
    try {
        const response = await fetch(
            `https://itu-wb12.onrender.com/users/${username}/order/add`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        const result = await response.json();
        
        if (response.ok) {
            console.log("Added to server order:", result);
            if (result.order) {
                orderItems.value = result.order;
            } else if (result.items) {
                orderItems.value = result.items;
            }
            if (typeof result.orderLength === 'number') {
                activeUser.value.orderLength = result.orderLength;
                console.log(`Order length updated from server: ${result.orderLength}`);
            } else {
                console.warn("Server response did not contain orderLength.");
            }
            
            return result;
        } else {
            console.error("Server responded with error:", response.statusText);
            const errorMessage = result.message || response.statusText;
            throw new Error(`HTTP ${response.status}: ${errorMessage}`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

        /**
         * Calculates totals for drinks and packages
         * @param {Array} items - The array of items in the order
         * @returns {Object} - Object containing euroTotal and pointsTotal
         */
        function calculateOrderTotals(items) {
            if (!items || items.length === 0) {
                return { euroTotal: 0 };
            }

            return items.reduce((acc, item) => {
                // If item has quantity, count drink value
                if (item.quantity !== undefined && item.quantity !== null) {
                    acc.euroTotal += item.quantity * item.price;
                }
                return acc;
            }, { euroTotal: 0 });
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
                            .filter(item => item.name.toLowerCase().includes(m.drink.toLowerCase()))
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
            buttonText
        }
        expose(exposed)
        return exposed
    }
}

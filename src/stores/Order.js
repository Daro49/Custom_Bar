import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { activeUser } from '@/stores/Login.js'
import User from '@/stores/User.js'
import Header from '@/components/Header.vue'
import pastOrders from "@/assets/OrderHistory.svg?raw";

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
      const username = activeUser.value.username;

      if (!drink.id || !drink.class) {
        console.error("Chyba: Objekty drinku chýba ID alebo CLASS. Server nemôže položku jednoznačne odstrániť.");
        return; 
      }

      try {
        console.log("Removing from order:", drink.name, "with ID:", drink);
        const res = await fetch(
          `https://itu-wb12.onrender.com/users/${username}/order/remove`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ drinkId: drink.id, drinkClass: drink.class }),
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

    async function addToOrder(drink) {
      if (!activeUser.value?.username || !activeUser.value?.table) {
        throw new Error("User not logged in or table not set");
      }
      const username = activeUser.value.username;
      const payload = {
        drink,
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

    const exposed = {
      orderItems,
      isLoading,
      error,
      goOrderHistory,
      handleButtonClick,
      removeFromOrder,
      addToOrder,
      pastOrders
    }
    expose(exposed)
    return exposed
  }
}

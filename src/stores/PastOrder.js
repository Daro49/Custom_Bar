import { ref, onMounted } from 'vue'
import { activeUser } from '@/stores/Login.js'
import Header from '@/components/Header.vue'
import Profile from '@/assets/user.png'
import { addToast } from '@/stores/ToastStore.js';

const orderItems = ref([])
const orderDate = ref('')
const isLoading = ref(true)
const error = ref(null)
const orderIndex = ref(0)
const orderCount = ref(0)

const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

const fetchOrder = async () => {
  try {
    isLoading.value = true
    const username = activeUser.value.username
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/orders/${orderIndex.value}`)
    if (!response.ok) {
      throw new Error('No past orders')
    }
    const data = await response.json()
    orderItems.value = data.items ?? data
    orderDate.value = data.date ? formatDate(data.date) : ''
    orderCount.value = data.totalOrders ?? orderCount.value
  } catch (err) {
    console.error('Error fetching order:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const nextOrder = () => {
  if (orderCount.value === 0) return
  orderIndex.value = (orderIndex.value + 1) % orderCount.value
  fetchOrder()
}

const prevOrder = () => {
  if (orderCount.value === 0) return
  orderIndex.value = (orderIndex.value - 1 + orderCount.value) % orderCount.value
  fetchOrder()
}

onMounted(() => {
  fetchOrder()
})

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
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function handleOrder(drink) {
  try {
    await addToOrder(drink);
    addToast(`${drink.name} added to cart!`);
    console.log("Added to order:", drink.name);
  } catch (err) {
    addToast(`Failed to add to cart. Please select table first.`);
    console.error("Order failed:", err);
  }
}

export default {
  name: 'PastOrderView',
  components: { Header },
  setup() {
    return {
      orderItems,
      orderDate,
      isLoading,
      error,
      nextOrder,
      prevOrder,
      handleOrder,
      Profile
    }
  }
}

/**
 * @file Header.js
 * @brief Global store logic for the Header component.
 * @authors Matej Marušinec (xmarusm00@stud.fit.vut.cz), Samuel Kudla (xkudlas00@stud.fit.vut.cz)
 *
 * Logic for the Header component, including timer for table expiration, navigation, and user state.
 * Provides computed properties and methods for header UI and user actions.
 */
import ArrowLeftSvg from '@/assets/arrow-left-circle.svg?raw'
import PointsPresenterJukebox from '@/components/PointsPresenterJukebox.vue';
import router from '@/router'
import { activeUser, clearTable } from '@/stores/Login.js';
import { computed, ref, onBeforeUnmount, watch, onMounted } from 'vue';

/**
 * Formats a time duration in milliseconds to a human-readable string.
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time string
 */
function formatTime(ms) {
    if (ms <= 0) return '0 s';
    const totalSeconds = Math.floor(ms / 1000);
    if (totalSeconds < 60) {
        const seconds = totalSeconds % 60;
        return `${seconds} s`;
    }
    let totalMinutes = Math.floor(totalSeconds / 60);
    if (totalMinutes === 60) {
        return '59 min';
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const pad = (num) => String(num);
    if (hours > 0) {
        return `${pad(hours)}:${String(minutes).padStart(2, '0')}`;
    } else {
        return `${minutes} min`;
    }
}

/**
 * Clears the user's order on the server and resets local order length.
 * @param {string} username - Username of the active user
 */
async function clearOrderOnServer(username) {
    try {
        const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order/delete/`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            activeUser.value.orderLength = 0;
        } else {
            console.error("Failed to delete order on server:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting order on server:", error);
    }
}


/**
 * Fetches the current order length for the active user from the server and updates local state.
 */
async function fetchOrderLength() {
    if (!activeUser.value?.username) {
        activeUser.value.orderLength = 0;
        return;
    }
    const username = activeUser.value.username;
    try {
        const response = await fetch(`https://itu-wb12.onrender.com/users/${username}`);

        if (response.ok) {
            const result = await response.json();

            if (typeof result.orderLength === 'number') {
                activeUser.value.orderLength = result.orderLength;
            } else {
                activeUser.value.orderLength = 0;
            }
        } else {
            console.error("Failed to fetch user details for order length:", response.statusText);
            activeUser.value.orderLength = 0;
        }
    } catch (err) {
        console.error("Initial user fetch error:", err);
        activeUser.value.orderLength = 0;
    }
}

export default {
    name: 'Header',
    components: {
        PointsPresenterJukebox,
    },
    props: {
        showPoints: { type: Boolean, default: false },
        previous: { type: Boolean, default: false },
        backButton: { type: Boolean, default: true },
        title: { type: String, default: '' },
        avatar: { type: String, default: null },
        rightIcon: { type: String, default: null },
        rightFunction: { type: Function, default: null },
        isCart: { type: Boolean, default: false },
    },
    setup() {

        /**
         * Computed property for the currently selected table label.
         * @returns {string}
         */
        const selectedTable = computed(() => activeUser.value?.table || 'N/A');

        /**
         * Holds the remaining time (ms) until the user's table reservation expires.
         */
        const timeRemainingMs = ref(0);
        let intervalId = null;

        /**
         * Updates the timer for table expiration. If expired, clears table and order.
         * Handles all timer logic and cleanup.
         */
        const updateTimer = async () => {
            const user = activeUser.value;
            if (!user) {
                timeRemainingMs.value = 0;
                if (intervalId) { clearInterval(intervalId); intervalId = null; }
                return;
            }
            const expiration = user.tableExpiration;
            if (expiration) {
                const expiryTime = new Date(expiration).getTime();
                const now = Date.now();
                const remaining = expiryTime - now;
                timeRemainingMs.value = remaining > 0 ? remaining : 0;
                // If expired, clear table and order
                if (remaining <= 0 && user.table !== 'N/A') {
                    timeRemainingMs.value = 0;
                    const tableCodeToClear = user.table;
                    const username = user.username;
                    if (username) {
                        await clearOrderOnServer(username);
                    }
                    clearTable(tableCodeToClear);
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                }
            } else {
                timeRemainingMs.value = 0;
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }
        };

        /**
         * Starts or restarts the timer interval for updating expiration.
         * @param {number} duration - Interval duration in ms
         */
        const startInterval = (duration) => {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(updateTimer, duration);
        };

        // Watch for changes in table expiration and adjust timer interval accordingly
        watch(() => activeUser.value?.tableExpiration, (newExpiration) => {
            updateTimer();
            if (newExpiration) {
                const expiryTime = new Date(newExpiration).getTime();
                const remainingMs = expiryTime - Date.now();
                // Use 1s interval if less than 1 min left, else 1 min interval
                if (remainingMs > 0 && remainingMs < 60000) {
                    startInterval(1000);
                } else if (remainingMs >= 60000) {
                    startInterval(60000);
                }
            } else {
                if (intervalId) clearInterval(intervalId);
                intervalId = null;
            }
        }, { immediate: true });

        // Dynamically adjust timer interval as time remaining changes
        watch(timeRemainingMs, (newVal) => {
            if (newVal > 0 && newVal < 60000) {
                if (intervalId && intervalId._idleTimeout !== 1000) {
                    startInterval(1000);
                }
            } else if (newVal >= 60000) {
                if (intervalId && intervalId._idleTimeout === 1000) {
                    startInterval(60000);
                }
            }
        });

        // Cleanup timer on component unmount
        onBeforeUnmount(() => {
            if (intervalId) clearInterval(intervalId);
        });

        // Watch for user login/logout and update order length accordingly
        watch(() => activeUser.value?.username, (newUsername) => {
            if (newUsername) {
                fetchOrderLength();
            } else {
                activeUser.value.orderLength = 0;
            }
        }, { immediate: true });

        /**
         * Computed property for formatted time remaining string.
         * @returns {string}
         */
        const formattedTime = computed(() => formatTime(timeRemainingMs.value));

        /**
         * Computed property for the user's current order length (cart count).
         * @returns {number}
         */
        const orderLength = computed(() => {
            const length = activeUser.value?.orderLength;
            return typeof length === 'number' && length > 0 ? length : 0;
        });

        return {
            ArrowLeftSvg,
            selectedTable,
            formattedTime,
            timeRemainingMs,
            activeUser,
            orderLength
        }
    },
    methods: {
        back() {
            if (this.previous) {
                router.back();
                return
            }
            const current = this.$route.path.split('/')
            current.pop()
            const parent = current.join('/') || '/'
            this.$router.push(parent)
        },
        openProfile() {
            router.push({ name: 'profile' })
        },
        menu() {
            router.push({ name: 'main' })
        },
        goToMap() {
            router.push('/map')
        },
    },
}
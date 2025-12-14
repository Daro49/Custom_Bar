import ArrowLeftSvg from '@/assets/arrow-left-circle.svg?raw'
import PointsPresenterJukebox from '@/components/PointsPresenterJukebox.vue';
import router from '@/router'
import { activeUser, clearTable } from '@/stores/Login.js';
import { computed, ref, onBeforeUnmount, watch, onMounted } from 'vue';

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

// Funkcia na počiatočné načítanie orderLength
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

            // Kontrola a aktualizácia orderLength z odpovede používateľa
            if (typeof result.orderLength === 'number') {
                activeUser.value.orderLength = result.orderLength;
            } else {
                // Ak orderLength chýba v odpovedi, inicializujeme na 0
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
        const selectedTable = computed(() => activeUser.value?.table || 'N/A');
        const timeRemainingMs = ref(0);
        let intervalId = null;

        const updateTimer = () => {
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

                if (remaining <= 0 && user.table !== 'N/A') {

                    timeRemainingMs.value = 0;

                    const tableCodeToClear = user.table;

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

        const startInterval = (duration) => {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(updateTimer, duration);
        };

        watch(() => activeUser.value?.tableExpiration, (newExpiration) => {
            updateTimer();
            if (newExpiration) {
                const expiryTime = new Date(newExpiration).getTime();
                const remainingMs = expiryTime - Date.now();
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

        onBeforeUnmount(() => {
            if (intervalId) clearInterval(intervalId);
        });

        // NOVÁ IMPLEMENTÁCIA: Načítanie dĺžky objednávky pri načítaní komponentu
        // a pri zmene prihláseného užívateľa
        watch(() => activeUser.value?.username, (newUsername) => {
            if (newUsername) {
                fetchOrderLength();
            } else {
                activeUser.value.orderLength = 0;
            }
        }, { immediate: true });

        const formattedTime = computed(() => formatTime(timeRemainingMs.value));

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
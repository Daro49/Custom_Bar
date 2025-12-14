import ArrowLeftSvg from '@/assets/arrow-left-circle.svg?raw'
import PointsPresenterJukebox from '@/components/PointsPresenterJukebox.vue';
import router from '@/router'
import { activeUser, clearTable } from '@/stores/Login.js';
import { computed, ref, onBeforeUnmount, watch } from 'vue';

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

export default {
    name: 'Header',
    components: {
        PointsPresenterJukebox,
      },
    props: {
        showPoints: {type: Boolean, default: false},
        previous: { type: Boolean, default: false },
        backButton: { type: Boolean, default: true },
        title: { type: String, default: '' },
        avatar: { type: String, default: null },
        rightIcon: { type: String, default: null },
        rightFunction: { type: Function, default: null },
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

        const formattedTime = computed(() => formatTime(timeRemainingMs.value));

        return {
            ArrowLeftSvg,
            selectedTable,
            formattedTime,
            timeRemainingMs,
            activeUser
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
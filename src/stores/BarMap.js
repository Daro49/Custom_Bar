import SlidePanel from '../components/SlidePanel.vue';
import Header from '@/components/Header.vue';
import cart from "@/assets/OrderHistory.svg?raw";
import MapTerrace from '../components/maps/MapTerrace.vue';
import MapEntry from '../components/maps/MapEntry.vue';
import MapBack from '../components/maps/MapBack.vue';
import MapGarden from '../components/maps/MapGarden.vue';
import { activeUser, clearTable } from '@/stores/Login.js';

export default {
    name: "TableLayoutA",
    data() {
        return {
            selectedTable: null,
            currentMap: 'terrace',
            previousMap: 'terrace',
            cart,
            expirationChecker: null,
        }
    },
    created() {
        if (activeUser.value && activeUser.value.table) {
            this.selectedTable = activeUser.value.table;
            console.log('Restored selected table:', this.selectedTable);
        }
        this.checkTableExpiration();
    },
    mounted() {
        this.expirationChecker = setInterval(this.checkTableExpiration, 60000);
    },
    beforeDestroy() {
        clearInterval(this.expirationChecker);
    },
    watch: {
        activeUserTable(newTable, oldTable) {
            if (oldTable && oldTable !== 'N/A' && newTable === 'N/A') {
                this.selectedTable = null;

                if (this.expirationChecker) {
                    clearInterval(this.expirationChecker);
                    this.expirationChecker = null;
                }
            }
        }
    },
    methods: {
        checkTableExpiration() {
            const expiration = activeUser.value.tableExpiration;
            const table = activeUser.value.table;

            if (table && expiration && table !== 'N/A') {
                const now = Date.now();
                const expiryTime = new Date(expiration).getTime();

                if (now >= expiryTime) {
                    console.log(`Table ${table} reservation expired. Releasing.`);
                    this.selectedTable = null;
                    this.releaseTable(table);
                    clearInterval(this.expirationChecker);
                    this.expirationChecker = null;
                }
            } else if (this.expirationChecker) {
                clearInterval(this.expirationChecker);
                this.expirationChecker = null;
            }
        },

        async releaseTable(tableLabel) {
            this.selectedTable = null;
            await clearTable(tableLabel)
        },

        async selectTable(label) {
            const isDeselecting = this.selectedTable === label;

            if (isDeselecting) {
                await this.releaseTable(label);
                return;
            }

            this.selectedTable = label;
            activeUser.value.table = this.selectedTable;

            const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();

            activeUser.value.tableExpiration = expirationTime;

            localStorage.setItem('activeUser', JSON.stringify(activeUser.value));

            try {
                const username = activeUser.value.username
                console.log('Sending table select request for:', label)
                const response = await fetch('https://itu-wb12.onrender.com/users/' + username + '/table/select', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tableCode: label,
                        expirationTime: expirationTime
                    })
                })

                const data = await response.json()

                if (!response.ok) {
                    console.error('Failed to select table:', data)
                } else {
                    console.log('Table selected:', data)
                }
            } catch (error) {
                console.error('Error selecting table:', error)
            }
        },

        switchMap(name) {
            if (['terrace', 'entry', 'back', 'garden'].includes(name)) {
                this.previousMap = this.currentMap
                this.currentMap = name
            }
        },
        goToPreviousMap() {
            const temp = this.currentMap
            this.currentMap = this.previousMap
            this.previousMap = temp
        },
        closeSlidePanel() {
        },
        order() { this.$router.push({ name: 'order' }) }
    },
    computed: {
        mapComponents() {
            return {
                terrace: MapTerrace,
                entry: MapEntry,
                back: MapBack,
                garden: MapGarden
            }
        },
        activeUserTable() {
            return activeUser.value.table;
        }
    },
    components: {
        SlidePanel,
        MapTerrace,
        MapEntry,
        MapBack,
        MapGarden,
        Header
    }
};
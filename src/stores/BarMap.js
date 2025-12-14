import SlidePanel from '../components/SlidePanel.vue';
import Header from '@/components/Header.vue';
import cart from "@/assets/orderIcon.svg?raw";
import MapTerrace from '../components/maps/MapTerrace.vue';
import MapEntry from '../components/maps/MapEntry.vue';
import MapBack from '../components/maps/MapBack.vue';
import MapGarden from '../components/maps/MapGarden.vue';
import { activeUser, clearTable } from '@/stores/Login.js';
import { useTableStore } from '@/stores/tableStore';
import { addToast } from '@/stores/ToastStore';

export default {
    data() {
        return {
            currentMap: 'terrace',
            previousMap: 'terrace',
            cart,
            expirationChecker: null,
        }
    },
    created() {
        this.tableStore = useTableStore();
        this.tableStore.fetchInitialTables();
        if (activeUser.value && activeUser.value.table && activeUser.value.table !== 'N/A') {
            if (!this.tableStore.selectedTable) {
                this.tableStore.setSelectedTable({
                    table: activeUser.value.table,
                    tableExpiration: activeUser.value.tableExpiration
                });
                console.log('Restored selected table in Store:', activeUser.value.table);
            }
        }
        this.checkTableExpiration();
    },
    mounted() {
        const tableStore = useTableStore();
        tableStore.connectToWebSockets();
        this.expirationChecker = setInterval(this.checkTableExpiration, 5000);
    },
    beforeDestroy() {
        clearInterval(this.expirationChecker);
    },
    watch: {
        activeUserTable(newTable, oldTable) {
            if (oldTable && oldTable !== 'N/A' && newTable === 'N/A') {
                const tableStore = useTableStore();
                const tableLabel = oldTable;
                const table = tableStore.getTableById(tableLabel);
                if (table) {
                    const newCount = Math.max(0, table.occupied - 1);
                    tableStore.updateLocalOccupancy(tableLabel, newCount);
                    console.log(`Watch triggered: Table ${tableLabel} visually decremented to ${newCount}.`);
                }

                if (tableStore.getSelectedTableId === tableLabel) {
                    tableStore.setSelectedTable(null);
                }

                if (this.expirationChecker) {
                    clearInterval(this.expirationChecker);
                    this.expirationChecker = null;
                }
            }
        }
    },
    methods: {
        checkTableExpiration() {
            if (!activeUser.value || activeUser.value.table === 'N/A') {
                if (this.expirationChecker) {
                    clearInterval(this.expirationChecker);
                    this.expirationChecker = null;
                }
                return;
            }

            const expiration = activeUser.value.tableExpiration;
            const table = activeUser.value.table;

            if (table && expiration && table !== 'N/A') {
                const now = Date.now();
                const expiryTime = new Date(expiration).getTime();

                if (now >= expiryTime) {
                    console.log(`Table ${table} reservation expired. Releasing.`);
                    this.releaseTable(table);
                }
            } else if (this.expirationChecker) {
                clearInterval(this.expirationChecker);
                this.expirationChecker = null;
            }
        },

        async releaseTable(tableLabel) {
            if(activeUser.value.orderLength > 0) {
                addToast('You have items in your order. Please clear your order before releasing the table.');
                return;
            }
            if (this.expirationChecker) {
                clearInterval(this.expirationChecker);
                this.expirationChecker = null;
            }
            await clearTable(tableLabel);
            this.tableStore.setSelectedTable(null);
        },

        async selectTable(label) {
            if (!activeUser.value) {
                addToast('Please log in to select a table.');
                return;
            }
            const isDeselecting = this.selectedTable === label;

            if (isDeselecting) {
                await this.releaseTable(label);
                return;
            }
            const tableStore = useTableStore();
            const table = tableStore.getTableById(label);
            if (!table) return;
            if (table.occupied >= table.capacity) {
                addToast('Table is full, pick another one');
                return;
            }
            if (activeUser.value.table && activeUser.value.table !== 'N/A') {
                const oldTableId = activeUser.value.table;
                const oldTable = tableStore.getTableById(oldTableId);
                await clearTable(oldTableId);
            }

            const newOccupiedCount = table.occupied + 1;
            const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();

            this.tableStore.setSelectedTable({
                table: label,
                tableExpiration: expirationTime
            });

            activeUser.value.table = label;
            activeUser.value.tableExpiration = expirationTime;
            localStorage.setItem('activeUser', JSON.stringify(activeUser.value));

            try {
                const username = activeUser.value.username;
                const response = await fetch('https://itu-wb12.onrender.com/users/' + username + '/table/select', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tableCode: label, expirationTime: expirationTime })
                });
                if (!response.ok) {
                    console.error('Failed to select table:', await response.json());
                } else {
                    console.log('Table selected:', await response.json());
                }
            } catch (error) {
                console.error('Error selecting table:', error);
            }

            // 3. Zvýšime obsadenosť nového stola (PATCH request)
            await tableStore.updateTableOccupancy(label, newOccupiedCount);

            if (!this.expirationChecker) {
                this.expirationChecker = setInterval(this.checkTableExpiration, 5000);
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
        selectedTable() {
            return this.tableStore ? this.tableStore.getSelectedTableId : null;
        },
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
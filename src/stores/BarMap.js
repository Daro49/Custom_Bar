/**
 * @file BarMap.js
 * @brief Vue component logic for the bar table map view.
 * @author Matej Marušinec (xmarusm00@stud.fit.vutbr.cz)
 *
 * Handles table selection, expiration, and navigation between map areas.
 * Integrates with Pinia table store and user state.
 */
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
    /**
     * Component data properties.
     * @returns {Object}
     */
    data() {
        return {
            currentMap: 'terrace',
            previousMap: 'terrace',
            cart,
            expirationChecker: null,
        }
    },
    /**
     * Lifecycle hook: Called after component is created.
     * Initializes table store and restores selected table from user state if available.
     */
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
    /**
     * Lifecycle hook: Called after component is mounted.
     * Connects to WebSockets and starts expiration timer.
     */
    mounted() {
        const tableStore = useTableStore();
        tableStore.connectToWebSockets();
        this.expirationChecker = setInterval(this.checkTableExpiration, 5000);
    },
    /**
     * Lifecycle hook: Called before component is destroyed.
     * Clears expiration timer.
     */
    beforeDestroy() {
        clearInterval(this.expirationChecker);
    },
    watch: {
        /**
         * Watches for changes in the active user's table selection.
         * Updates local occupancy and clears selection if user leaves table.
         * @param {string} newTable - New table label
         * @param {string} oldTable - Previous table label
         */
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
        /**
         * Checks if the current user's table reservation has expired and releases it if needed.
         * Clears expiration timer if no table is reserved.
         */
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

        /**
         * Releases the specified table for the user and clears selection in the store.
         * Prevents release if user has items in their order.
         * @param {string} tableLabel - The label of the table to release
         */
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

        /**
         * Handles table selection and deselection logic, updates user and store state, and communicates with the server.
         * Checks for table capacity and handles switching from old table if needed.
         * @param {string} label - The label of the table to select
         */
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
            await tableStore.updateTableOccupancy(label, newOccupiedCount);
            if (!this.expirationChecker) {
                this.expirationChecker = setInterval(this.checkTableExpiration, 5000);
            }
        },

        /**
         * Switches the current map view to the specified map name.
         * @param {string} name - The name of the map to switch to
         */
        switchMap(name) {
            if (['terrace', 'entry', 'back', 'garden'].includes(name)) {
                this.previousMap = this.currentMap
                this.currentMap = name
            }
        },

        /**
         * Switches back to the previous map view.
         */
        goToPreviousMap() {
            const temp = this.currentMap
            this.currentMap = this.previousMap
            this.previousMap = temp
        },

        /**
         * Placeholder for closing the slide panel (no-op).
         */
        closeSlidePanel() {
        },

        /**
         * Navigates to the order view.
         */
        order() { this.$router.push({ name: 'order' }) }
    },
    computed: {
        /**
         * Returns the currently selected table ID from the store.
         * @returns {string|null}
         */
        selectedTable() {
            return this.tableStore ? this.tableStore.getSelectedTableId : null;
        },
        /**
         * Returns the map components for each map area.
         * @returns {Object}
         */
        mapComponents() {
            return {
                terrace: MapTerrace,
                entry: MapEntry,
                back: MapBack,
                garden: MapGarden
            }
        },
        /**
         * Returns the current user's table label.
         * @returns {string}
         */
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
/**
 * @file tableStore.js
 * @brief Pinia store for managing tables, their occupancy, and selection state.
 * @author Matej Marušinec (xmarusm00@stud.fit.vut.cz)
 *
 * Pinia store for managing tables, their occupancy, and selection state.
 * Handles fetching tables, updating occupancy, and synchronizing with server via WebSockets.
 */
import { defineStore } from 'pinia';
import { io } from "socket.io-client";
import { activeUser } from '@/stores/Login.js';

const SOCKET_URL = "https://itu-wb12.onrender.com";
let socket = null;

export const useTableStore = defineStore('tables', {
    state: () => ({
        tables: [],
        selectedTable: null, 
    }),
    getters: {
        getTableById: (state) => (id) => {
            return state.tables.find(table => table.id === id);
        },
        getSelectedTableId: (state) => {
            return state.selectedTable ? state.selectedTable.table : null;
        }
    },
    actions: {
        /**
         * Fetches the initial list of tables from the server and populates the store.
         * Skips fetch if tables are already loaded.
         */
        async fetchInitialTables() {
            if (this.tables && this.tables.length > 0) {
                console.log("Tables already fetched, skipping initial fetch.");
                return; 
            }
            try {
                const response = await fetch('https://itu-wb12.onrender.com/tables', {
                    headers: {
                        'Cache-Control': 'no-cache',
                    }
                });
                if (!response.ok) {
                    throw new Error(`Server vrátil chybu so statusom ${response.status}`);
                }

                if (response.headers.get('content-length') === '0') {
                    return;
                }
                const data = await response.json();
                this.tables = data.map(table => ({
                    ...table,
                    id: String(table.id)
                }));
            } catch (error) {
                console.error("Chyba načítania stolov:", error);
            }
        },
        /**
         * Sets the currently selected table in the store.
         * @param {Object|null} table - Table object or null to clear selection
         */
        setSelectedTable(table) {
            this.selectedTable = table;
        },
        /**
         * Updates the occupancy count for a table on the server and locally.
         * Handles server PATCH and updates local state if successful.
         * @param {string} tableId - Table ID
         * @param {number} newOccupiedCount - New occupancy count
         */
        async updateTableOccupancy(tableId, newOccupiedCount) {
            try {
                const table = this.getTableById(tableId);

                newOccupiedCount = Math.max(0, newOccupiedCount);

                const response = await fetch(`https://itu-wb12.onrender.com/tables/${tableId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ occupied: newOccupiedCount })
                });

                if (!response.ok) {
                    console.error('Server odmietol aktualizovať obsadenosť:', await response.text());
                    return;
                }

                if (table) {
                    const updatedData = await response.json();
                    table.occupied = updatedData.occupied; 
                }
            } catch (error) {
                console.error(`Chyba pri aktualizácii obsadenosti stola ${tableId}:`, error);
            }
        },
        
        /**
         * Updates the local occupancy count for a table and resets selection if needed.
         * Handles edge cases where table is released remotely.
         * @param {string} id - Table ID
         * @param {number} newOccupied - New occupancy count
         */
        updateLocalOccupancy(id, newOccupied) {
            const table = this.getTableById(id);
            if (table) {
                table.occupied = newOccupied; 
                console.log(`Table ${id} locally updated to ${newOccupied}`);

                if (newOccupied <= 0) {
                    const isTableSelectedLocally = this.selectedTable && String(this.selectedTable.table) === String(id);
                    const isReservedByActiveUser = activeUser.value && String(activeUser.value.table) === String(id);
                    
                    if (isTableSelectedLocally && !isReservedByActiveUser) {
                        this.selectedTable = null;
                        console.log(`Selected table ${id} reset to null due to remote release (Active user is not reserved).`);
                    }
                }
            }
        },

        /**
         * Connects to the server via Socket.IO and listens for table updates.
         * Updates local occupancy in real time.
         * Only connects once per store instance.
         */
        connectToWebSockets() {
            if (socket) return; 

            socket = io(SOCKET_URL, {
                path: '/socket.io',
                transports: ['polling', 'websocket']
            });
            
            socket.on('connect', () => {
                console.log("Socket.IO connected to server.");
            });
            
            socket.on('disconnect', () => {
                console.log("Socket.IO disconnected.");
            });
            
            socket.on('tableUpdate', (data) => {
                const { id, occupied } = data;
                this.updateLocalOccupancy(id, occupied); 
                console.log(`[Socket] Received update for table ${id}. New occupied: ${occupied}`);
            });
        },
    }
});
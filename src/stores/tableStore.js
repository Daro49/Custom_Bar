import { defineStore } from 'pinia';

export const useTableStore = defineStore('tables', {
    state: () => ({
        tables: []
    }),
    getters: {
        getTableById: (state) => (id) => {
            return state.tables.find(table => table.id === id);
        }
    },
    actions: {
        async fetchInitialTables() {
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
        updateLocalOccupancy(id, newOccupied) {
            const table = this.getTableById(id);
            if (table) {
                table.occupied = newOccupied;
            }
        },
    }
});
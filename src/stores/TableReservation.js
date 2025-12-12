import { activeUser } from '@/stores/Login.js';

export async function extendTableReservation() {
    const tableLabel = activeUser.value.table;
    const username = activeUser.value.username;

    if (!tableLabel) {
        console.log('Cannot extend reservation: No table selected.');
        return;
    }
    
    const newExpirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString(); 

    try {
        const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/table/select`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tableCode: tableLabel, newExpirationTime })
        });

        if (response.ok) {
            const currentUserData = activeUser.value;
            
            const updatedUserData = {
                ...currentUserData,
                tableExpiration: newExpirationTime
            };
            activeUser.value = updatedUserData;
            
            localStorage.setItem('activeUser', JSON.stringify(updatedUserData));
            console.log(`Reservation extended until ${newExpirationTime}.`);

            return true;
        } else {
            console.error('Failed to extend table reservation on server.');
            return false;
        }
    } catch (error) {
        console.error('Error extending reservation:', error);
        return false;
    }
}
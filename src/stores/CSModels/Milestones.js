import { activeUser } from "../Login";
import { ref } from "vue";
import { addToast } from "../ToastStore";
import { addPoints } from "../AddPoints";

export const milestones = ref([])

export async function getMilestonesOfUser() {
    try {
        const response = await fetch(`https://itu-wb12.onrender.com/milestones/${activeUser.value.username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
          throw new Error('Error while fetching milestones.');
        }
    
        const data = await response.json();
    
        milestones.value = data;
        return true;
      } catch (error) {
        console.error(error);
        addToast('Milestones couldn\'t be fetched.')
        return false;
    }
}

export async function setMilestonesOfUser(updates){
    try {
        const response = await fetch(`https://itu-wb12.onrender.com/milestones/${activeUser.value.username}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                updatedMilestones: updates 
            })
        });
    
        if (!response.ok) {
        throw new Error('Error while updating milestones.');
        }
        return true;
    } catch (error) {
        console.error(error);
        addToast('Milestones couldn\'t be uploaded.')
        return false;
    }
}

export async function claimReward(milestone) {
    if (!milestone || !milestone.id) {
        console.error("Invalid milestone data provided to claimReward");
        return false;
    }

    try {
        const username = activeUser.value.username;
        
        const response = await fetch(`https://itu-wb12.onrender.com/milestones/${username}/claim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ milestoneId: milestone.id })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Server rejected the claim');
        }

        const pointsSuccess = await addPoints(milestone.reward);
        
        if (!pointsSuccess) {
            throw new Error('Add points failed');
        }

        await getMilestonesOfUser(); 

        addToast(`Successfully claimed ${milestone.reward} points!`);
        return true;

    } catch (err) {
        console.error("Error claiming milestone:", err);
        addToast(`Failed to claim reward: ${err.message}`);
        return false;
    }
}
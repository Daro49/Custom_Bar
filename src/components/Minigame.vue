<script setup>
import { addPoints } from '@/stores/AddPoints';
import { activeUser } from '@/stores/Login';
import { addToast } from '@/stores/ToastStore';
import { ref } from 'vue';

const symbols = ['🍺', '🍸', '🍷', '🧊'];
const isSpinning = ref(false);
let won = ref(false);

let slot1 = ref(symbols[Math.floor(Math.random() * symbols.length)]);
let slot2 = ref(symbols[Math.floor(Math.random() * symbols.length)]);
let slot3 = ref(symbols[Math.floor(Math.random() * symbols.length)]);

async function play() {
    // cannot play while waiting for result
    won.value = false;
    if (isSpinning.value) return;
    isSpinning.value = true;
    if (activeUser.value.points < 5) {
        addToast("Not enough points :(");
        return false;
    }
    await addPoints(-5);

    let count = 0;
    // spin for 3 seconds (30*0.1s)
    const interval = setInterval(() => {
        slot1.value = symbols[Math.floor(Math.random() * symbols.length)];
        slot2.value = symbols[Math.floor(Math.random() * symbols.length)];
        slot3.value = symbols[Math.floor(Math.random() * symbols.length)];
        count++;

        if (count > 29) {
            clearInterval(interval);
            checkResult();
        }
    }, 100);
}

async function checkResult() {
    const res1 = slot1.value;
    const res2 = slot2.value;
    const res3 = slot3.value;
    if (res1 === res2 && res2 === res3) {
        won.value = true;

        await addPoints(50); // chance of win is 1/16 so it's profit :)
        setTimeout(() => {
            won.value = false;
        }, 3000);
    }
    isSpinning.value = false;
}

</script>

<template>
    <div class="text-frame" :class="{ 'win-border': won }">
        <div class="text" v-if="won">YOU WON 50 POINTS!</div>
        <div class="text-hint" v-else>Try your luck if bored! (5 pts per spin, win 50)</div>
    </div>
    <div class="slot-machine">
        <div class="main-frame">
            <div class="slot">{{ slot1 }}</div>
            <div class="slot">{{ slot2 }}</div>
            <div class="slot">{{ slot3 }}</div>
        </div>
        
        <button class="spin-btn" @click="play" :disabled="isSpinning">
            {{ isSpinning ? 'SPINNING...' : 'SPIN (5 PTS)' }}
        </button>
    </div>
</template>

<style scoped>
.slot-machine {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: var(--background-green);
    border-radius: 15px;
    border: 3px solid var(--gold);
    margin-bottom: 20px;
}

.main-frame {
    display: flex;
    gap: 10px;
    background: #000;
    padding: 15px;
    border-radius: 10px;
    box-shadow: inset 0 0 10px #000;
}

.slot {
    width: 60px;
    height: 80px;
    background: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    transition: transform 0.1s;
}

.spin-btn {
    background: linear-gradient(to bottom, #d4af37, #aa8a2e);
    border: none;
    color: white;
    padding: 12px 30px;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px #8a6d1a;
}

.spin-btn:active {
    transform: translateY(2px);
    box-shadow: 0 2px #8a6d1a;
}

.spin-btn:disabled {
    filter: grayscale(1);
    cursor: not-allowed;
}
.text-frame {
    background-color: rgba(212, 175, 55, 0.1); /* Jemný zlatý nádych v základe */
    width: 80%;
    max-width: 400px;
    height: 60px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border-radius: 12px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.win-border {
    border-color: var(--gold);
    background-color: var(--gold);
    box-shadow: 0 0 20px var(--gold), 0 0 40px rgba(212, 175, 55, 0.5);
    animation: pulse 0.5s infinite alternate;
}

.text {
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.text-hint {
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
}

/* effect for win border */
@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
}

</style>
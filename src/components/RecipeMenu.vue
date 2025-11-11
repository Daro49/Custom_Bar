<template>
    <div class="border">
        <div class="list">
            <RecipeListItem v-for="ingredient in props.ingredientList"
            :key="ingredient"
            :ingredientName="ingredient"
            >
            </RecipeListItem>
        </div>
        <div class="buttons">
            <div class="order" @click="sendOrder">
                Order
            </div>
        </div>
    </div>
</template>

<script setup>
import RecipeListItem from './RecipeListItem.vue';
import { activeUser } from '@/stores/Login';

const props = defineProps({
    ingredientList: {
        type: Array,
        default: () => []
    }
})

async function sendOrder() {
    const newDrink = {
        name: "test",
        price: 5,
        ingredients: props.ingredientList
    }

    var send = {drink: newDrink, tableCode: activeUser.value.table}
    try {
        var response = await fetch(`https://itu-wb12.onrender.com/users/${activeUser.value.username}/order/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(send)
        })

        console.log(response)

    } catch (error) {
        
    }
}
</script>

<style scoped>
.border {
    display: flex;
    width: 750px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.list {
    display: flex;
    height: 450px;
    padding: 50px;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    align-self: stretch;

    border-radius: 50px 50px 0 0;
    border: 5px solid #552808;
    background: linear-gradient(180deg, #FEBC2F 0%, #D5B36F 40.87%, #B37606 100%);
}

.buttons {
    display: flex;
    height: 75px;
    padding: 12px 56px;
    justify-content: center;
    align-items: center;
    gap: 100px;
    align-self: stretch;

    border-radius: 0 0 50px 50px;
    border-right: 5px solid #552808;
    border-bottom: 5px solid #552808;
    border-left: 5px solid #552808;
    background: linear-gradient(180deg, #FEBC2F 0%, #D5B36F 40.87%, #B37606 100%);
}

.order {
    display: flex;
    width: 250px;
    height: 40px;
    padding: 20px 120px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 25px;
    background: #513C2C;
}

</style>
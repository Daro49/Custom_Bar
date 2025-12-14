<!--
*
* File:     ProgressButton.vue
* Author:   Matej Daransky (xdaranm00@stud.fit.vut.cz)
*
* Brief:    Buttons for navigating through steps of making a recipe
*
-->

<template>
    <div class="button" @click="buttonAction">
        <p>{{ buttonText }}</p>
    </div>
</template>

<script setup>
    import router from '@/router';
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import { computed } from 'vue';

    const props = defineProps({
        next: Boolean
    })

    const store = useDrinkRecipe();

    const buttonText = computed(() => {
        if (props.next) return store.isLastStep ? 'Order' : 'Next';
        return 'Back';
    })

    async function buttonAction(){
        if (props.next) {
            if (store.isLastStep) {
                const success = await store.postDrinkRecipe();

                if (success) {
                    store.informUser();
                    store.resetRecipe();
                    router.push({
                        name: "custommenu"
                    })
                }
            }
            else {
                store.nextStep();
            }
        }
        else {
            store.previousStep();
        }
    }
</script>

<style scoped>
    .button {
        display: flex;
        height: 65px;
        width: 100%;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        gap: 10px;

        border-radius: 20px;
        background: #D9D9D9;

        cursor: pointer;
    }

    .button:hover {
        background: #d9d9d976;
        outline: 2px solid #552808;
    }

    p {
        color: #552808;
        text-align: center;
        font-family: "Josefin Slab", sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
</style>
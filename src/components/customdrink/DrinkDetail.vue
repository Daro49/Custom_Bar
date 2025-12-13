<template>
    <div class="detail_input">
        <div class="column">
            <label for="drinkName" class="label_name">Name of Drink:</label>
            <input id="drinkName"
                type="text"
                v-model="localName"
                placeholder="My drink"
            ><br>
        </div>
            
        <div class="column">
            <textarea
            id="drinkDesc"
            v-model="localDesc"
            placeholder="Description (Optional)"
            >
            </textarea>     
        </div>
    </div>
</template>

<script setup>
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import { ref, watch } from 'vue';

    const DEBOUNCE_DELAY = 500;

    const store = useDrinkRecipe();

    const localName = ref(store.drinkName);
    const localDesc = ref(store.drinkDescription);

    const debounce = (fn, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn.apply(this, args);
            }, delay)
        }
    }

    const debounceName = debounce((value) => {
        store.setName(value);
        console.log('Name stored')
    }, DEBOUNCE_DELAY)

    const debounceDesc = debounce((value) => {
        store.setDescription(value)
    }, DEBOUNCE_DELAY)

    watch(localName, (newVal) => {
        debounceName(newVal);
    })

    watch(localDesc, (newVal) => {
        debounceDesc(newVal);
    })

    // In case of reset
    watch(() => store.drinkName, (newStoreVal) => {
        if (newStoreVal !== localName.value) {
            localName.value = newStoreVal;
        }
    })

    watch(() => store.drinkDescription, (newStoreVal) => {
        if (newStoreVal !== localDesc.value) {
            localDesc.value = newStoreVal;
        }
    })
</script>

<style scoped>
    .detail_input {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .column {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    .column label {
        white-space: nowrap;
    }

    .label_name {
        margin: 5px;
        flex-grow: 0;

		color: #552808;
		font-family: "Josefin Slab", sans-serif;
		font-size: 36px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
    }

    input[type="text"] {
        flex-grow: 1;
        min-width: 0;
        height: 60%;

        background: transparent;
        border: none;
        border: 2px solid transparent;
        border-bottom: 2px solid #552808;
        box-sizing: border-box;
        outline: none;


        font-size: 20px;
        color: #552808;
		font-family: "Josefin Slab", sans-serif;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
    }

    textarea:focus, input:focus {
        border: 2px solid #552808;
    }

    textarea {
        flex-grow: 1;
        min-width: 0;
        height: 60%;
        resize: none;

        background: transparent;
        border: none;
        border: 2px solid transparent;
        border-bottom: 2px solid #552808;
        box-sizing: border-box;
        outline: none;

        color: #552808;
		font-family: "Josefin Slab", sans-serif;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
    }
</style>
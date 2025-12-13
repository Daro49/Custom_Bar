<template>
    <div class="detail_input">
        <div class="column">
            <label for="drinkName" class="label_name">Name of Drink:</label>
            <input id="drinkName" class="input_name"
                type="text"
                v-model="localName"
                placeholder="My drink"
            ><br>
        </div>

        <div class="column_desc">
            <input class="input_desc"
            type="text" 
            v-model="localDesc"
            placeholder="(Optional)"
            >
            <label class="label_desc"><b>Description</b></label>
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
        console.log('Description stored')
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
        gap: 0.5rem;
        margin-bottom: 0.5rem;
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

    .column_desc {
        position: relative;
        width: 100%;
        height: 2.75rem;
    }

    .label_name {
        margin: 5px;
        flex-grow: 0;

		color: #552808;
		font-family: "Josefin Slab", sans-serif;
		font-size: 36px;

    }

    .label_desc {
        position: absolute;
        left: 15px;
        color: #552808;
		font-family: "Josefin Slab", sans-serif;

        pointer-events: none;
        transform: translateY(-50%);
        background-color: #D4AF37;
        padding: 0 .2em;
    }

    .input_name {
        flex-grow: 1;
        min-width: 0;

        border: 2px solid #55280879;
        border-radius: 1rem;
        background: none;
        padding: 0.5rem;

        font-size: 20px;
        color: #552808;
		font-family: "Josefin Slab", sans-serif;
    }

    .input_desc {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        border: 2px solid #55280879;
        border-radius: 1rem;
        background: none;
        padding-right: 0.5rem;
        padding-left: 0.5rem;

        font-size: 1rem;
        color: #552808;
		font-family: "Josefin Slab", sans-serif;
    }

    *:focus {
        outline: none;
        border: 2px solid #552808;
    }
</style>
<template>
	<Header :avatar="Profile" ></Header>

	<div class="content">
		<div class="ingredient_progress">

			<ProgressBar />
			<IngredientChoose :category_name="'alcohols'" />

			<div class="buttons">
				<ProgressButton :button-name="'Back'" />
				<ProgressButton :button-name="'Next'" />
			</div>
		</div>

		<div class="recipe">

		</div>
	</div>
</template>

<script setup>
import IngredientChoose from '@/components/customdrink/IngredientChoose.vue';
import ProgressBar from '@/components/customdrink/ProgressBar.vue';
import Header from '@/components/Header.vue';

import Profile from '@/assets/user.png';
import ProgressButton from '@/components/customdrink/ProgressButton.vue';
</script>

<style scoped>
	.content {
		display: flex;
		padding: 71px 50px;
		justify-content: center;
		align-items: center;
		gap: 34px;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
	}

	.ingredient_progress {
		display: flex;
		width: 50%;
		padding: 41px 76px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;

		border-radius: 50px;
		background: #D4AF37;
	}

	.buttons {
		display: flex;
		padding: 40px;
		align-items: center;
		align-self: stretch;
		gap: 40px;
	}

	.recipe {
		display: flex;
		width: 30%;
		padding: 25px 30px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;

		border-radius: 50px;
		background: #D4AF37;
	}
</style>

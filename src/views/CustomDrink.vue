<template>
	<Header :avatar="Profile" ></Header>

	<div class="content">
		<div class="ingredient_progress">

			<ProgressBar />
			<IngredientChoose />

			<div class="buttons">
				<ProgressButton :button-name="'Back'" :next="false" />
				<ProgressButton :button-name="'Next'" :next="true" />
			</div>
		</div>

		<div class="recipe">
			<h2>Your Recipe</h2>
			<div class="glass_box">
				<Glass />
			</div>
			<div class="recipe_list">
				<h3>Summary</h3>
				<RecipeIngredientList />
			</div>
		</div>
	</div>
</template>

<script setup>
	import IngredientChoose from '@/components/customdrink/IngredientChoose.vue';
	import ProgressBar from '@/components/customdrink/ProgressBar.vue';
	import Header from '@/components/Header.vue';
	import Profile from '@/assets/user.png';
	import ProgressButton from '@/components/customdrink/ProgressButton.vue';
	import Glass from '@/components/customdrink/Glass.vue';
	import RecipeIngredientList from '@/components/customdrink/RecipeIngredientList.vue';
</script>

<style scoped>
	.content {
		display: flex;
		padding: 5px 50px;
		justify-content: center;
		align-items: flex-start;
		gap: 34px;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
	}

	.ingredient_progress {
		display: flex;
		width: 50%;
		padding: 25px 76px;
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
		padding: 30px;
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
		gap: 10px;
		flex-shrink: 0;

		border-radius: 50px;
		background: #D4AF37;
	}

	h2 {
		margin: 5px;

		color: #552808;
		font-family: "Josefin Slab", sans-serif;
		font-size: 36px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	h3 {
		margin: 2px;

		color: #552808;
		font-family: "Josefin Slab", sans-serif;
		font-size: 20px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.glass_box {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.recipe_list {
		display: flex;
		position: sticky;
		width: 100%;
		flex-direction: column;
	}
</style>

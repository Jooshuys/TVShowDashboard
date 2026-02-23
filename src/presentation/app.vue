<template>
	<div
		:class="[
			'PageWrapper',
			userUsingKeyboard ? 'OptimisedForKeyboardNavigation': ''
		]"
	>
		<Header />
		<main
			id="MainContent"
			class="LayoutBlock"
		>
			<component :is="CurrentComponent" />
		</main>
		<Footer />
	</div>
</template>

<script lang="ts" src="./app.ts"></script>
<style lang="scss" src="./app.scss" />
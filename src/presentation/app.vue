<template>
	<div>
		<Header />
		<main class="MainContent">
			<component :is="CurrentComponent" />
		</main>
	</div>
</template>

<script lang="ts" src="./app.ts"></script>
<style lang="scss" src="./app.scss" />
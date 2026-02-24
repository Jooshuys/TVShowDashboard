<template>
	<header class="TopHeader">
		<button
			data-href="/overview"
			class="HomeButton"
			aria-label="Go to homepage"
			@click="handleNavigationItemClick"
		>
			<i
				class="fa-solid fa-clapperboard"
				aria-hidden="true"
			></i>
		</button>
		<SearchInput />
	</header>
</template>

<script lang="ts" src="./header.ts" />
<style lang="scss" src="./header.scss" />
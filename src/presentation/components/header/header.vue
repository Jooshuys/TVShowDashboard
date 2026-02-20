<template>
	<header>
		<a
			href="/overview"
			class="HomeButton"
			@click="handleNavigationItemClick"
		>
			<i class="fa-solid fa-house"></i>
		</a>
		<SearchInput />
	</header>
</template>

<script lang="ts" src="./header.ts" />
<style lang="scss" src="./header.scss" />
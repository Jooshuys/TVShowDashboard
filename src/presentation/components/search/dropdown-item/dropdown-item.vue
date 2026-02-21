<template>
	<a
		:href="`/show-details/${show.id}`"
		class="DropdownItem"
		@click="handleNavigationItemClick"
	>
		{{ show.name }}
	</a>
</template>

<script lang="ts" src="./dropdown-item.ts" />
<style lang="scss" src="./dropdown-item.scss" />

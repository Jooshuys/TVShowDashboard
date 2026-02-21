<template>
	<div>
		<div v-if="isLoading">Loading ...</div>
		<GenresOverview v-else />
	</div>
</template>

<script lang="ts" src="./overview.ts" />
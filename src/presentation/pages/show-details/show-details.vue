<template>
	<div>
		<loadingFailureNotification v-if="isLoadingFailure" />
		<div v-else-if="isLoading">Loading ...</div>
		<ShowSpotlight v-else />
	</div>
</template>

<script lang="ts" src="./show-details.ts" />
<style lang="scss" src="./show-details.scss" />
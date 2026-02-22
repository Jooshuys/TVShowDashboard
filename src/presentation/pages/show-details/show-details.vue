<template>
	<div>
		<loadingFailureNotification v-if="isLoadingFailure" />
		<ShowSpotlight v-else />
	</div>
</template>

<script lang="ts" src="./show-details.ts" />
<template>
	<loadingFailureNotification v-if="isLoadingFailure" />
	<ShowSpotlight v-else />
</template>

<script lang="ts" src="./show-details.ts" />
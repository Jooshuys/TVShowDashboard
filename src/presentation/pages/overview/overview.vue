<template>
	<loadingFailureNotification v-if="isLoadingFailure" />
	<GenresOverview v-else />
</template>

<script lang="ts" src="./overview.ts" />
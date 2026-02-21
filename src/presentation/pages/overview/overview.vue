<template>
	<div>
		<loadingFailureNotification v-if="isLoadingFailure" />
		<GenresOverview v-else />
	</div>
</template>

<script lang="ts" src="./overview.ts" />
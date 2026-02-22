<template>
	<section
		v-if="!isLoadingFailure"
		class="Introduction RoundedBlock"
		aria-labelledby="OverviewHeading"
	>
		<h1 class="OverviewHeading">
			Your TV Dashboard
		</h1>
		<p>
			Browse shows by genre, check the details, or use the search to find any show.
		</p>
	</section>
	<loadingFailureNotification v-if="isLoadingFailure" />
	<GenresOverview v-else />
</template>

<script lang="ts" src="./overview.ts" />
<style lang="scss" src="./overview.scss" />
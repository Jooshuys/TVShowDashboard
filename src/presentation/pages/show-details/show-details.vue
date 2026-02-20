<template>
	<div>
		Hello show details!
		<div v-if="genreClusterHasShows">
			{{ showForCurrentRoute }}
		</div>
	</div>
</template>

<script lang="ts" src="./show-details.ts" />
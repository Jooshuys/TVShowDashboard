<template>
	<GenreShowcase
		v-for="genre in genresToShow"
		:key="genre"
		:genreName="genre"
	/>
	<div ref="bottomMarker"></div>
</template>

<script lang="ts" src="./genres-overview.ts" />
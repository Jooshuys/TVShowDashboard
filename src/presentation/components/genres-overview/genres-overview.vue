<template>
	<div>
		<GenreShowcase
			v-for="genre in genresToShow"
			:key="genre"
			:genreName="genre"
		/>
		<div ref="bottomMarker"></div>
	</div>
</template>

<script lang="ts" src="./genres-overview.ts" />
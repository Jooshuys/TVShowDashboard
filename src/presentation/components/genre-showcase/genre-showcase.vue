<template>
	<div>
		<LoadingWrapper
			:classes="['GenreTitle']"
			:isLoading="isLoading"
		>
			<p class="GenreTitle">
				{{ genreName }}
			</p>
		</LoadingWrapper>
		<div class="GenreCardsWrapper">
			<ShowPreviewCard
				v-for="show in showsOfGenre"
				:key="show.id"
				:show="show"
			/>
		</div>
	</div>
</template>

<script lang="ts" src="./genre-showcase.ts" />
<style lang="scss" src="./genre-showcase.scss" />
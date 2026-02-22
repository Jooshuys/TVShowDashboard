<template>
	<LoadingWrapper
		:classes="['GenreTitle']"
		:isLoading="isLoading"
	>
		<h2
			:id="`Genre-${genreName}`"
			class="GenreTitle RoundedBlock"
		>
			{{ genreName }}
		</h2>
	</LoadingWrapper>
	<div class="GenreCardsControlsWrapper">
		<section
			:id="`GenreScrollTrack-${genreName}`"
			class="GenreCardsContentWrapper"
			ref="scrollTrack"
			:aria-labelledby="`Genre-${genreName}`"
			role="listbox"
			aria-orientation="horizontal"
			tabindex="0"
		>
			<button
				v-if="!isLoading"
				class="GenreShowcaseNavButton ButtonLeft"
				ref="scrollButtonLeft"
				aria-label="Scroll left"
				:aria-controls="`GenreScrollTrack-${genreName}`"
				@click="scrollOnTrack(false)"
				:disabled="isButtonScrollLeftDisabled"
			>
				<i
					class="fa-solid fa-circle-chevron-left"
					aria-hidden="true"
				></i>
			</button>
			
			<ShowPreviewCard
				v-for="show in showsOfGenre"
				:key="show.id"
				:show="show"
			/>

			<button
				v-if="!isLoading"
				class="GenreShowcaseNavButton ButtonRight"
				aria-label="Scroll right"
				:aria-controls="`GenreScrollTrack-${genreName}`"
				ref="scrollButtonRight"
				@click="scrollOnTrack(true)"
				:disabled="isButtonScrollRightDisabled"
			>
				<i
					class="fa-solid fa-circle-chevron-right"
					aria-hidden="true"
				></i>
			</button>
		</section>
	</div>
</template>

<script lang="ts" src="./genre-showcase.ts" />
<style lang="scss" src="./genre-showcase.scss" />
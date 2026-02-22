<template>
	<div>
		<LoadingWrapper
			:classes="['GenreTitle']"
			:isLoading="isLoading"
		>
			<p class="GenreTitle RoundedBlock">
				{{ genreName }}
			</p>
		</LoadingWrapper>
		<div class="GenreCardsControlsWrapper">
			<div
				class="GenreCardsContentWrapper"
				ref="scrollTrack"
			>
				<button
					v-if="!isLoading"
					class="GenreShowcaseNavButton ButtonLeft"
					aria-label="Scroll left"
					ref="scrollButtonLeft"
					@click="scrollOnTrack(false)"
				>
					<i class="fa-solid fa-circle-chevron-left"></i>
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
					ref="scrollButtonRight"
					@click="scrollOnTrack(true)"
				>
					<i class="fa-solid fa-circle-chevron-right"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./genre-showcase.ts" />
<style lang="scss" src="./genre-showcase.scss" />
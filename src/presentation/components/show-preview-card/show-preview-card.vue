<template>
	<LoadingWrapper
		:classes="['ShowCard']"
		:isLoading="isLoading"
		tag="span"
	>
		<button
			:data-href="`/show-details/${show.id}`"
			class="ShowCardLink"
			:aria-label="cardSummary"
			tabindex="-1"
			@click="handleNavigationItemClick"
		>
			<article class="ShowCard RoundedBlock">
				<div class="ShowCardImageWrapper">
					<h2 class="ShowCardTitle">
						{{ show.name }}
					</h2>
					<img
						v-if="show.image"
						:src="show.image.medium"
						:alt="`${show.name} poster`"
						class="ShowCardImage"
					/>
					<span
						v-if="showRating"
						class="ShowCardRating"
						:aria-label="`Rating: ${showRating} out of 10`"
					>
						<i
							class="fa-solid fa-star ShowCardRatingIcon"
							aria-hidden="true"
						></i>
						<span class="ShowCardRatingScore">
							{{ showRating }}
						</span>
					</span>
				</div>

				<div class="ShowCardContent">

					<div class="ShowCardMeta">
						<span
							v-if="showYear"
							class="ShowCardDetailItem"
						>
							{{ showYear }}
						</span>
						<span
							v-if="showNetworkName"
							class="ShowCardDetailItem"
						>
							{{ showNetworkName }}
						</span>
					</div>

					<ul
						class="ShowCardGenres"
						aria-label="Genres"
					>
						<li
							v-for="genre in show.genres"
							:key="`show-genre-${genre}-${show.id}`"
							class="ShowCardDetailItem"
						>
							{{ genre }}
						</li>
					</ul>

					<p
						class="ShowCardSummary"
						v-html="sanitizedShowDescription"
					></p>
				</div>
			</article>
		</button>
	</LoadingWrapper>
</template>

<script lang="ts" src="./show-preview-card.ts" />
<style lang="scss" src="./show-preview-card.scss" />
<template>
	<LoadingWrapper
		:classes="['ShowCard']"
		:isLoading="isLoading"
		tag="span"
	>
		<a
			:href="`/show-details/${show.id}`"
			class="ShowCardLink"
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
						v-if="show.rating"
						class="ShowCardRating"
					>
						<i class="fa-solid fa-star ShowCardRatingIcon"></i>
						<span class="ShowCardRatingScore">
							{{ show.rating.average?.toFixed(1) }}
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
							v-if="show.network"
							class="ShowCardDetailItem"
						>
							{{ show.network.name }}
						</span>
					</div>

					<ul class="ShowCardGenres">
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
						v-html="show.summary"
					></p>
				</div>
			</article>
		</a>
	</LoadingWrapper>
</template>

<script lang="ts" src="./show-preview-card.ts" />
<style lang="scss" src="./show-preview-card.scss" />
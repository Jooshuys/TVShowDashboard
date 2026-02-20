<template>
	<a
		:href="`./show-details/${show.id}`"
		class="ShowCardLink"
	>
		<article class="ShowCard">
			<div class="ShowCardImageWrapper">
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
					⭐ {{ show.rating.average }}
				</span>
			</div>

			<div class="ShowCardContent">
				<h2 class="ShowCardTitle">
					{{ show.name }}
				</h2>

				<div class="ShowCardMeta">
					<span class="ShowCardDetailItem">
						{{ show.premiered.substr(0, 4) }}
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
</template>

<script lang="ts" src="./show-preview-card.ts" />
<style lang="scss" src="./show-preview-card.scss" />
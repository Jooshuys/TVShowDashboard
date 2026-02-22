<template>
	<article class="SpotlightWrapper">
		<LoadingWrapper
			:classes="['SpotlightImage']"
			:isLoading="isLoading"
		>
			<img
				v-if="show?.image"
				:src="show.image.original"
				:alt="`${show.name} poster`"
				class="SpotlightImage"
			/>
		</LoadingWrapper>
		<div class="SpotlightContentWrapper">
			<LoadingWrapper
				:classes="['SpotlightTitle']"
				:isLoading="isLoading"
			>
				<h1
					v-if="show"
					class="SpotlightTitle"
				>
					{{ show.name }}
				</h1>
			</LoadingWrapper>
			<div class="SpotlightContent">
				<LoadingWrapper
					:classes="['SpotlightSummary']"
					:isLoading="isLoading"
				>
					<p
						v-if="show"
						class="SpotlightSummary"
						v-html="sanitizedShowDescription"
					></p>
				</LoadingWrapper>
				<LoadingWrapper
					:classes="['SpotlightContentDetails']"
					:isLoading="isLoading"
				>
					<div
						v-if="show"
						class="SpotlightContentDetails"
					>
						<template v-if="showRating">
							<dt>Rating:</dt>
							<dd>{{ showRating }} / 10</dd>
						</template>

						<dt>Genres:</dt>
						<dd>{{ showGenresCommaSeparated }}</dd>

						<dt>Average runtime:</dt>
						<dd>{{ showRuntime }} minutes</dd>

						<template v-if="showYear">
							<dt>Year:</dt>
							<dd>{{ showYear }}</dd>
						</template>

						<template v-if="show.network">
							<dt>Network:</dt>
							<dd>{{ show.network.name }}</dd>
							
							<dt>Country:</dt>
							<dd>{{ show.network.country.name }}</dd>
						</template>

						<dt>Language:</dt>
						<dd>{{ show.language }}</dd>
					</div>
				</LoadingWrapper>
			</div>
		</div>
	</article>
</template>

<script lang="ts" src="./show-spotlight.ts" />
<style lang="scss" src="./show-spotlight.scss" />
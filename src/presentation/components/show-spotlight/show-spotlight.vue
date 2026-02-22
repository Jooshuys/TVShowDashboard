<template>
	<article
		class="SpotlightWrapper"
	>
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
				<h2	
					v-if="show"
					class="SpotlightTitle"
				>
					{{ show.name }}
				</h2>
			</LoadingWrapper>
			<div class="SpotlightContent">
				<LoadingWrapper
					:classes="['SpotlightSummary']"
					:isLoading="isLoading"
				>
					<p
						v-if="show"
						class="SpotlightSummary"
						v-html="show.summary"
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
						<div v-if="show.rating.average">
							<label class="SpotlightLabel">
								Rating:
							</label>
								{{ show.rating.average }} / 10
						</div>

						<div>
							<label class="SpotlightLabel">
								Genres:
							</label>
							{{ showGenresCommaSeparated }}
						</div>

						<div>
							<label class="SpotlightLabel">
								Average runtime:
							</label>
							{{ show.runtime ? show.runtime : show.averageRuntime }} minutes
						</div>

						<div v-if="showYear">
							<label class="SpotlightLabel">
								Year:
							</label>
							{{ showYear }}
						</div>

						<template v-if="show.network">
							<div>
								<label class="SpotlightLabel">
									Network:
								</label>
								{{ show.network.name }}
							</div>
							
							<div>
								<label class="SpotlightLabel">
									Country:
								</label>
								{{ show.network.country.name }}
							</div>
						</template>

						<div>
							<label class="SpotlightLabel">
								Language:
							</label>
							{{ show.language }}
						</div>
					</div>
				</LoadingWrapper>
			</div>
		</div>
	</article>
</template>

<script lang="ts" src="./show-spotlight.ts" />
<style lang="scss" src="./show-spotlight.scss" />
<template>
	<div>
		<article
			v-if="show"
			class="SpotlightWrapper"
		>
			<img
				v-if="show.image"
				:src="show.image.original"
				:alt="`${show.name} poster`"
				class="SpotlightImage"
			/>
			<div class="SpotlightContentWrapper">
				<h2 class="SpotlightTitle">
					{{ show.name }}
				</h2>
				<div class="SpotlightContent">
					<p
						class="SpotlightSummary"
						v-html="show.summary"
					></p>
					<div class="SpotlightContentDetails">
						<div v-if="show.rating">
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

						<div>
							<label class="SpotlightLabel">
								Year:
							</label>
							{{ show.premiered.substr(0, 4) }}
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
				</div>
			</div>
		</article>
	</div>
</template>

<script lang="ts" src="./show-details.ts" />
<style lang="scss" src="./show-details.scss" />
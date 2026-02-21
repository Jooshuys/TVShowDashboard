<template>
	<div class="DropdownContainer">
		<p
			v-if="isLoadingFailure"
			class="SearchFailedMessage"
		>
			Something went wrong. Please refresh the page.
		</p>
		<p
			v-else-if="!shows.length && searchTerm"
			class="NotFoundMessage"
		>
			No results found. Please adjust your search.
		</p>
		<template
			v-for="(show, index) in shows"
			:key="`dropdown-item-${index}`"
		>
			<DropdownItem
				:show="show"
				@onClick="emitClick"
			/>
		</template>
	</div>
</template>

<script lang="ts" src="./dropdown.ts" />
<style lang="scss" src="./dropdown.scss" />

<template>
	<div class="DropdownContainer">
		<p
			v-if="!shows.length && searchTerm"
			class="NotFoundContainer"
		>
			No results found. Try adjusting your search.
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

<template>
	<div class="DropdownContainer">
		<div v-if="isLoading">Loading ...</div>
		<p
			v-else-if="!shows.length && searchTerm"
			class="NotFoundContainer"
		>
			No results
		</p>
		<template
			v-else
			v-for="show in shows"
			:key="show.id"
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

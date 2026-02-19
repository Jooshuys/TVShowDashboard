<template>
	<div class="SearchContainer">
		<span class="SearchIcon">
			<i class="fa-solid fa-magnifying-glass"></i>
		</span>
		<input
			type="text"
			class="SearchInput"
			ref="searchInput"
			placeholder="Type to search for shows"
			@input="setSearchTerm"
			@focus="onInputFocus"
		/>
	</div>
	<Dropdown
		v-if="showDropdown"
		:searchTerm="searchTerm"
		:items="searchResults"
	/>
</template>

<script lang="ts" src="./search-input.ts" />
<style lang="scss" src="./search-input.scss" />

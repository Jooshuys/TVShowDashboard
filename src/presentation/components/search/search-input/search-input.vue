<template>
	<div
		ref="searchWrapper"
		class="SearchWrapper"
	>
		<div class="SearchBar">
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
			<span
				v-if="searchTerm"
				class="SearchIcon CloseIcon"
			>
				<i
					class="fa-solid fa-xmark"
					@click="resetSearchTerm"
				></i>
			</span>
		</div>
		<Dropdown
			v-if="showDropdown"
			:searchTerm="searchTerm"
			:searchResults="searchResults"
			@onClick="updateDropdownVisibility(false, true)"
		/>
	</div>
</template>

<script lang="ts" src="./search-input.ts" />
<style lang="scss" src="./search-input.scss" />

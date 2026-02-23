<template>
	<div
		ref="searchWrapper"
		class="SearchWrapper"
		role="search"
		@keydown.esc="updateDropdownVisibility(false)"
	>
		<div class="SearchBar RoundedBlock">
			<span class="SearchIcon">
				<i
					class="fa-solid fa-magnifying-glass"
					aria-hidden="true"
				></i>
			</span>
			<label
				for="SearchInput"
				class="Hidden"
			>
				Searchshows
			</label> 
			<input
				id="SearchInput"
				ref="searchInput"
				type="text"
				placeholder="Type to search for shows"
				autocomplete="off"
				aria-autocomplete="list"
				aria-controls="SearchDropdown"
				:aria-expanded="showDropdown"
				role="combobox"
				@input="setSearchTerm"
				@focus="onInputFocus"
			/>
			<button
				v-if="searchTerm"
				class="SearchIcon CloseIcon"
				aria-label="Clear search"
				@click="resetSearchTerm"
			>
				<i
					class="fa-solid fa-xmark"
					aria-hidden="true"
				></i>
			</button>
		</div>
		<Dropdown
			v-if="showDropdown"
			:searchTerm="searchTerm"
			:searchResults="searchResults"
			@[emitResultClicked]="updateDropdownVisibility(false, true)"
		/>
	</div>
</template>

<script lang="ts" src="./search-input.ts" />
<style lang="scss" src="./search-input.scss" />

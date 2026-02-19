<template>
	<div class="DropdownContainer">
		<p
			v-if="!items.length && searchTerm"
			class="NotFoundContainer"
		>
			No results
		</p>
		<template
			v-else
			v-for="item in items"
			:key="item.id"
		>
			<DropdownItem
				:name="item.name"
			/>
		</template>
	</div>
</template>

<script lang="ts" src="./dropdown.ts" />

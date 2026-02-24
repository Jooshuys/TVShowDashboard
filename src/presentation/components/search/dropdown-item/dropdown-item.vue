<template>
	<LoadingWrapper
		:classes="['DropdownItem']"
		:isLoading="isLoading"
	>
		<button
			:data-href="`/show-details/${show.id}`"
			class="DropdownItem"
			role="option"
			@click="handleNavigationItemClick"
		>
			{{ show.name }}
			<span v-if="showYear">
				({{ showYear }})
			</span>
		</button>
	</LoadingWrapper>
</template>

<script lang="ts" src="./dropdown-item.ts" />
<style lang="scss" src="./dropdown-item.scss" />

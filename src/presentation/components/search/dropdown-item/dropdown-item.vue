<template>
	<LoadingWrapper
		:classes="['DropdownItem']"
		:isLoading="isLoading"
	>
		<a
			:href="`/show-details/${show.id}`"
			class="DropdownItem"
			@click="handleNavigationItemClick"
		>
			{{ show.name }}
			<span v-if="showYear">
				({{ showYear }})
			</span>
		</a>
	</LoadingWrapper>
</template>

<script lang="ts" src="./dropdown-item.ts" />
<style lang="scss" src="./dropdown-item.scss" />

<template>
	<component
		v-if="isLoading"
		:class="[
			{ 'LoadingWrapper': isLoading }
		]"
		:is="tag"
		:aria-busy="isLoading"
	>
		<div :class="[
			...classes,
			'LoadingContent'
		]"></div>
	</component>
	<template v-else>
		<slot></slot>
	</template>
</template>


<script lang="ts" src="./loading-wrapper.ts"></script>
<style lang="scss" src="./loading-wrapper.scss" />
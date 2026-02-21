<template>
	<component
		:class="[
			{ 'LoadingWrapper': isLoading }
		]"
		:is="tag"
	>
		<template v-if="isLoading">
			<div :class="[
				...classes,
				'LoadingContent'
			]"></div>
		</template>
		<template v-else>
			<slot></slot>
		</template>
	</component>
</template>


<script lang="ts" src="./loading-wrapper.ts"></script>
<style lang="scss" src="./loading-wrapper.scss" />
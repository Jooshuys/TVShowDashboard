<template>
	<div
		class="LoadingFailureNotification"
		role="alert"
		aria-live="assertive"
		tabindex="-1"
	>
		<i
			class="fa-solid fa-triangle-exclamation LoadingFailureIcon"
			aria-hidden="true"
		></i>
		<p class="LoadingFailureMessage">
			{{ loadingProcess?.errorMessage }}
		</p>
	</div>
</template>

<script lang="ts" src="./loading-failure-notification.ts"></script>
<style lang="scss" src="./loading-failure-notification.scss" />
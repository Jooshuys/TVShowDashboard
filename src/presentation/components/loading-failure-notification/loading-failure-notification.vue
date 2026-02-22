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
			Something went wrong while loading the content. Please refresh the page.
		</p>
	</div>
</template>

<style lang="scss" src="./loading-failure-notification.scss" />
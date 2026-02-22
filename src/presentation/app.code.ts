import { Component, computed, nextTick, watch, WatchStopHandle } from "vue";
import { RoutesCluster, Routes, Router } from "@/models/router";
import Overview from "@/presentation/pages/overview/overview.vue";
import ShowDetails from "@/presentation/pages/show-details/show-details.vue";
import routePresenter from "@/presenters/route-presenter";
import tvMazeService from "@/services/tv-maze-service";
import store from "@/store";

export default class AppCode {
	private stopRouterWatcher: WatchStopHandle | null = null;
	private routes: RoutesCluster = {
		[Routes.OVERVIEW]: Overview,
		[Routes.SHOW_DETAILS]: ShowDetails
	};

	public CurrentComponent = computed((): Component => {
		return this.routes[this.router.value.current];
	});

	private router = computed((): Router => {
		return store.getters.router();
	});

	public mounted(): void {
		routePresenter.prepareForRoutingActions();

		void tvMazeService.retrieveShowsForGenreCluster(0);
		
		this.stopRouterWatcher = watch(
			this.router,
			this.focusMainAfterNavigation.bind(this)
		);
	}

	public unmounted(): void {
		if (!this.stopRouterWatcher) {
			return;
		}

		this.stopRouterWatcher();
		this.stopRouterWatcher = null;
	}

	private async focusMainAfterNavigation(newValue: Router, oldValue: Router): Promise<void> {
		if (oldValue.current === newValue.current) {
			return;
		}

		await nextTick();

		const main = document.getElementById("MainContent");
		if (!main) {
			return;
		}

		// Ensure focus goes to the main content after navigation so screen readers announce new page.
		main.setAttribute("tabindex", "-1");
		main.focus();

		// Remove tabindex after focusing to clean up.
		main.addEventListener(
			"blur",
			() => main.removeAttribute("tabindex"),
			{ once: true }
		);
	}
}
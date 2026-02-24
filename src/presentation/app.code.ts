import { Component, computed, nextTick, ref, watch, WatchStopHandle } from "vue";
import { RoutesCluster, Routes, Router } from "@/models/router";
import Overview from "@/presentation/pages/overview/overview.vue";
import ShowDetails from "@/presentation/pages/show-details/show-details.vue";
import routePresenter from "@/presenters/route-presenter";
import tvMazeService from "@/services/tv-maze-service";
import store from "@/store";

export default class AppCode {
	public userUsingKeyboard = ref(false);
	private boundKeydownListener: (event: KeyboardEvent) => void;
	private boundMousedownListener: () => void; 
	private stopRouterWatcher: WatchStopHandle | null = null;
	private routes: RoutesCluster = {
		[Routes.OVERVIEW]: Overview,
		[Routes.SHOW_DETAILS]: ShowDetails
	};

	constructor() {
		this.boundKeydownListener = this.onKeydown.bind(this);
		this.boundMousedownListener = this.onMouseDown.bind(this);
	}

	public CurrentComponent = computed((): Component => {
		return this.routes[this.router.value.current];
	});

	private router = computed((): Router => {
		return store.getters.router();
	});

	public mounted(): void {
		this.updateEventListeners(true);

		void tvMazeService.retrieveShowsForGenreCluster(0);
		
		this.stopRouterWatcher = watch(
			this.router,
			this.focusMainAfterNavigation.bind(this)
		);
	}

	public unmounted(): void {
		this.updateEventListeners(false);
		
		if (!this.stopRouterWatcher) {
			return;
		}

		this.stopRouterWatcher();
		this.stopRouterWatcher = null;
	}

	private setUserUsingKeyboardAs(isUsingKeyboard: boolean): void {
		this.userUsingKeyboard.value = isUsingKeyboard;
	}

	private onKeydown(event: KeyboardEvent): void {
		if (event.key !== "Tab") {
			return;
		}

		this.setUserUsingKeyboardAs(true);
	}

	private onMouseDown(): void {
		this.setUserUsingKeyboardAs(false);
	}

	private updateEventListeners(actionIsAdding: boolean): void {
		if (actionIsAdding) {
			window.addEventListener("keydown", this.boundKeydownListener);
			window.addEventListener("mousedown", this.boundMousedownListener);
		} else {
			window.removeEventListener("keydown", this.boundKeydownListener);
			window.removeEventListener("mousedown", this.boundMousedownListener);
		}
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
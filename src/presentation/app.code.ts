import { Component, computed } from "vue";
import { RoutesCluster, Routes, Router } from "@/models/router";
import Overview from "@/presentation/pages/overview/overview.vue";
import ShowDetails from "@/presentation/pages/show-details/show-details.vue";
import routePresenter from "@/presenters/route-presenter";
import tvMazeService from "@/services/tv-maze-service";
import store from "@/store";

export default class AppCode {
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
	}
}
import { computed, watch, WatchStopHandle } from "vue";
import { TVMazeItem } from "@/models/tv-maze";
import { Router } from "@/models/router";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import tvMazeService from "@/services/tv-maze-service";
import store from "@/store";

export default class ShowDetailsCode {
	private stopIsLoadingWatcher: WatchStopHandle | null = null;
	private stopRouterWatcher: WatchStopHandle | null = null;

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public genreClusterHasShows = computed((): boolean => {
		return store.getters.genreClusterHasShows();
	});

	public showForCurrentRoute = computed((): TVMazeItem | undefined => {
		return store.getters.showForCurrentRoute();
	});

	public show = computed((): TVMazeItem | undefined => {
		return store.getters.showForCurrentRoute();
	});

	private router = computed((): Router => {
		return store.getters.router();
	});

	public showGenresCommaSeparated = computed((): string => {
		if (!this.show.value) {
			return '';
		}

		return this.show.value.genres.join(', ');
	});

	public mounted(): void {
		void this.checkIfShowNeedsToBeRetrieved();

		this.stopIsLoadingWatcher = watch(
			this.isLoading,
			(newValue, oldValue) => {
				if (!oldValue || newValue) {
					return;
				}

				void this.checkIfShowNeedsToBeRetrieved();
			}
		);

		this.stopRouterWatcher = watch(
			this.router,
			(newValue, oldValue) => {
				if (oldValue.props.id === newValue.props.id) {
					return;
				}

				void this.checkIfShowNeedsToBeRetrieved();
			}
		);
	}

	public unmounted(): void {
		if (this.stopIsLoadingWatcher) {
			this.stopIsLoadingWatcher();
			this.stopIsLoadingWatcher = null;
		}

		if (this.stopRouterWatcher) {
			this.stopRouterWatcher();
			this.stopRouterWatcher = null;
		}
	}

	public async checkIfShowNeedsToBeRetrieved(): Promise<void> {
		if (this.showForCurrentRoute.value || this.isLoading.value) {
			return;
		}

		await tvMazeService.retrieveShowById(this.router.value.props.id);
	}
}
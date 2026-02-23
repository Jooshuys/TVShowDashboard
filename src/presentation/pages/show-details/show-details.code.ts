import { computed, watch, WatchStopHandle } from "vue";
import { TVMazeItem } from "@/models/tv-maze";
import { Router } from "@/models/router";
import { LoadingProcess, LoadingStatuses, LoadingTypes } from "@/models/loading";
import tvMazeService from "@/services/tv-maze-service";
import store from "@/store";

export default class ShowDetailsCode {
	private stopIsLoadingWatcher: WatchStopHandle | null = null;
	private stopRouterWatcher: WatchStopHandle | null = null;

	public isLoading = computed((): boolean => {
		return this.loadingProcess.value?.status === LoadingStatuses.ACTIVE;
	});

	public isLoadingFailure = computed((): boolean => {
		return this.loadingProcess.value?.status === LoadingStatuses.ERROR;
	});

	public loadingProcess = computed((): LoadingProcess | undefined => {
		return store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
	});

	private showForCurrentRoute = computed((): TVMazeItem | undefined => {
		return store.getters.showForCurrentRoute();
	});

	private router = computed((): Router => {
		return store.getters.router();
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

				void this.checkIfShowNeedsToBeRetrieved(true);
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

	public async checkIfShowNeedsToBeRetrieved(retrieveDespiteLoadingFailure = false): Promise<void> {
		if (this.isLoadingFailure.value && !retrieveDespiteLoadingFailure) {
			return;
		}

		if (this.showForCurrentRoute.value || this.isLoading.value) {
			return;
		}

		await tvMazeService.retrieveShowById(this.router.value.props.id);
	}
}
import { computed } from "vue";
import { TVMazeItem } from "@/models/tv-maze";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import sanitizePresenter from "@/presenters/sanitize-presenter";
import store from "@/store";

export default class ShowSpotlightCode {

	public showYear = computed((): string => {
		return this.show.value?.premiered?.substring(0, 4) ?? "";
	});

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public genreClusterHasShows = computed((): boolean => {
		return store.getters.genreClusterHasShows();
	});

	public show = computed((): TVMazeItem | undefined => {
		return store.getters.showForCurrentRoute();
	});

	public showGenresCommaSeparated = computed((): string => {
		if (!this.show.value) {
			return "";
		}

		return this.show.value.genres.join(", ");
	});

	public showRating = computed((): string => {
		return this.show.value?.rating.average?.toFixed(1) ?? "";
	});

	public showRuntime = computed((): number => {
		if (this.show.value?.runtime) {
			return this.show.value.runtime;
		}

		if (this.show.value?.averageRuntime) {
			return this.show.value.averageRuntime;
		}

		return 0;
	})

	public sanitizedShowDescription = computed((): string => {
		if (!this.show.value) {
			return "";
		}

		return sanitizePresenter.sanitize(this.show.value.summary);
	});
}
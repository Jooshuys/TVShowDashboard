import { computed } from "vue";
import { TVMazeItem } from "@/models/tv-maze";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import store from "@/store";

export default class ShowSpotlightCode {

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

	public showGenresCommaSeparated = computed((): string => {
		if (!this.show.value) {
			return '';
		}

		return this.show.value.genres.join(', ');
	});
}
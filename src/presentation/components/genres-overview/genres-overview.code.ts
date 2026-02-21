import { computed } from "vue";
import { DEFAULT_GENRE_COUNT } from "@/static/defaults";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import store from "@/store";

export default class GenreOverviewCode {

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public genresToShow = computed((): string[] => {
		if (this.isLoading.value) {
			const loadingGenres = [];
			for (let i = 0; i < DEFAULT_GENRE_COUNT; i++) {
				loadingGenres.push(i.toString());
			}
			return loadingGenres;
		}

		const genresOrderedBySize = store.getters.genresOrderedBySize();
		return genresOrderedBySize.slice(0, DEFAULT_GENRE_COUNT);
	});
}

// TODO: Show more genres when at bottom of page.
// TODO: Fetch more shows when near end of one genre.
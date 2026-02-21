import { computed } from "vue";
import { DEFAULT_SHOWS_PER_GENRE, DEFAULT_SHOW } from "@/static/defaults";
import { TVMazeItem } from "@/models/tv-maze";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import store from "@/store";

export default class GenreShowcaseCode {

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public showsOfGenre = computed((): TVMazeItem[] => {
		if (this.isLoading.value) {
			const shows = [];
			for (let i = 0; i < DEFAULT_SHOWS_PER_GENRE; i++) {
				shows.push(DEFAULT_SHOW);
			}
			return shows;
		}

		return store.getters.showsOfGenre(this.genreName);
	});
	
	constructor(
		public genreName: string
	) { }
}

import { computed } from "vue";
import TVMazeService from "@/services/tv-maze-service";
import store from "@/store";

export default class GenreOverviewCode {
	private amountOfGenresToShow = 5;

	public genresToShow = computed((): string[] => {
		const genresOrderedBySize = store.getters.genresOrderedBySize();
		return genresOrderedBySize.slice(0, this.amountOfGenresToShow);
	});

	private genreClusterHasShows = computed((): boolean => {
		return store.getters.genreClusterHasShows();
	});

	public mounted(): void {
		if (this.genreClusterHasShows.value) {
			return;
		}

		void TVMazeService.retrieveShowsForGenreCluster(0);
	}
}

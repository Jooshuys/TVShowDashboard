import { computed } from "vue";
import { TVMazeItem } from "@/models/tv-maze";
import store from "@/store";

export default class ShowDetailsCode {

	public genreClusterHasShows = computed((): boolean => {
		return store.getters.genreClusterHasShows();
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
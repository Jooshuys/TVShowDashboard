import state from "./state";
import { Getters } from "@/models/store";

const getters: Getters = {
	genreClusterHasShows: () => {
		return Object.keys(state.genreCluster).length > 0;
	},
	genresOrderedBySize: () => {
		return Object.keys(state.genreCluster).sort((a, b) => {
			const listA = state.genreCluster[a] ?? [];
			const listB = state.genreCluster[b] ?? [];
			return listB.length - listA.length;
		});
	},
	showsOfGenre: (genre) => {
		const showsOfGenre = state.genreCluster[genre];
		return showsOfGenre ?? [];
	},
	router: () => state.router
}

export default getters;
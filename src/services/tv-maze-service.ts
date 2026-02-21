import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import { SearchResult } from "@/models/search";
import { TVMazeItem, TVMazeSearchItem } from "@/models/tv-maze";
import store from "@/store";

export default class TVMazeService {
	public static async retrieveShowsThatMatchName(query: string): Promise<SearchResult[]> {
		store.mutations.updateLoadingStatusOfType(LoadingTypes.SEARCH, LoadingStatuses.ACTIVE);
		const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
		const items: TVMazeSearchItem[] = await response.json();
		const mappedItems = items
			.map(item => ({
				id: item.show.id,
				genres: item.show.genres,
				name: item.show.name,
				premiered: item.show.premiered
			}));
		store.mutations.updateLoadingStatusOfType(LoadingTypes.SEARCH, LoadingStatuses.INACTIVE);
		return mappedItems
	}

	public static async retrieveShowsForGenreCluster(pageStart: number, amountOfPages = 5): Promise<void> {
		store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.ACTIVE);
		let combinedResults: TVMazeItem[] = [];
		for (let i = pageStart; i < pageStart + amountOfPages; i++) {
			const response = await fetch(`https://api.tvmaze.com/shows?page=${i}`);
			const shows: TVMazeItem[] = await response.json();
			const showsWithImages = shows.filter((show) => show.image !== null);
			combinedResults = combinedResults.concat(showsWithImages);
		}
		store.mutations.addShowsToGenreCluster(combinedResults);
		store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.INACTIVE);
	}

	public static async retrieveShowById(id: number): Promise<void> {
		store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.ACTIVE);
		const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
		const show = await response.json() as TVMazeItem | undefined;
		if (!show) {
			return;
		}

		store.mutations.addShowsToGenreCluster([show]);
		store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.INACTIVE);
	}
}
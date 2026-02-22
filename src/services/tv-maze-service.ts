import { computed } from "vue";
import { Router } from "@/models/router";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import { SearchResult } from "@/models/search";
import { TVMazeItem, TVMazeSearchItem } from "@/models/tv-maze";
import store from "@/store";

class TVMazeService {
	private apiUrl = 'https://api.tvmaze.com';

	private router = computed((): Router => {
		return store.getters.router();
	});

	public async retrieveShowsThatMatchName(query: string): Promise<SearchResult[]> {
		let showsAsSearchResults: SearchResult[] = []
		try {
			store.mutations.updateLoadingStatusOfType(LoadingTypes.SEARCH, LoadingStatuses.ACTIVE);
			const response = await fetch(`${this.apiUrl}/search/shows?q=${query}`);
			const items: TVMazeSearchItem[] = await response.json();
			showsAsSearchResults = items
				.filter(item => item.show.id !== this.router.value.props.id)
				.map(item => ({
					id: item.show.id,
					genres: item.show.genres,
					name: item.show.name,
					premiered: item.show.premiered ?? ""
				}));
			store.mutations.updateLoadingStatusOfType(LoadingTypes.SEARCH, LoadingStatuses.INACTIVE);
		} catch (error) {
			store.mutations.updateLoadingStatusOfType(
				LoadingTypes.SEARCH,
				LoadingStatuses.ERROR,
				"Something went wrong. Please refresh the page."
			);
			console.error(error);
		}

		return showsAsSearchResults;
	}

	public async retrieveShowsForGenreCluster(pageStart: number, amountOfPages = 5): Promise<void> {
		try {
			store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.ACTIVE);
			let combinedResults: TVMazeItem[] = [];
			for (let i = pageStart; i < pageStart + amountOfPages; i++) {
				const response = await fetch(`${this.apiUrl}/shows?page=${i}`);
				const shows: TVMazeItem[] = await response.json();
				const showsWithImages = shows.filter((show) => show.image !== null);
				combinedResults = combinedResults.concat(showsWithImages);
			}
			store.mutations.addShowsToGenreCluster(combinedResults);
			store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.INACTIVE);
		} catch (error) {
			store.mutations.updateLoadingStatusOfType(
				LoadingTypes.GENRE_CLUSTER,
				LoadingStatuses.ERROR,
				"Something went wrong while loading the shows. Please refresh the page."
			);
			console.error(error);
		}
	}

	public async retrieveShowById(id: number): Promise<void> {
		try {
			store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.ACTIVE);
			const response = await fetch(`${this.apiUrl}/shows/${id}`);
			const show = await response.json() as TVMazeItem | undefined;
			if (!show) {
				return;
			}

			store.mutations.addShowsToGenreCluster([show]);
			store.mutations.updateLoadingStatusOfType(LoadingTypes.GENRE_CLUSTER, LoadingStatuses.INACTIVE);
		} catch (error) {
			store.mutations.updateLoadingStatusOfType(
				LoadingTypes.GENRE_CLUSTER,
				LoadingStatuses.ERROR,
				"Something went wrong while loading this show. Please refresh the page."
			);
			console.error(error);
		}
	}
}

export default new TVMazeService();
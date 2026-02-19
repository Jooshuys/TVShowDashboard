import { SearchResult } from "@/models/search";
import { TVMazeItem, TVMazeSearchItem } from "@/models/tv-maze";
import store from "@/store";

export default class TVMazeService {
	public static async retrieveShowsThatMatchName(query: string): Promise<SearchResult[]> {
		const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
		const result: TVMazeSearchItem[] = await response.json();
		return result
			.map(item => ({
				id: item.show.id,
				name: item.show.name,
				genres: item.show.genres
			}));
	}

	public static async retrieveShowsForGenreCluster(pageStart: number, amountOfPages = 5): Promise<void> {
		let combinedResults: TVMazeItem[] = [];
		for (let i = pageStart; i < pageStart + amountOfPages; i++) {
			const response = await fetch(`https://api.tvmaze.com/shows?page=${i}`);
			const result: TVMazeItem[] = await response.json();
			combinedResults = combinedResults.concat(result);
		}
		store.mutations.addShowsToGenreCluster(combinedResults);
	}
}
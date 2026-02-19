import { SearchResult } from "@/models/search";
import { TVMazeItem, TVMazeSearchItem } from "@/models/tv-maze";
import store from "@/store";

export default class TVMazeService {
	public static async retrieveShowsThatMatchName(query: string): Promise<SearchResult[]> {
		const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
		const items: TVMazeSearchItem[] = await response.json();
		return items
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
			const shows: TVMazeItem[] = await response.json();
			const showsWithImages = shows.filter((show) => show.image !== null);
			combinedResults = combinedResults.concat(showsWithImages);
		}
		store.mutations.addShowsToGenreCluster(combinedResults);
	}
}
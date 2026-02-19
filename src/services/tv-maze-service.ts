import { SearchResult } from "@/models/search";
import { TVMazeSearchItem } from "@/models/tv-maze";

export default class TVMazeService {
	public static async retrieveShowsThatMatchName(query: string): Promise<SearchResult[]> {
		const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
		const result: TVMazeSearchItem[] = await response.json();
		return result
			.map(item => ({
				id: item.show.id,
				name: item.show.name
			}));
	}
}
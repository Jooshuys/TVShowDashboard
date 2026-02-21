import { SearchResult } from "@/models/search";
import { TVMazeItem } from "@/models/tv-maze";

const DEFAULT_GENRE_COUNT = 5;
const DEFAULT_SHOWS_PER_GENRE = 30;
const DEFAULT_SEARCH_RESULTS_COUNT = 10;

const DEFAULT_SHOW: TVMazeItem = {
	genres: [],
	id: 0,
	image: {
		medium: "",
		original: "",
	},
	language: "",
	name: "",
	network: null,
	premiered: "",
	rating: {
		average: null,
	},
	runtime: null,
	averageRuntime: null,
	summary: ""
};

const DEFAULT_SEARCH_RESULT: SearchResult = {
	id: 0,
	genres: [],
	name: '',
	premiered: ''
};

export {
	DEFAULT_GENRE_COUNT,
	DEFAULT_SEARCH_RESULTS_COUNT,
	DEFAULT_SHOWS_PER_GENRE,
	DEFAULT_SHOW,
	DEFAULT_SEARCH_RESULT
};
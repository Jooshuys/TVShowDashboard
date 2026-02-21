import { TVMazeItem } from "@/models/tv-maze";

const DEFAULT_GENRE_COUNT = 5;
const DEFAULT_SHOWS_PER_GENRE = 30;

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

export {
	DEFAULT_GENRE_COUNT,
	DEFAULT_SHOWS_PER_GENRE,
	DEFAULT_SHOW
};
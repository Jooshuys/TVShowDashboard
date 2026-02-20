import { Router, Routes } from "@/models/router"
import { TVMazeItem, TVMazeGenreCluster } from "@/models/tv-maze";

type Getters = {
	genreClusterHasShows: () => boolean,
	genresOrderedBySize: () => string[],
	showForCurrentRoute: () => TVMazeItem | undefined,
	showsOfGenre: (genre: string) => TVMazeItem[],
	router: () => Router
}

type Mutations = {
	addShowsToGenreCluster: (shows: TVMazeItem[]) => void;
	navigateToRoute: (url: string) => void;
}

type State = {
	genreCluster: TVMazeGenreCluster,
	router: Router;
}

type Store = {
	state: State;
	getters: Getters;
	mutations: Mutations;
}

export { Getters, Mutations, State, Store };
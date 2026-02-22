import { Router } from "@/models/router"
import { TVMazeItem, TVMazeGenreCluster } from "@/models/tv-maze";
import { LoadingCluster, LoadingProcess, LoadingStatuses, LoadingTypes } from "./loading";

type Getters = {
	genreClusterHasShows: () => boolean;
	genresOrderedBySize: () => string[];
	loadingProcessOfType: (type: LoadingTypes) => LoadingProcess | undefined;
	showForCurrentRoute: () => TVMazeItem | undefined;
	showsOfGenre: (genre: string, amountOfShows: number) => TVMazeItem[];
	router: () => Router;
}

type Mutations = {
	addShowsToGenreCluster: (shows: TVMazeItem[]) => void;
	navigateToRoute: (url: string) => void;
	updateLoadingStatusOfType: (type: LoadingTypes, status: LoadingStatuses, errorMessage?: string) => void;
}

type State = {
	genreCluster: TVMazeGenreCluster;
	loadingCluster: LoadingCluster;
	router: Router;
}

type Store = {
	state: State;
	getters: Getters;
	mutations: Mutations;
}

export { Getters, Mutations, State, Store };
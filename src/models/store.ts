import { Router, Routes } from "@/models/router"

type Getters = {
	router: () => Router
}

type Mutations = {
	setCurrentRoute: (name: Routes, id?: number) => void;
}

type State = {
	router: Router;
}

type Store = {
	state: State;
	getters: Getters;
	mutations: Mutations;
}

export { Getters, Mutations, State, Store };
import { Component } from "vue";

enum Routes {
	OVERVIEW = "overview",
	SHOW_DETAILS = "show-details"
}

type Router = {
	current: Routes;
	props: {
		id: number;
	};
}

type RoutesCluster = {
	[key in Routes]: Component;
}

export { Routes, Router, RoutesCluster };
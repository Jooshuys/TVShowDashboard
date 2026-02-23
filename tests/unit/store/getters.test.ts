import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import { Routes } from "@/models/router";
import importedState from "@/store/state";
import getters from "@/store/getters";

vi.mock("@/store/state", () => ({
	__esModule: true,
	default: {
		genreCluster: {},
		loadingCluster: {
			[LoadingTypes.GENRE_CLUSTER]: {
				status: LoadingStatuses.INACTIVE,
				errorMessage: ""
			},
			[LoadingTypes.SEARCH]: {
				status: LoadingStatuses.ACTIVE,
				errorMessage: ""
			}
		},
		router: {
			current: Routes.OVERVIEW,
			props: {
				id: 5
			}
		}
	}
}));

describe("getters", () => {
	const state = importedState as any;
	const genreClusterExample = {
		"Comedy": [{ id: 1 }, { id: 2 }],
		"Drama": [{ id: 3 }],
		"Action": [{ id: 4 }, { id: 5 }, { id: 6 }]
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	test.each([
		[{}, false],
		[{ "Comedy": [] }, true],
		[{ "Comedy": [{ id: 1 }] }, true]
	])("genreClusterHasShows: when cluster use case %#, give expected result.", (genreCluster, expected) => {
		state.genreCluster = genreCluster;
		const result = getters.genreClusterHasShows();
		expect(result).toEqual(expected);
	});

	it("genresOrderedBySize: when cluster has no genres, give expected result.", () => {
		state.genreCluster = {};
		const result = getters.genresOrderedBySize();
		expect(result).toEqual([]);
	});

	it("genresOrderedBySize: when cluster has genres of unexpected structure, give expected result.", () => {
		state.genreCluster = {
			"Comedy": null,
			"Drama": null,
			"Action": null
		};
		const result = getters.genresOrderedBySize();
		expect(result).toEqual(["Comedy", "Drama", "Action"]);
	});

	it("genresOrderedBySize: when cluster has genres of expected structure, give expected result.", () => {
		state.genreCluster = genreClusterExample;
		const result = getters.genresOrderedBySize();
		expect(result).toEqual(["Action", "Comedy", "Drama"]);
	});

	test.each([
		[LoadingTypes.GENRE_CLUSTER, state.loadingCluster[LoadingTypes.GENRE_CLUSTER]],
		[LoadingTypes.SEARCH, state.loadingCluster[LoadingTypes.SEARCH]]
	])("loadingProcessOfType: when loading type use case %#, give expected result.", (type, expected) => {
		const result = getters.loadingProcessOfType(type);
		expect(result).toEqual(expected);
	});

	it("showForCurrentRoute: when current route has no props, give expected result.", () => {
		state.router.current = Routes.OVERVIEW;
		state.router.props = {};
		const result = getters.showForCurrentRoute();
		expect(result).toBeUndefined();
	});

	it("showForCurrentRoute: when current route has props, give expected result.", () => {
		state.genreCluster = genreClusterExample;
		state.router.current = Routes.SHOW_DETAILS;
		state.router.props = { id: 5 };
		const result = getters.showForCurrentRoute();
		expect(result).toEqual({ id: 5 });
	});

	test.each([
		["Comedy", 1, [{ id: 1 }]],
		["Comedy", 3, [{ id: 1 }, { id: 2 }]],
		["Drama", 1, [{ id: 3 }]],
		["Reality", 2, []]
	])("showsOfGenre: when params use case %#, give expected result.", (type, amountOfShows, expected) => {
		state.genreCluster = genreClusterExample;
		const result = getters.showsOfGenre(type, amountOfShows);
		expect(result).toEqual(expected);
	});

	it("router: when called, give expected result.", () => {
		const result = getters.router();
		expect(result).toEqual(state.router);
	});
});
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import { Routes } from "@/models/router";
import { TVMazeItem } from "@/models/tv-maze";
import importedState from "@/store/state";
import mutations from "@/store/mutations";

const mocksRoutePresenter: any = vi.hoisted(() => ({
	retrieveRouteNameFromUrl: vi.fn((url: string) => url.split("/")[0]),
	retrieveIdFromUrl: vi.fn((url: string) => parseInt(url.split("/")[1] as string))
}));

vi.mock("@/presenters/route-presenter", () => ({
	default: {
		retrieveRouteNameFromUrl: (url: string) => mocksRoutePresenter.retrieveRouteNameFromUrl(url),
		retrieveIdFromUrl: (url: string) => mocksRoutePresenter.retrieveIdFromUrl(url)
	}
}));

vi.mock("@/store/state", () => ({
	__esModule: true,
	default: {
		genreCluster: {
			"Drama": [
				{ id: 1, genres: ["Drama", "Science-Fiction", "Thriller"], rating: { average: 6.6 } },
				{ id: 3, genres: ["Drama", "Horror", "Romance"], rating: { average: 7.4 } },
				{ id: 4, genres: ["Drama", "Science-Fiction", "Action"], rating: { average: 7.4 } },
				{ id: 5, genres: ["Drama", "Thriller", "Crime"], rating: { average: 8.1 } }
			],
			"Science-Fiction": [
				{ id: 1, genres: ["Drama", "Science-Fiction", "Thriller"], rating: { average: 6.6 } },
				{ id: 2, genres: ["Science-Fiction", "Action", "Crime"], rating: { average: 8.8 } },
				{ id: 4, genres: ["Drama", "Science-Fiction", "Action"], rating: { average: 7.4 } }
			],
			"Thriller": [
				{ id: 1, genres: ["Drama", "Science-Fiction", "Thriller"], rating: { average: 6.6 } },
				{ id: 5, genres: ["Drama", "Thriller", "Crime"], rating: { average: 8.1 } }
			],
			"Action": [
				{ id: 2, genres: ["Science-Fiction", "Action", "Crime"], rating: { average: 8.8 } },
				{ id: 4, genres: ["Drama", "Science-Fiction", "Action"], rating: { average: 7.4 } }
			],
			"Crime": [
				{ id: 2, genres: ["Science-Fiction", "Action", "Crime"], rating: { average: 8.8 } },
				{ id: 5, genres: ["Drama", "Thriller", "Crime"], rating: { average: 8.1 } }
			],
			"Horror": [
				{ id: 3, genres: ["Drama", "Horror", "Romance"], rating: { average: 7.4 } }
			],
			"Romance": [
				{ id: 3, genres: ["Drama", "Horror", "Romance"], rating: { average: 7.4 } }
			]
		},
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

describe("mutations", () => {
	const state = importedState as any;

	beforeEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("addShowsToGenreCluster: when adding new shows to the cluster, is able to handle every use case.", () => {
		const shows = [
			{ id: 5, genres: ["Drama", "Thriller", "Crime"], rating: { average: 8.1 } },
			{ id: 6, genres: ["Action", "Adventure", "Science-Fiction"], rating: { average: 7.7 } },
			{ id: 7, genres: [], rating: { average: 8.2 } },
			{ id: 8, genres: ["Drama", "Music", "Romance"], rating: { average: null } },
			{ id: 9, genres: ["Drama", "Thriller", "Music"], rating: { average: 7.7 } },
			{ id: 10, genres: [], rating: { average: 8.4 } }
		];
		const expectedCluster = {
			"Drama": [
				{ id: 5, genres: ["Drama", "Thriller", "Crime"], rating: { average: 8.1 } },
				{ id: 9, genres: ["Drama", "Thriller", "Music"], rating: { average: 7.7 } },
				{ id: 3, genres: ["Drama", "Horror", "Romance"], rating: { average: 7.4 } },
				{ id: 4, genres: ["Drama", "Science-Fiction", "Action"], rating: { average: 7.4 } },
				{ id: 1, genres: ["Drama", "Science-Fiction", "Thriller"], rating: { average: 6.6 } },
				{ id: 8, genres: ["Drama", "Music", "Romance"], rating: { average: null } }
			],

			"Science-Fiction": [
				{ id: 2, genres: ["Science-Fiction", "Action", "Crime"], rating: { average: 8.8 } },
				{ id: 6, genres: ["Action", "Adventure", "Science-Fiction"], rating: { average: 7.7 } },
				{ id: 4, genres: ["Drama", "Science-Fiction", "Action"], rating: { average: 7.4 } },
				{ id: 1, genres: ["Drama", "Science-Fiction", "Thriller"], rating: { average: 6.6 } }
			],

			"Thriller": [
				{ id: 5, genres: ["Drama", "Thriller", "Crime"], rating: { average: 8.1 } },
				{ id: 9, genres: ["Drama", "Thriller", "Music"], rating: { average: 7.7 } },
				{ id: 1, genres: ["Drama", "Science-Fiction", "Thriller"], rating: { average: 6.6 } }
			],

			"Action": [
				{ id: 2, genres: ["Science-Fiction", "Action", "Crime"], rating: { average: 8.8 } },
				{ id: 6, genres: ["Action", "Adventure", "Science-Fiction"], rating: { average: 7.7 } },
				{ id: 4, genres: ["Drama", "Science-Fiction", "Action"], rating: { average: 7.4 } }
			],

			"Crime": [
				{ id: 2, genres: ["Science-Fiction", "Action", "Crime"], rating: { average: 8.8 } },
				{ id: 5, genres: ["Drama", "Thriller", "Crime"], rating: { average: 8.1 } }
			],

			"Horror": [
				{ id: 3, genres: ["Drama", "Horror", "Romance"], rating: { average: 7.4 } }
			],

			"Romance": [
				{ id: 3, genres: ["Drama", "Horror", "Romance"], rating: { average: 7.4 } },
				{ id: 8, genres: ["Drama", "Music", "Romance"], rating: { average: null } }
			],

			"Adventure": [
				{ id: 6, genres: ["Action", "Adventure", "Science-Fiction"], rating: { average: 7.7 } }
			],

			"Music": [
				{ id: 9, genres: ["Drama", "Thriller", "Music"], rating: { average: 7.7 } },
				{ id: 8, genres: ["Drama", "Music", "Romance"], rating: { average: null } }
			],
			"Other": [
				{ id: 10, genres: ["Other"], rating: { average: 8.4 } },
				{ id: 7, genres: ["Other"], rating: { average: 8.2 } }
			]
		};
		mutations.addShowsToGenreCluster(shows as TVMazeItem[]);
		expect(state.genreCluster).toEqual(expectedCluster);
	});

	test.each([
		["overview/", { current: Routes.OVERVIEW, props: { id: 0 } }],
		["overview/5", { current: Routes.OVERVIEW, props: { id: 5 } }],
		["show-details/10", { current: Routes.SHOW_DETAILS, props: { id: 10 } }]
	])("navigateToRoute: when route use case %#, give expected result.", (url, expected) => {
		vi.spyOn(window.history, "pushState").mockImplementation(() => {});
		mutations.navigateToRoute(url);
		expect(state.router).toEqual(expected);
		expect(mocksRoutePresenter.retrieveRouteNameFromUrl).toHaveBeenCalledTimes(1);
		expect(mocksRoutePresenter.retrieveRouteNameFromUrl).toHaveBeenCalledWith(url);
		expect(mocksRoutePresenter.retrieveIdFromUrl).toHaveBeenCalledTimes(1);
		expect(mocksRoutePresenter.retrieveIdFromUrl).toHaveBeenCalledWith(url);
		expect(window.history.pushState).toHaveBeenCalledTimes(1);
		expect(window.history.pushState).toHaveBeenCalledWith({}, "", url);
	});

	test.each([
		[LoadingTypes.SEARCH, LoadingStatuses.ACTIVE, undefined, { status: LoadingStatuses.INACTIVE, errorMessage: "" }],
		[LoadingTypes.GENRE_CLUSTER, LoadingStatuses.ACTIVE, undefined, { status: LoadingStatuses.ACTIVE, errorMessage: "" }],
		[LoadingTypes.GENRE_CLUSTER, LoadingStatuses.ERROR, "Something went wrong", { status: LoadingStatuses.ERROR, errorMessage: "Something went wrong" }],
	])("updateLoadingStatusOfType: when loading use case %#, give expected result.", (type, status, errorMessage, expectedResult) => {
		state.loadingCluster = {
			[LoadingTypes.GENRE_CLUSTER]: {
				status: LoadingStatuses.INACTIVE,
				errorMessage: ""
			}
		};
		mutations.updateLoadingStatusOfType(type, status, errorMessage);
		expect(state.loadingCluster[LoadingTypes.GENRE_CLUSTER]).toEqual(expectedResult);
		expect(state.loadingCluster[LoadingTypes.SEARCH]).toBeUndefined();
	});
});
import tvMazeService from "@/services/tv-maze-service";
import { LoadingTypes, LoadingStatuses } from "@/models/loading";

const mocksStore = vi.hoisted(() => ({
	router: { current: { path: "overview" } },
	updateLoadingStatusOfType: vi.fn((type: any, status: any, message?: string) => {}),
	addShowsToGenreCluster: vi.fn()
}));

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		getters: {
			router: () => mocksStore.router
		},
		mutations: {
			updateLoadingStatusOfType: (type: any, status: any, message?: string) => mocksStore.updateLoadingStatusOfType(type, status, message),
			addShowsToGenreCluster: (shows: any[]) => mocksStore.addShowsToGenreCluster(shows)
		}
	}
}));

describe("TV Maze service", () => {
	const mockedFetch: any = fetch;

	beforeEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("router: when computed property called, give expected value.", () => {
		const result = tvMazeService["router"].value;
		expect(result).toEqual(mocksStore.router);
	});

	it("retrieveShowsThatMatchName: when called, give expected result.", async () => {
		const context = {
			router: { value: { props: { id: 87053 } } },
			apiUrl: tvMazeService["apiUrl"]
		};
		const searchResults = [
			{ show: { id: 87053, genres: ["Comedy"], name: "Dog Park", premiered: "2026-02-01" } },
			{ show: { id: 7229, genres: [], name: "Lucky Dog", premiered: "2013-09-28" } },
			{ show: { id: 44579, genres: ["Drama", "Crime", "Thriller"], name: "Top Dog", premiered: null } }
		];
		mockedFetch.mockResponses([JSON.stringify(searchResults), { status: 200 }]);
		vi.spyOn(console, "error").mockImplementation(() => {});
		const result = await tvMazeService.retrieveShowsThatMatchName.bind(context)("dog");
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenCalledTimes(2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			1,
			LoadingTypes.SEARCH,
			LoadingStatuses.ACTIVE,
			undefined
		);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			2,
			LoadingTypes.SEARCH,
			LoadingStatuses.INACTIVE,
			undefined
		);
		expect(mockedFetch.mock.calls.length).toEqual(1);
		expect(mockedFetch.mock.calls[0][0]).toEqual("https://api.tvmaze.com/search/shows?q=dog");
		
		expect(console.error).toHaveBeenCalledTimes(0);
		expect(result.length).toEqual(2);
		expect(result[0]?.id).toEqual(7229);
		expect(result[0]?.genres).toEqual([]);
		expect(result[0]?.name).toEqual("Lucky Dog");
		expect(result[0]?.premiered).toEqual("2013-09-28");
		expect(result[1]?.id).toEqual(44579);
		expect(result[1]?.genres).toEqual(["Drama", "Crime", "Thriller"]);
		expect(result[1]?.name).toEqual("Top Dog");
		expect(result[1]?.premiered).toEqual("");
	});

	it("retrieveShowsThatMatchName: when retrieval method throws an error, handle it as expected.", async () => {
		const context = {
			router: { value: { props: { id: 87053 } } },
			apiUrl: tvMazeService["apiUrl"]
		};
		mockedFetch.mockReject(new Error("Failed to fetch"));
		vi.spyOn(console, "error").mockImplementation(() => {});
		await tvMazeService.retrieveShowsThatMatchName.bind(context)("dog");
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenCalledTimes(2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			1,
			LoadingTypes.SEARCH,
			LoadingStatuses.ACTIVE,
			undefined
		);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			2,
			LoadingTypes.SEARCH,
			LoadingStatuses.ERROR,
			"Something went wrong. Please refresh the page."
		);
		expect(mockedFetch.mock.calls.length).toEqual(1);
		expect(mockedFetch.mock.calls[0][0]).toEqual("https://api.tvmaze.com/search/shows?q=dog");
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(new Error("Failed to fetch"));
	});

	it("retrieveShowsForGenreCluster: when called, give expected result.", async () => {
		const showsPage1 = [
			{ id: 1, image: { medium: "https://image-test.com/1" } },
			{ id: 2, image: { medium: "https://image-test.com/2" } },
			{ id: 3, image: null }
		];
		const showsPage2 = [
			{ id: 4, image: { medium: "https://image-test.com/4" } },
			{ id: 5, image: null },
			{ id: 6, image: { medium: "https://image-test.com/6" } }
		];
		mockedFetch.mockResponses(
			[JSON.stringify(showsPage1), { status: 200 }],
			[JSON.stringify(showsPage2), { status: 200 }]
		);
		vi.spyOn(console, "error").mockImplementation(() => {});
		await tvMazeService.retrieveShowsForGenreCluster(0, 2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenCalledTimes(2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			1,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ACTIVE,
			undefined
		);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			2,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.INACTIVE,
			undefined
		);
		expect(mockedFetch.mock.calls.length).toEqual(2);
		expect(mockedFetch.mock.calls[0][0]).toEqual("https://api.tvmaze.com/shows?page=0");
		expect(mockedFetch.mock.calls[1][0]).toEqual("https://api.tvmaze.com/shows?page=1");
		expect(mocksStore.addShowsToGenreCluster).toHaveBeenCalledTimes(1);
		expect(mocksStore.addShowsToGenreCluster).toHaveBeenCalledWith([
			{ id: 1, image: { medium: "https://image-test.com/1" } },
			{ id: 2, image: { medium: "https://image-test.com/2" } },
			{ id: 4, image: { medium: "https://image-test.com/4" } },
			{ id: 6, image: { medium: "https://image-test.com/6" } }
		]);
		expect(console.error).toHaveBeenCalledTimes(0);
	});

	it("retrieveShowsForGenreCluster: when retrieval method throws an error, handle it as expected.", async () => {
		const error = new Error("Failed to fetch");
		mockedFetch.mockReject(error);
		vi.spyOn(console, "error").mockImplementation(() => {});
		await tvMazeService.retrieveShowsForGenreCluster(0, 2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenCalledTimes(2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			1,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ACTIVE,
			undefined
		);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			2,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ERROR,
			"Something went wrong while loading the shows. Please refresh the page."
		);
		expect(mockedFetch.mock.calls.length).toEqual(1);
		expect(mockedFetch.mock.calls[0][0]).toEqual("https://api.tvmaze.com/shows?page=0");
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(error);
	});

	it("retrieveShowById: when called, give expected result.", async () => {
		const show = { id: 87053, genres: ["Comedy"], name: "Dog Park", premiered: "2026-02-01" };
		mockedFetch.mockResponses([JSON.stringify(show), { status: 200 }]);
		vi.spyOn(console, "error").mockImplementation(() => {});
		await tvMazeService.retrieveShowById(87053);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenCalledTimes(2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			1,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ACTIVE,
			undefined
		);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			2,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.INACTIVE,
			undefined
		);
		expect(mockedFetch.mock.calls.length).toEqual(1);
		expect(mockedFetch.mock.calls[0][0]).toEqual("https://api.tvmaze.com/shows/87053");
		expect(console.error).toHaveBeenCalledTimes(0);
	});

	it("retrieveShowById: when show not found, throw error and handle it as expected.", async () => {
		mockedFetch.mockResponses([JSON.stringify(null), { status: 200 }]);
		vi.spyOn(console, "error").mockImplementation(() => {});
		await tvMazeService.retrieveShowById(87053);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenCalledTimes(2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			1,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ACTIVE,
			undefined
		);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			2,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ERROR,
			"Something went wrong while loading this show. Please refresh the page or view another show."
		);
		expect(mockedFetch.mock.calls.length).toEqual(1);
		expect(mockedFetch.mock.calls[0][0]).toEqual("https://api.tvmaze.com/shows/87053");
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(new Error("Show with id 87053 not found."));
	});

	it("retrieveShowById: when retrieval method throws an error, handle it as expected.", async () => {
		const error = new Error("Failed to fetch");
		mockedFetch.mockReject(error);
		vi.spyOn(console, "error").mockImplementation(() => {});
		await tvMazeService.retrieveShowById(87053);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenCalledTimes(2);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			1,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ACTIVE,
			undefined
		);
		expect(mocksStore.updateLoadingStatusOfType).toHaveBeenNthCalledWith(
			2,
			LoadingTypes.GENRE_CLUSTER,
			LoadingStatuses.ERROR,
			"Something went wrong while loading this show. Please refresh the page or view another show."
		);
		expect(mockedFetch.mock.calls.length).toEqual(1);
		expect(mockedFetch.mock.calls[0][0]).toEqual("https://api.tvmaze.com/shows/87053");
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(error);
	});
});
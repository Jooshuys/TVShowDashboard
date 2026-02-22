import { LoadingStatuses } from "@/models/loading";
import ShowSpotlightCode from "@/presentation/components/show-spotlight/show-spotlight.code";

const mocksStore: any = vi.hoisted(() => {
	const storeVariables = {
		loadingProcess: { status: 0, errorMessage: "" },
		genreClusterHasShows: true,
		showForCurrentRoute: null
	};

	return {
		getLoadingProcess: () => storeVariables.loadingProcess,
		updateLoadingProcessStatus: (status: any) => storeVariables.loadingProcess.status = status,
		setGenreClusterHasShows: (value: boolean) => storeVariables.genreClusterHasShows = value,
		setShowForCurrentRoute: (show: any) => storeVariables.showForCurrentRoute = show,
		retrieveLoadingProcess: () => storeVariables.loadingProcess,
		retrieveGenreClusterHasShows: () => storeVariables.genreClusterHasShows,
		retrieveShowForCurrentRoute: () => storeVariables.showForCurrentRoute
	};
});

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		getters: {
			loadingProcessOfType: () => mocksStore.retrieveLoadingProcess(),
			genreClusterHasShows: () => mocksStore.retrieveGenreClusterHasShows(),
			showForCurrentRoute: () => mocksStore.retrieveShowForCurrentRoute()
		}
	}
}));

const mocksSanitizePresenter: any = vi.hoisted(() => ({
	sanitize: vi.fn((text: string) => `${text}-sanitized`)
}));

vi.mock("@/presenters/sanitize-presenter", () => ({
	default: mocksSanitizePresenter
}));

describe("show spotlight", () => {
	let showMock: any;
	let code: ShowSpotlightCode;

	beforeEach(() => {
		showMock = {
			id: 1,
			name: "Test Show",
			premiered: "2022-03-15",
			rating: { average: 8.3 },
			runtime: 60,
			averageRuntime: 45,
			genres: ["Drama", "Comedy"],
			summary: "Test summary"
		};
		mocksStore.setShowForCurrentRoute(showMock);
		code = new ShowSpotlightCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
		mocksStore.setShowForCurrentRoute(null);
		mocksStore.setGenreClusterHasShows(true);
		mocksStore.updateLoadingProcessStatus(LoadingStatuses.INACTIVE);
	});

	test.each([
		["2022-03-15", "2022"],
		[null, ""]
	])("showYear: when premiered use case %#, gives expected year.", (premiered, expected) => {
		if (showMock) showMock.premiered = premiered;
		expect(code.showYear.value).toEqual(expected);
	});

	test.each([
		[LoadingStatuses.ACTIVE, true],
		[LoadingStatuses.INACTIVE, false],
		[LoadingStatuses.ERROR, false]
	])("isLoading: when loading status use case %#, gives expected boolean.", (status, expected) => {
		mocksStore.updateLoadingProcessStatus(status);
		expect(code.isLoading.value).toEqual(expected);
	});

	test.each([
		[true, true],
		[false, false]
	])("genreClusterHasShows: when store use case %#, gives expected boolean.", (storeValue, expected) => {
		mocksStore.setGenreClusterHasShows(storeValue);
		expect(code.genreClusterHasShows.value).toEqual(expected);
	});

	it("show: returns the current route show", () => {
		expect(code.show.value).toEqual(showMock);
	});

	test.each([
		[{ genres: ["Drama", "Comedy"] }, "Drama, Comedy"],
		[{ genres: ["Sci-Fi"] }, "Sci-Fi"],
		[{ genres: [] }, ""],
		[null, ""]
	])("showGenresCommaSeparated: when show use case %#, gives expected result.", (showValue, expected) => {
		mocksStore.setShowForCurrentRoute(showValue);
		expect(code.showGenresCommaSeparated.value).toEqual(expected);
	});

	test.each([
		[8.3, "8.3"],
		[null, ""]
	])("showRating: when average rating use case %#, gives expected string.", (rating, expected) => {
		if (showMock) showMock.rating.average = rating;
		expect(code.showRating.value).toEqual(expected);
	});

	test.each([
		[60, 60],
		[undefined, 45],
		[undefined, 0]
	])("showRuntime: when show runtime use case %#, gives expected result.", (runtimeValue, expected) => {
		if (runtimeValue !== undefined) {
			showMock.runtime = runtimeValue;
			showMock.averageRuntime = 45;
		} else {
			showMock.runtime = undefined;
			showMock.averageRuntime = expected === 0 ? undefined : 45;
		}
		expect(code.showRuntime.value).toEqual(expected);
	});

	test.each([
		[{ summary: "Test summary" }, "Test summary-sanitized"],
		[{ summary: "" }, "-sanitized"],
		[null, ""]
	])("sanitizedShowDescription: when show use case %#, gives expected result.", (showValue, expected) => {
		mocksStore.setShowForCurrentRoute(showValue);
		expect(code.sanitizedShowDescription.value).toEqual(expected);

		if (!showValue) {
			return;
		}

		expect(mocksSanitizePresenter.sanitize).toHaveBeenCalledWith(showValue.summary);
	});
});
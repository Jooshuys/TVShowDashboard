import { LoadingStatuses } from "@/models/loading";
import { DEFAULT_GENRE_COUNT } from "@/static/defaults";
import GenresOverviewCode from "@/presentation/components/genres-overview/genres-overview.code";

const mocksStore: any = vi.hoisted(() => {
	const storeVariables = {
		loadingProcess: {
			status: 1,
			errorMessage: ""
		},
		genresOrderedBySize: ["Action", "Drama", "Comedy", "Thriller"]
	};

	return {
		getLoadingProcess: () => storeVariables.loadingProcess,
		updateLoadingProcessStatus: (status: any) => storeVariables.loadingProcess.status = status,
		genresOrderedBySize: () => storeVariables.genresOrderedBySize
	};
});

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		getters: {
			loadingProcessOfType: () => mocksStore.getLoadingProcess(),
			genresOrderedBySize: () => mocksStore.genresOrderedBySize()
		}
	}
}));

let code: GenresOverviewCode;

describe("genres overview", () => {
	beforeEach(() => {
		code = new GenresOverviewCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	test.each([
		[undefined, false],
		[LoadingStatuses.INACTIVE, false],
		[LoadingStatuses.ERROR, false],
		[LoadingStatuses.ACTIVE, true]
	])("isLoading: when loading use case %#, give expected result.", (input, output) => {
		mocksStore.updateLoadingProcessStatus(input);
		expect(code.isLoading.value).toEqual(output);
	});

	test.each([
		[LoadingStatuses.INACTIVE, 4, "Action"],
		[LoadingStatuses.ACTIVE, DEFAULT_GENRE_COUNT, "0"]
	])("genresToShow: when loading use case %#, give expected result.",
		(input, expectedLength, firstItem) => {

		mocksStore.updateLoadingProcessStatus(input);
		const result = code.genresToShow.value;

		expect(result.length).toEqual(expectedLength);
		expect(result[0]).toEqual(firstItem);
	});

	test.each([
		[false, 0],
		[true, 1]
	])("mounted: when bottom marker use case %#, give expected result.", (isMarkerAvailable, observeCallCount) => {
		const observe = vi.fn();
		const disconnect = vi.fn();
		let capturedCallback: any;

		class MockIntersectionObserver {
			constructor(callback: any) {
				capturedCallback = callback;
			}
			observe = observe;
			disconnect = disconnect;
		}

		vi.stubGlobal("IntersectionObserver", MockIntersectionObserver as any);

		const bottomMarker = {};
		const context: any = {
			bottomMarker: { value: isMarkerAvailable ? bottomMarker : null },
			amountOfVisibleGenres: { value: 5 },
			observer: null
		};

		code.mounted.bind(context)();

		if (!isMarkerAvailable) {
			expect(context.observer).toBeNull();
			return;
		}

		expect(context.observer instanceof MockIntersectionObserver).toEqual(true);
		expect(observe).toHaveBeenCalledTimes(observeCallCount);
		expect(observe).toHaveBeenCalledWith(bottomMarker);

		capturedCallback([{ isIntersecting: false }]);
		expect(context.amountOfVisibleGenres.value).toEqual(5);

		capturedCallback([{ isIntersecting: true }]);
		expect(context.amountOfVisibleGenres.value).toEqual(6);
	});

	test.each([
		[null, 0],
		[{ disconnect: vi.fn() }, 1]
	])("unmounted: when observer use case %#, give expected result.",
		(observerValue, disconnectCallCount) => {

		const context: any = {
			observer: observerValue
		};

		code.unmounted.bind(context)();

		if (!observerValue) {
			return;
		}

		expect(observerValue.disconnect).toHaveBeenCalledTimes(disconnectCallCount);
	});
});
import { LoadingStatuses } from "@/models/loading";
import { DEFAULT_SHOW } from "@/static/defaults";
import GenreShowcaseCode from "@/presentation/components/genre-showcase/genre-showcase.code";

const mocksStore: any = vi.hoisted(() => {
	const storeVariables = {
		loadingProcess: {
			status: 1,
			errorMessage: ""
		},
		showsOfGenre: [{ id: 0 }, { id: 1 }, { id: 2 }]
	};

	return {
		getLoadingProcess: () => storeVariables.loadingProcess,
		updateLoadingProcessStatus: (status: any) => storeVariables.loadingProcess.status = status,
		showsOfGenre: storeVariables.showsOfGenre
	};
});

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		getters: {
			loadingProcessOfType: () => mocksStore.getLoadingProcess(),
			showsOfGenre: () => mocksStore.showsOfGenre
		}
	}
}));

let code: GenreShowcaseCode;

describe("genre showcase", () => {
	beforeEach(() => {
		code = new GenreShowcaseCode("Action");
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
		[-1, true],
		[0, true],
		[1, false]
	])("isButtonScrollLeftDisabled: when snapped index use case %#, give expected result.", (input, output) => {
		code["snappedIndex"].value = input;
		expect(code.isButtonScrollLeftDisabled.value).toEqual(output);
	});

	test.each([
		[0, false],
		[1, false],
		[2, true]
	])("isButtonScrollRightDisabled: when snapped index use case %#, give expected result.", (input, output) => {
		mocksStore.updateLoadingProcessStatus(LoadingStatuses.INACTIVE);
		code["amountOfCardsThatFit"] = 1;
		code["snappedIndex"].value = input;
		expect(code.isButtonScrollRightDisabled.value).toEqual(output);
	});

	test.each([
		[LoadingStatuses.INACTIVE, 3, { id: 0 }],
		[LoadingStatuses.ACTIVE, 30, DEFAULT_SHOW]
	])("showsOfGenre: when loading use case %#, give expected result.", (input, showsCount, firstShow) => {
		mocksStore.updateLoadingProcessStatus(input);
		const result = code.showsOfGenre.value;
		expect(result.length).toEqual(showsCount);
		expect(result[0]).toEqual(firstShow);
	});

	test.each([
		[false],
		[true]
	])("mounted: when scroll track use case %#, give expected result.", (isScrollTrackAvailable) => {
		const boundScrollListener = vi.fn();
		const scrollTrack = {
			addEventListener: vi.fn()
		};
		const context = {
			scrollTrack: { value: isScrollTrackAvailable ? scrollTrack : null },
			boundScrollListener
		};
		code.mounted.bind(context)();

		if (!isScrollTrackAvailable) {
			// Nothing to test.
			return;
		}

		const listener: any = context.scrollTrack.value?.addEventListener;
		expect(listener).toHaveBeenCalledTimes(1);
		expect(listener).toHaveBeenCalledWith("scroll", expect.any(Function));
		expect(boundScrollListener).toHaveBeenCalledTimes(0);

		const callback = listener.mock.calls[0][1];
		callback();
		expect(boundScrollListener).toHaveBeenCalledTimes(1);
	});

	test.each([
		[false],
		[true]
	])("unmounted: when scroll track use case %#, give expected result.", (isScrollTrackAvailable) => {
		const boundScrollListener = vi.fn();
		const scrollTrack = {
			removeEventListener: vi.fn()
		};
		const context = {
			scrollTrack: { value: isScrollTrackAvailable ? scrollTrack : null },
			boundScrollListener
		};
		code.unmounted.bind(context)();

		if (!isScrollTrackAvailable) {
			// Nothing to test.
			return;
		}

		const listener: any = context.scrollTrack.value?.removeEventListener;
		expect(listener).toHaveBeenCalledTimes(1);
		expect(listener).toHaveBeenCalledWith("scroll", expect.any(Function));
		expect(boundScrollListener).toHaveBeenCalledTimes(0);

		const callback = listener.mock.calls[0][1];
		callback();
		expect(boundScrollListener).toHaveBeenCalledTimes(1);
	});

	test.each([
		[false, false, 0, 0, 0],
		[true, false, 1, -1, 3],
		[true, true, 1, 1, 3]
	])("scrollOnTrack: when context track use case %#, give expected result.",
		(isScrollTrackAvailable, directionIsRight, callCount, param, snappedIndex) => {
		const scrollTrack = {
			scrollTo: vi.fn()
		};
		const context = {
			scrollTrack: { value: isScrollTrackAvailable ? scrollTrack : null },
			calculateSnappedIndex: vi.fn(() => 3),
			addMoreShowsIfEndOfTrackReached: vi.fn(),
			snappedIndex: { value: 0 },
			cardWidthInPixels: 224
		};
		code.scrollOnTrack.bind(context)(directionIsRight);

		expect(context.calculateSnappedIndex).toHaveBeenCalledTimes(callCount);
		expect(context.addMoreShowsIfEndOfTrackReached).toHaveBeenCalledTimes(callCount);
		expect(context.snappedIndex.value).toEqual(snappedIndex);

		if (!isScrollTrackAvailable) {
			return;
		}

		expect(context.calculateSnappedIndex).toHaveBeenCalledWith(param);
		expect(scrollTrack.scrollTo).toHaveBeenCalledTimes(1);
		expect(scrollTrack.scrollTo).toHaveBeenCalledWith({
			left: 3 * context.cardWidthInPixels,
			behavior: "smooth"
		});
	});

	test.each([
		[false, false, 0, 0, 0],
		[true, false, 1, -1, 3],
		[true, true, 1, 1, 3]
	])("scrollOnTrack: when context track use case %#, give expected result.",
		(isScrollTrackAvailable, directionIsRight, callCount, param, snappedIndex) => {
		const scrollTrack = {
			scrollTo: vi.fn()
		};
		const context = {
			scrollTrack: { value: isScrollTrackAvailable ? scrollTrack : null },
			calculateSnappedIndex: vi.fn(() => 3),
			addMoreShowsIfEndOfTrackReached: vi.fn(),
			snappedIndex: { value: 0 },
			cardWidthInPixels: 224
		};
		code.scrollOnTrack.bind(context)(directionIsRight);

		expect(context.calculateSnappedIndex).toHaveBeenCalledTimes(callCount);
		expect(context.addMoreShowsIfEndOfTrackReached).toHaveBeenCalledTimes(callCount);
		expect(context.snappedIndex.value).toEqual(snappedIndex);

		if (!isScrollTrackAvailable) {
			return;
		}

		expect(context.calculateSnappedIndex).toHaveBeenCalledWith(param);
		expect(scrollTrack.scrollTo).toHaveBeenCalledTimes(1);
		expect(scrollTrack.scrollTo).toHaveBeenCalledWith({
			left: 3 * context.cardWidthInPixels,
			behavior: "smooth"
		});
	});

	test.each([
		[1, 20, 5, 30, 30],
		[9, 20, 5, 30, 30],
		[10, 20, 5, 30, 50],
		[11, 20, 5, 30, 50],
		[0, 8, 5, 30, 50],
	])("addMoreShowsIfEndOfTrackReached use case %#",
  		(snappedIndexResult, showsLength, cardsFit, initialAmount, expectedAmount) => {

		const context = {
			calculateSnappedIndex: vi.fn(() => snappedIndexResult),
			snappedIndex: { value: 0 },
			showsOfGenre: { value: new Array(showsLength) },
			amountOfCardsThatFit: cardsFit,
			amountOfShows: { value: initialAmount }
		};

		code["addMoreShowsIfEndOfTrackReached"].bind(context)();

		expect(context.calculateSnappedIndex).toHaveBeenCalledTimes(1);
		expect(context.calculateSnappedIndex).toHaveBeenCalledWith(0);

		expect(context.snappedIndex.value).toBe(snappedIndexResult);
		expect(context.amountOfShows.value).toBe(expectedAmount);
	});

	test.each([
		[false, 1, 0],
		[true, -1, 3],
		[true, 1, 5],
		[true, 0, 4]
	])("unmounted: when scroll track use case %#, give expected result.", (isScrollTrackAvailable, step, snappedIndex) => {
		const context = {
			scrollTrack: { value: isScrollTrackAvailable ? { scrollLeft: 1000 } : null },
			cardWidthInPixels: 224
		};
		const result = code["calculateSnappedIndex"].bind(context)(step);
		expect(result).toEqual(snappedIndex);
	});
});
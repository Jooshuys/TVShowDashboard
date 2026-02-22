import { ref } from "vue";
import { DEFAULT_SEARCH_RESULTS_COUNT, DEFAULT_SEARCH_RESULT } from "@/static/defaults";
import { LoadingStatuses } from "@/models/loading";
import DropdownCode from "@/presentation/components/search/dropdown/dropdown.code";
import { Emits } from "@/models/emits";

const mocksStore: any = vi.hoisted(() => {
	const storeVariables = {
		loadingProcess: {
			status: 0,
			errorMessage: ""
		}
	};

	return {
		getLoadingProcess: () => storeVariables.loadingProcess,
		updateLoadingProcessStatus: (status: any) => storeVariables.loadingProcess.status = status
	};
});

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		getters: {
			loadingProcessOfType: () => mocksStore.getLoadingProcess()
		}
	}
}));

describe("dropdown", () => {
	let searchResultsMock: any;
	let searchTermMock: any;
	let code: DropdownCode;

	beforeEach(() => {
		searchResultsMock = ref([{ id: 1 }, { id: 2 }]);
		searchTermMock = ref("Test");
		code = new DropdownCode({} as any, searchResultsMock, searchTermMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test.each([
		[LoadingStatuses.ACTIVE, true],
		[LoadingStatuses.INACTIVE, false],
		[LoadingStatuses.ERROR, false]
	])("isLoading: when loading process status %#, returns expected boolean.", (status, expected) => {
		mocksStore.updateLoadingProcessStatus(status);
		expect(code.isLoading.value).toEqual(expected);
	});

	test.each([
		[LoadingStatuses.ERROR, true],
		[LoadingStatuses.ACTIVE, false],
		[LoadingStatuses.INACTIVE, false]
	])("isLoadingFailure: when loading process status %#, returns expected boolean.", (status, expected) => {
		mocksStore.updateLoadingProcessStatus(status);
		expect(code.isLoadingFailure.value).toEqual(expected);
	});

	test("loadingProcess: returns current loading process from store.", () => {
		mocksStore.updateLoadingProcessStatus(LoadingStatuses.ACTIVE);
		expect(code.loadingProcess.value?.status).toEqual(LoadingStatuses.ACTIVE);
	});

	test.each([
		[LoadingStatuses.ACTIVE, DEFAULT_SEARCH_RESULTS_COUNT],
		[LoadingStatuses.INACTIVE, 2]
	])("shows: when loading status %#, returns expected number of results.", (status, expectedCount) => {
		mocksStore.updateLoadingProcessStatus(status);
		const shows = code.shows.value;
		expect(shows.length).toEqual(expectedCount);

		if (status === LoadingStatuses.ACTIVE) {
			shows.forEach(show => expect(show).toEqual(DEFAULT_SEARCH_RESULT));
		} else {
			expect(shows).toEqual(searchResultsMock.value);
		}
	});

	it("emitClick: triggers the emit callback with RESULT_CLICKED.", () => {
		const context = { emit: vi.fn() };
		code.emitClick.bind(context)();
		expect(context.emit).toHaveBeenCalledTimes(1);
		expect(context.emit).toHaveBeenCalledWith(Emits.RESULT_CLICKED);
	});
});
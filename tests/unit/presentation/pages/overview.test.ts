import { LoadingStatuses } from "@/models/loading";
import OverviewCode from "@/presentation/pages/overview/overview.code";

const mocksStore: any = vi.hoisted(() => {
	const storeVariables = {
		loadingProcess: { status: 0, errorMessage: "" }
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

describe("overview", () => {
	let code: OverviewCode;

	beforeEach(() => {
		code = new OverviewCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
		mocksStore.updateLoadingProcessStatus(LoadingStatuses.INACTIVE);
	});

	test.each([
		[LoadingStatuses.ERROR, true],
		[LoadingStatuses.ACTIVE, false],
		[LoadingStatuses.INACTIVE, false]
	])("isLoadingFailure: when loading status %#, give expected value.", (status, expected) => {
		mocksStore.updateLoadingProcessStatus(status);
		expect(code.isLoadingFailure.value).toEqual(expected);
	});
});
import { LoadingStatuses } from "@/models/loading";
import LoadingFailureNotificationCode from "@/presentation/components/loading-failure-notification/loading-failure-notification.code";

const mocksStore: any = vi.hoisted(() => {
	const storeVariables = {
		loadingProcess: { status: 0, errorMessage: "" }
	};

	return {
		getLoadingProcess: () => storeVariables.loadingProcess
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

describe("loading failure notification", () => {
	let code: LoadingFailureNotificationCode;

	beforeEach(() => {
		code = new LoadingFailureNotificationCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("loadingProcess: when computed property called, give expected value.", () => {
		expect(code.loadingProcess.value).toEqual({
			status: LoadingStatuses.INACTIVE,
			errorMessage: ""
		});
	});
});
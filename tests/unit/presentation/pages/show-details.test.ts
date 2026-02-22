import { LoadingStatuses } from "@/models/loading";
import { Routes } from "@/models/router";
import ShowDetailsCode from "@/presentation/pages/show-details/show-details.code";

const mocksVue = vi.hoisted(() => {
	const watchReturnMethod = () => {};
	return {
		watchReturnMethod,
		watch: vi.fn((param1: any, param2: () => Promise<void>) => watchReturnMethod) as any
	};
});

vi.mock("vue", async () => {
	const vueResult = await vi.importActual("vue");
	return {
		__esModule: true,
		...vueResult,
		watch: mocksVue.watch
	};
});

const mocksTvMazeService: any = vi.hoisted(() => ({
	retrieveShowById: vi.fn()
}));

vi.mock("@/services/tv-maze-service", () => ({
	__esModule: true,
	default: {
		retrieveShowById: (id: number) => mocksTvMazeService.retrieveShowById(id)
	}
}));

const mocksStore: any = vi.hoisted(() => {
	const storeVariables = {
		loadingProcess: { status: 0, errorMessage: "" },
		showForCurrentRoute: null,
		router: { currentRoute: "overview" }
	};

	return {
		getLoadingProcess: () => storeVariables.loadingProcess,
		updateLoadingProcessStatus: (status: any) => storeVariables.loadingProcess.status = status,
		setShowForCurrentRoute: (show: any) => storeVariables.showForCurrentRoute = show,
		setRouter: (router: any) => storeVariables.router = router,
		getShowForCurrentRoute: () => storeVariables.showForCurrentRoute,
		getRouter: () => storeVariables.router
	};
});

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		getters: {
			loadingProcessOfType: () => mocksStore.getLoadingProcess(),
			showForCurrentRoute: () => mocksStore.getShowForCurrentRoute(),
			router: () => mocksStore.getRouter()
		}
	}
}));

describe("show details", () => {
	let code: ShowDetailsCode;

	beforeEach(() => {
		code = new ShowDetailsCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
		mocksStore.updateLoadingProcessStatus(LoadingStatuses.INACTIVE);
		mocksStore.setShowForCurrentRoute(null);
		mocksStore.setRouter({ currentRoute: Routes.OVERVIEW });
	});

	test.each([
		[LoadingStatuses.ACTIVE, true],
		[LoadingStatuses.INACTIVE, false],
		[LoadingStatuses.ERROR, false]
	])("isLoading: when loading process status %#, give expected boolean.", (status, expected) => {
		mocksStore.updateLoadingProcessStatus(status);
		expect(code.isLoading.value).toEqual(expected);
	});

	test.each([
		[LoadingStatuses.ERROR, true],
		[LoadingStatuses.ACTIVE, false],
		[LoadingStatuses.INACTIVE, false]
	])("isLoadingFailure: when loading process status %#, give expected boolean.", (status, expected) => {
		mocksStore.updateLoadingProcessStatus(status);
		expect(code.isLoadingFailure.value).toEqual(expected);
	});

	it("loadingProcess: when computed property called, give correct loading process", () => {
		mocksStore.updateLoadingProcessStatus(LoadingStatuses.ACTIVE);
		expect(code.loadingProcess.value?.status).toEqual(LoadingStatuses.ACTIVE);
	});

	it("showForCurrentRoute: when computed property called, give correct show for current route.", () => {
		const mockShow = { id: 1, name: "Test Show" };
		mocksStore.setShowForCurrentRoute(mockShow);
		expect(code["showForCurrentRoute"].value).toEqual(mockShow);
	});

	it("router: when computed property called, give the correct router object.", () => {
		const mockRouter = { currentRoute: Routes.SHOW_DETAILS };
		mocksStore.setRouter(mockRouter);
		expect(code["router"].value).toEqual(mockRouter);
	});

	it("mounted: should call checkIfShowNeedsToBeRetrieved initially, set up watchers, and call them with correct parameters", () => {
		const context: any = {
			checkIfShowNeedsToBeRetrieved: vi.fn(),
			stopIsLoadingWatcher: null,
			stopRouterWatcher: null,
			isLoading: { value: false },
			router: { value: { props: { id: "123" } } }
		};

		code.mounted.bind(context)();

		expect(context.checkIfShowNeedsToBeRetrieved).toHaveBeenCalledTimes(1);
		expect(context.stopIsLoadingWatcher).toEqual(mocksVue.watchReturnMethod);
		expect(context.stopRouterWatcher).toEqual(mocksVue.watchReturnMethod);
		expect(mocksVue.watch).toHaveBeenCalledTimes(2);

		const isLoadingCallback = mocksVue.watch.mock.calls[0][1];

		isLoadingCallback(true, false);
		expect(context.checkIfShowNeedsToBeRetrieved).toHaveBeenCalledTimes(1);
		isLoadingCallback(true, true);
		expect(context.checkIfShowNeedsToBeRetrieved).toHaveBeenCalledTimes(1);
		isLoadingCallback(false, true);
		expect(context.checkIfShowNeedsToBeRetrieved).toHaveBeenCalledTimes(2);

		const routerCallback = mocksVue.watch.mock.calls[1][1];

		routerCallback({ props: { id: "123" } }, { props: { id: "123" } });
		expect(context.checkIfShowNeedsToBeRetrieved).toHaveBeenCalledTimes(2);
		routerCallback({ props: { id: "123" } }, { props: { id: "356" } });
		expect(context.checkIfShowNeedsToBeRetrieved).toHaveBeenCalledTimes(3);
	});

	test.each([
		[true, 1],
		[false, 0]
	])("unmounted: when watcher use case %#, give expected boolean.", (watchersAvailable, callCount) => {
		const stopIsLoadingWatcher = vi.fn();
		const stopRouterWatcher = vi.fn();
		const context = {
			stopIsLoadingWatcher: watchersAvailable ? stopIsLoadingWatcher : null,
			stopRouterWatcher: watchersAvailable ? stopRouterWatcher : null
		};

		code.unmounted.bind(context)();

		expect(stopIsLoadingWatcher).toHaveBeenCalledTimes(callCount);
		expect(stopRouterWatcher).toHaveBeenCalledTimes(callCount);
		expect(context.stopIsLoadingWatcher).toBeNull();
		expect(context.stopRouterWatcher).toBeNull();
	});

	test.each([
		[true, false, false, 0],
		[false, true, false, 0],
		[false, false, true, 0],
		[false, false, false, 1]
	])("checkIfShowNeedsToBeRetrieved: when context use case %#, give expected boolean.",
		async (showAvailable, isLoading, isLoadingFailure, callCount) => {
		const showForCurrentRoute = { id: 1, name: "Test Show" };
		const context = {
			showForCurrentRoute: { value: showAvailable ? showForCurrentRoute : null },
			isLoading: { value: isLoading },
			isLoadingFailure: { value: isLoadingFailure },
			router: { value: { currentRoute: Routes.SHOW_DETAILS, props: { id: 123 } } }
		};

		await code.checkIfShowNeedsToBeRetrieved.bind(context)();

		expect(mocksTvMazeService.retrieveShowById).toHaveBeenCalledTimes(callCount);
		if (!callCount) {
			return;
		}

		expect(mocksTvMazeService.retrieveShowById).toHaveBeenCalledWith(123);
	});
});
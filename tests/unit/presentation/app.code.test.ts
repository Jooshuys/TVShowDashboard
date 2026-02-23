import { Routes } from "@/models/router";

const mocksComponents = vi.hoisted(() => ({
	Overview: {},
	ShowDetails: {}
}));

vi.mock("@/presentation/pages/overview/overview.vue", () => ({
	__esModule: true,
	default: mocksComponents.Overview
}));

vi.mock("@/presentation/pages/show-details/show-details.vue", () => ({
	__esModule: true,
	default: mocksComponents.ShowDetails
}));

import AppCode from "@/presentation/app.code";

const mocksVue = vi.hoisted(() => {
	const watchReturnMethod = () => {};
	return {
		watchReturnMethod,
		watch: vi.fn((param1: any, param2: () => Promise<void>) => watchReturnMethod) as any,
		nextTick: vi.fn(() => Promise.resolve())
	};
});

vi.mock("vue", async () => {
	const vueResult = await vi.importActual("vue");
	return {
		__esModule: true,
		...vueResult,
		watch: mocksVue.watch,
		nextTick: mocksVue.nextTick
	};
});

const mocksRoutePresenter: any = vi.hoisted(() => ({
  	prepareForRoutingActions: vi.fn()
}));

vi.mock("@/presenters/route-presenter", () => ({
	__esModule: true,
	default: mocksRoutePresenter
}));

const mocksTvMazeService: any = vi.hoisted(() => ({
  retrieveShowsForGenreCluster: vi.fn()
}));

vi.mock("@/services/tv-maze-service", () => ({
	__esModule: true,
	default: {
		retrieveShowsForGenreCluster: (id: number) => mocksTvMazeService.retrieveShowsForGenreCluster(id)
	}
}));

const mocksStore: any = vi.hoisted(() => {
	const router = { current: "overview" };
	return {
		getRouter: () => router,
		setRouter: (newRouter: any) => (router.current = newRouter.current)
	};
});

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		getters: {
			router: () => mocksStore.getRouter()
		}
	}
}));

describe("app", () => {
	let code: AppCode;

	beforeEach(() => {
		code = new AppCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
		mocksStore.setRouter({ current: Routes.OVERVIEW });
	});

	it("CurrentComponent: when computed property called, give expected component based on route.", () => {
		mocksStore.setRouter({ current: Routes.OVERVIEW });
		expect(code.CurrentComponent.value).toEqual(mocksComponents.Overview);
		mocksStore.setRouter({ current: Routes.SHOW_DETAILS });
		expect(code.CurrentComponent.value).toEqual(mocksComponents.ShowDetails);
	});

	it("router: when computed property called, give expected value.", () => {
		const value = { current: Routes.OVERVIEW };
		mocksStore.setRouter(value);
		expect(code["router"].value).toEqual(value);
	});

	it("mounted: when method called, handle application start-up actions.", () => {
		const context: any = {
			stopRouterWatcher: null,
			router: { value: { current: Routes.OVERVIEW } },
			focusMainAfterNavigation: vi.fn()
		};

		code.mounted.bind(context)();

		expect(mocksRoutePresenter.prepareForRoutingActions).toHaveBeenCalledTimes(1);
		expect(mocksTvMazeService.retrieveShowsForGenreCluster).toHaveBeenCalledTimes(1);
		expect(mocksTvMazeService.retrieveShowsForGenreCluster).toHaveBeenCalledWith(0);
		expect(mocksVue.watch).toHaveBeenCalledTimes(1);
		expect(context.stopRouterWatcher).toEqual(mocksVue.watchReturnMethod);

		const routerCallback = mocksVue.watch.mock.calls[0][1];

		routerCallback({ current: Routes.SHOW_DETAILS }, { current: Routes.OVERVIEW });
		expect(context.focusMainAfterNavigation).toHaveBeenCalledTimes(1);
		expect(context.focusMainAfterNavigation).toHaveBeenCalledWith(
			{ current: Routes.SHOW_DETAILS },
			{ current: Routes.OVERVIEW }
		);
	});

	test.each([
		[true, 1],
		[false, 0]
	])("unmounted: when watcher use case %#, trigger expected behaviour.", (watcherAvailable, callCount) => {
		const stopRouterWatcher = vi.fn();
		const context = { stopRouterWatcher: watcherAvailable ? stopRouterWatcher : null };
		code.unmounted.bind(context)();
		expect(stopRouterWatcher).toHaveBeenCalledTimes(callCount);
		expect(context.stopRouterWatcher).toBeNull();
	});

	it("focusMainAfterNavigation: when route unchanged, bail out early.", async () => {
		const oldValue: any = { current: Routes.OVERVIEW };
		const newValue: any = { current: Routes.OVERVIEW };
		await code["focusMainAfterNavigation"](newValue, oldValue);
		expect(mocksVue.nextTick).toHaveBeenCalledTimes(0);
	});

	it("focusMainAfterNavigation: when main element not found, bail out early.", async () => {
		const oldValue: any = { current: Routes.OVERVIEW };
		const newValue: any = { current: Routes.SHOW_DETAILS };
		global.document = {
			getElementById: vi.fn(() => null)
		} as any;
		await code["focusMainAfterNavigation"](newValue, oldValue);
		expect(mocksVue.nextTick).toHaveBeenCalledTimes(1);
		expect(global.document.getElementById).toHaveBeenCalledWith("MainContent");
	});

	it("focusMainAfterNavigation: when main element found, focus it and set up cleanup.", async () => {
		const oldValue: any = { current: Routes.OVERVIEW };
		const newValue: any = { current: Routes.SHOW_DETAILS };
		const mainMock = {
			setAttribute: vi.fn(),
			focus: vi.fn(),
			addEventListener: vi.fn((event, callback, opts) => callback()),
			removeAttribute: vi.fn()
		};
		global.document = {
			getElementById: vi.fn(() => mainMock)
		} as any;
		await code["focusMainAfterNavigation"](newValue, oldValue);
		expect(mocksVue.nextTick).toHaveBeenCalledTimes(1);
		expect(mainMock.setAttribute).toHaveBeenCalledWith("tabindex", "-1");
		expect(mainMock.focus).toHaveBeenCalled();
		expect(mainMock.addEventListener).toHaveBeenCalledWith(
			"blur",
			expect.any(Function),
			{ once: true }
		);
		expect(mainMock.removeAttribute).toHaveBeenCalledWith("tabindex");
	});
});

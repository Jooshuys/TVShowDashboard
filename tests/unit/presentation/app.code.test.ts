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
			focusMainAfterNavigation: vi.fn(),
			updateEventListeners: vi.fn()
		};

		code.mounted.bind(context)();

		expect(context.updateEventListeners).toHaveBeenCalledTimes(1);
		expect(context.updateEventListeners).toHaveBeenCalledWith(true);
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
		const context = {
			stopRouterWatcher: watcherAvailable ? stopRouterWatcher : null,
			updateEventListeners: vi.fn()
		};
		code.unmounted.bind(context)();
		expect(context.updateEventListeners).toHaveBeenCalledTimes(1);
		expect(context.updateEventListeners).toHaveBeenCalledWith(false);
		expect(stopRouterWatcher).toHaveBeenCalledTimes(callCount);
		expect(context.stopRouterWatcher).toBeNull();
	});

	it("setUserUsingKeyboardAs: when method called, update userUsingKeyboard ref value", () => {
		const context = {
			userUsingKeyboard: { value: false }
		};
		code["setUserUsingKeyboardAs"].bind(context)(true);
		expect(context.userUsingKeyboard.value).toEqual(true);
		code["setUserUsingKeyboardAs"].bind(context)(false);
		expect(context.userUsingKeyboard.value).toEqual(false);
	});

	test.each([
		[{ key: "Tab" }, 1],
		[{ key: "Enter" }, 0]
	])("onKeydown: when keydown event use case %#, give expected result.", (event, callCount) => {
		const context = {
			setUserUsingKeyboardAs: vi.fn()
		};
		code["onKeydown"].bind(context)(event as any);
		expect(context.setUserUsingKeyboardAs).toHaveBeenCalledTimes(callCount);

		if (!callCount) {
			return;
		}

		expect(context.setUserUsingKeyboardAs).toHaveBeenCalledWith(true);
	});

	it("onMouseDown: when method called, set userUsingKeyboard as false.", () => {
		const context = {
			setUserUsingKeyboardAs: vi.fn()
		};
		code["onMouseDown"].bind(context)();
		expect(context.setUserUsingKeyboardAs).toHaveBeenCalledTimes(1);
		expect(context.setUserUsingKeyboardAs).toHaveBeenCalledWith(false);
	});

	test.each([
		[true, 2, 0],
		[false, 0, 2]
	])("updateEventListeners: when called with value %#, update event listeners as expected.", (value, addCount, removeCount) => {
		const context = {
			boundKeydownListener: vi.fn(),
			boundMousedownListener: vi.fn()
		};
		const addSpy = vi.spyOn(window, "addEventListener");
		const removeSpy = vi.spyOn(window, "removeEventListener");

		code["updateEventListeners"].bind(context)(value);

		expect(addSpy).toHaveBeenCalledTimes(addCount);
		expect(removeSpy).toHaveBeenCalledTimes(removeCount);
		
		if (addCount > 0) {
			expect(addSpy).toHaveBeenNthCalledWith(1, "keydown", context.boundKeydownListener);
			expect(addSpy).toHaveBeenNthCalledWith(2, "mousedown", context.boundMousedownListener);
		}

		if (removeCount > 0) {
			expect(removeSpy).toHaveBeenNthCalledWith(1, "keydown", context.boundKeydownListener);
			expect(removeSpy).toHaveBeenNthCalledWith(2, "mousedown", context.boundMousedownListener);
		}
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

import { Routes } from "@/models/router";
import routePresenter from "@/presenters/route-presenter";

const mocksStore = vi.hoisted(() => ({
	navigateToRoute: vi.fn((route: string) => {})
}));

vi.mock("@/store", () => ({
	__esModule: true,
	default: {
		mutations: {
			navigateToRoute: (route: string) => mocksStore.navigateToRoute(route)
		}
	}
}));

describe("Route Presenter", () => {

	beforeEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("defaultRoute: when getter called, give expected result.", () => {
		expect(routePresenter["defaultRoute"]).toEqual(Routes.OVERVIEW);
	});

	test.each([
		[{ currentTarget: null, preventDefault: vi.fn() }, 0],
		[{ currentTarget: { getAttribute: vi.fn(() => "/overview") }, preventDefault: vi.fn() }, 1],
	])("handleNavigationItemClick: when event use case %#, give expected result.", (event, callCount) => {
		routePresenter["handleNavigationItemClick"](event as any);
		expect(event.preventDefault).toHaveBeenCalledTimes(callCount);
		expect(mocksStore.navigateToRoute).toHaveBeenCalledTimes(callCount);

		if (!callCount) {
			return;
		}

		expect(mocksStore.navigateToRoute).toHaveBeenNthCalledWith(1, "/overview");
	});

	test.each([
		["https://test.com", "", 0],
		["https://test.com", "/overview", 0],
		["https://test.com", "/show-details/87053", 87053],
		["https://test.com", "https://test.com/show-details/87053", 87053],
		["https://test.com", "https://test.com/overview/", 0],
		["https://test.com", "https://test.com/show-details/notANumber", 0],
		["https://test.com", "https://test.com/show-details/notANumber/87053", 0],
		["https://localhost:5173", "https://localhost:5173/show-details/87053", 87053]
	])("retrieveIdFromUrl: when url use case %#, give expected result.", (githubApplicationName, url, expectedId) => {
		routePresenter["githubApplicationName"] = githubApplicationName;
		const result = routePresenter.retrieveIdFromUrl(url);
		expect(result).toEqual(expectedId);
	});

	test.each([
		["https://test.com", "", Routes.OVERVIEW],
		["https://test.com", "/overview", Routes.OVERVIEW],
		["https://test.com", "/show-details/87053", Routes.SHOW_DETAILS],
		["https://test.com", "https://test.com/overview", Routes.OVERVIEW],
		["https://test.com", "https://test.com/overview/", Routes.OVERVIEW],
		["https://test.com", "https://test.com/some-invalid-route", Routes.OVERVIEW],
		["https://localhost:5173", "https://localhost:5173/show-details/87053", Routes.SHOW_DETAILS]
	])("retrieveRouteNameFromUrl: when url use case %#, give expected result.", (githubApplicationName, url, expectedRoute) => {
		routePresenter["githubApplicationName"] = githubApplicationName;
		const result = routePresenter.retrieveRouteNameFromUrl(url);
		expect(result).toEqual(expectedRoute);
	});

	test.each([
		["https://test.com", "", ""],
		["https://test.com", "/overview", "/overview"],
		["https://test.com", "/show-details/87053", "/show-details/87053"],
		["https://test.com", "https://test.com/overview", "/overview"],
		["https://test.com", "https://test.com/overview/", "/overview/"],
		["https://test.com", "https://test.com/some-invalid-route", "/some-invalid-route"],
		["https://localhost:5173", "https://localhost:5173/show-details/87053", "/show-details/87053"],
		["https://localhost:5173", "https://localhost:5173/show-details/87053", "/show-details/87053"]
	])("retrieveRelevantUrlPart: when url use case %#, give expected result.", (githubApplicationName, url, expectedRelevantUrlPart) => {
		routePresenter["githubApplicationName"] = githubApplicationName;
		const result = routePresenter.retrieveRelevantUrlPart(url);
		expect(result).toEqual(expectedRelevantUrlPart);
	});
});
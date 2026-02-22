import { LoadingStatuses } from "@/models/loading";
import ShowPreviewCardCode from "@/presentation/components/show-preview-card/show-preview-card.code";

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

const mocksSanitizePresenter: any = vi.hoisted(() => ({
	sanitize: vi.fn((text: string) => `${text}-sanitized`)
}));

vi.mock("@/presenters/sanitize-presenter", () => ({
	default: mocksSanitizePresenter
}));

const mocksRoutePresenter: any = vi.hoisted(() => ({
	handleNavigationItemClick: vi.fn()
}));

vi.mock("@/presenters/route-presenter", () => ({
	default: {
		handleNavigationItemClick: (event: any) => mocksRoutePresenter.handleNavigationItemClick(event)
	}
}));

describe("show preview card", () => {
	let showMock: any;
	let code: ShowPreviewCardCode;

	beforeEach(() => {
		showMock = {
			id: 1,
			name: "Test Show",
			premiered: "2022-03-15",
			network: { name: "Test Network" },
			rating: { average: 8.3 },
			summary: "Test summary"
		};
		code = new ShowPreviewCardCode(showMock);
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
		[8.3, "8.3"],
		[null, ""]
	])("showRating: when rating use case %#, returns expected string.", (rating, expected) => {
		showMock.rating.average = rating;
		expect(code.showRating.value).toEqual(expected);
	});

	test.each([
		["2022-03-15", "2022"],
		[null, ""]
	])("showYear: when premiered use case %#, returns expected year.", (premiered, expected) => {
		showMock.premiered = premiered;
		expect(code.showYear.value).toEqual(expected);
	});

	test.each([
		["Test Network", "Test Network"],
		[null, ""]
	])("showNetworkName: when network use case %#, returns expected value.", (networkName, expected) => {
		showMock.network = networkName ? { name: networkName } : null;
		expect(code.showNetworkName.value).toEqual(expected);
	});

	it("cardSummary: returns formatted description including year, network, and rating", () => {
		expect(code.cardSummary.value).toEqual(
			"Test Show, released in 2022, aired on Test Network, rated 8.3 out of 10."
		);
	});

	it("cardSummary: returns description with missing optional fields", () => {
		showMock.premiered = null;
		showMock.network = null;
		showMock.rating.average = null;
		expect(code.cardSummary.value).toEqual("Test Show");
	});

	it("sanitizedShowDescription: calls sanitizePresenter.sanitize with show.summary", () => {
		expect(code.sanitizedShowDescription.value).toEqual("Test summary-sanitized");
		expect(mocksSanitizePresenter.sanitize).toHaveBeenCalledWith("Test summary");
	});

	it("handleNavigationItemClick: calls routePresenter with event", () => {
		const event = { type: "pointerdown" } as PointerEvent;
		const context = code;
		context.handleNavigationItemClick.bind(context)(event);
		expect(mocksRoutePresenter.handleNavigationItemClick).toHaveBeenCalledTimes(1);
		expect(mocksRoutePresenter.handleNavigationItemClick).toHaveBeenCalledWith(event);
	});
});
import { ref } from "vue";
import { Emits } from "@/models/emits";
import { LoadingStatuses } from "@/models/loading";
import DropdownItemCode from "@/presentation/components/search/dropdown-item/dropdown-item.code";

const mocksRoutePresenter: any = vi.hoisted(() => {
	return {
		handleNavigationItemClick: vi.fn()
	};
});

vi.mock("@/presenters/route-presenter", () => ({
	default: {
		handleNavigationItemClick: (event: any) => mocksRoutePresenter.handleNavigationItemClick(event)
	}
}));

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

describe("dropdown item", () => {
	let showMock: any;
	let code: DropdownItemCode;

	beforeEach(() => {
		showMock = ref({ premiered: "2021-07-15", id: 1, name: "Test Show" });
		code = new DropdownItemCode({} as any, showMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test.each([
		["2021-07-15", "2021"],
		[null, ""],
		["", ""]
	])("showYear: when premiered use case %#, give expected result.", (premiered, expected) => {
		showMock.value.premiered = premiered as string | null;
		expect(code.showYear.value).toBe(expected);
	});

	test.each([
		[LoadingStatuses.ACTIVE, true],
		[LoadingStatuses.INACTIVE, false],
		[null, false]
	])("isLoading: when loading process case %#, give expected result.", (status, expected) => {
		mocksStore.updateLoadingProcessStatus(status);
		expect(code.isLoading.value).toEqual(expected);
	});

	it("handleNavigationItemClick: when method called, trigger navigation and emit.", () => {
		const event = { type: "pointerdown" } as PointerEvent;
		const context = {
			emit: vi.fn()
		};

		code.handleNavigationItemClick.bind(context)(event);

		expect(mocksRoutePresenter.handleNavigationItemClick).toHaveBeenCalledTimes(1);
		expect(mocksRoutePresenter.handleNavigationItemClick).toHaveBeenCalledWith(event);
		expect(context.emit).toHaveBeenCalledTimes(1);
		expect(context.emit).toHaveBeenCalledWith(Emits.RESULT_CLICKED);
	});
});
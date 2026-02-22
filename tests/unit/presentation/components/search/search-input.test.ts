import SearchInputCode from "@/presentation/components/search/search-input/search-input.code";

const mocksTVMazeService: any = vi.hoisted(() => {
	const tvMazeServiceData = {
		shows: [{ id: 1 }, { id: 2 }, { id: 3 }]
	};
	return {
		shows: tvMazeServiceData.shows,
		retrieveShowsThatMatchName: vi.fn(async () => tvMazeServiceData.shows)
	};
});

vi.mock("@/services/tv-maze-service", () => ({
	__esModule: true,
	default: {
		retrieveShowsThatMatchName: (term: string) => mocksTVMazeService.retrieveShowsThatMatchName(term)
	}
}));

let code: SearchInputCode;

describe("search input", () => {
	beforeEach(() => {
		code = new SearchInputCode();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it("mounted: when called, adds the expected event listener.", () => {
		const addEventListener: any = vi.spyOn(document, "addEventListener");
		const context = {
			boundHandleOutsideClick: vi.fn()
		};
		code.mounted.bind(context)();
		expect(addEventListener).toHaveBeenCalledWith("click", expect.any(Function));
		expect(context.boundHandleOutsideClick).toHaveBeenCalledTimes(0);

		const callback = addEventListener.mock.calls[0][1];
		callback();
		expect(context.boundHandleOutsideClick).toHaveBeenCalledTimes(1);
	});

	it("unmounted: when called, removes the expected event listener.", () => {
		const removeEventListener: any = vi.spyOn(document, "removeEventListener");
		const context = {
			boundHandleOutsideClick: vi.fn()
		};
		code.unmounted.bind(context)();
		expect(removeEventListener).toHaveBeenCalledWith("click", expect.any(Function));

		const callback = removeEventListener.mock.calls[0][1];
		callback();
		expect(context.boundHandleOutsideClick).toHaveBeenCalledTimes(1);
	});

	test.each([
		[false, 0],
		[true, 1]
	])("updateDropdownVisibility: when reset use case %#, give expected result.",
		(includingReset, callCount) => {
		const context = {
			resetSearchTerm: vi.fn(),
			showDropdown: { value: false }
		};
		code.updateDropdownVisibility.bind(context)(true, includingReset);
		expect(context.showDropdown.value).toEqual(true);
		expect(context.resetSearchTerm).toHaveBeenCalledTimes(callCount);
	});

	test.each([
		[null, 0],
		[{ value: "initial" }, 1]
	])("resetSearchTerm: when search input use case %#, give expected result.",
		(inputValue, callCount) => {
		const context: any = {
			searchInput: { value: inputValue },
			setSearchTerm: vi.fn()
		};

		code.resetSearchTerm.bind(context)();

		expect(context.setSearchTerm).toHaveBeenCalledTimes(callCount);
		if (!inputValue) {
			return;
		}

		expect(context.searchInput.value.value).toEqual("");
	});

	test.each([
		[null, 0, 0, "Superman", [1, 2]],
		[{ value: "" }, 0, 1, "", []],
		[{ value: "Batman" }, 1, 0, "Batman", [1, 2]]
	])("setSearchTerm: when search input use case %#, give expected result.",
		(inputValue, debounceCallCount, dropdownCallCount, newSearchTerm, newResults) => {
		const context = {
			searchInput: { value: inputValue },
			searchTerm: { value: "Superman" },
			searchResults: { value: [1, 2] },
			updateDropdownVisibility: vi.fn(),
			debounceSearch: vi.fn()
		};

		code.setSearchTerm.bind(context)();

		expect(context.debounceSearch).toHaveBeenCalledTimes(debounceCallCount);
		expect(context.updateDropdownVisibility).toHaveBeenCalledTimes(dropdownCallCount);
		expect(context.searchTerm.value).toEqual(newSearchTerm);
		expect(context.searchResults.value).toEqual(newResults);
	});

	test.each([
		[[], 0],
		[[{ id: 1 }], 1]
	])("onInputFocus: when search input use case %#, give expected result.",
		(results, callCount) => {
		const context: any = {
			searchResults: { value: results },
			updateDropdownVisibility: vi.fn()
		};

		code.onInputFocus.bind(context)();

		expect(context.updateDropdownVisibility).toHaveBeenCalledTimes(callCount);
		if (!callCount) {
			return;
		}
		
		expect(context.updateDropdownVisibility).toHaveBeenCalledWith(true);
	});

	test.each([
		[null, 0, 1],
		[123, 1, 1]
	])("debounceSearch: when debounce use case %#, give expected result.",
		(initialTimeout, expectedClearTimeoutCalls, expectedDelayedFunctionCalls) => {
		const context: any = {
			debounceTimeout: initialTimeout,
			delayedFunction: vi.fn()
		};
		const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

		code["debounceSearch"].bind(context)();

		expect(clearTimeoutSpy).toHaveBeenCalledTimes(expectedClearTimeoutCalls);

		expect(context.delayedFunction).toHaveBeenCalledTimes(0);
		vi.advanceTimersByTime(1000);
		expect(context.delayedFunction).toHaveBeenCalledTimes(expectedDelayedFunctionCalls);

		if (initialTimeout === null) {
			return;
		}

		expect(clearTimeoutSpy).toHaveBeenCalledWith(initialTimeout);
	});

	test.each([
		["", [], 0],
		[" ", [], 0],
		["Batman", mocksTVMazeService.shows, 1]
	])("delayedFunction: when search term use case %#, give expected result.",
		async (term, output, callCount) => {
		const context: any = {
			searchTerm: { value: term },
			searchResults: { value: [] },
			updateDropdownVisibility: vi.fn()
		};

		await code["delayedFunction"].bind(context)();
		
		expect(context.searchResults.value).toEqual(output);
		expect(context.updateDropdownVisibility).toHaveBeenCalledTimes(callCount);
		expect(mocksTVMazeService.retrieveShowsThatMatchName).toHaveBeenCalledTimes(callCount);

		if (!callCount) {
			return;
		}

		expect(mocksTVMazeService.retrieveShowsThatMatchName).toHaveBeenCalledWith(term);
	});

	test.each([
		[false, false, 0],
		[true, true, 0],
		[true, false, 1]
	])("handleOutsideClick: when wrapper %#, event %#, should call updateDropdownVisibility %#",
		(wrapperAvailable, containsResponse, callCount) => {
		const wrapper = { contains: vi.fn(() => containsResponse)}
		const context: any = {
			searchWrapper: { value: wrapperAvailable ? wrapper : null },
			updateDropdownVisibility: vi.fn()
		};
		const event = { target: { test: true } } as any;

		code["handleOutsideClick"].bind(context)(event);

		expect(context.updateDropdownVisibility).toHaveBeenCalledTimes(callCount);

		if (!callCount) {
			return;
		}
		
		expect(context.updateDropdownVisibility).toHaveBeenCalledWith(false);
		expect(wrapper.contains).toHaveBeenCalledWith(event.target);
	});
});
import store from "@/store";

describe("store index", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("by default, store has expected structure.", () => {
		expect(store.getters).not.toBeUndefined();
		expect(store.mutations).not.toBeUndefined();
		expect(store.state).not.toBeUndefined();
	});
});
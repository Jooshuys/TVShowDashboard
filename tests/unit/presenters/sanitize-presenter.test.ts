const mocksDOMPurify = vi.hoisted(() => ({
	sanitize: vi.fn((input: string) => `${input}-sanitized`)
}));

vi.mock("dompurify", () => ({
	default: {
		sanitize: (input: string) => mocksDOMPurify.sanitize(input)
	}
}));

import sanitizePresenter from "@/presenters/sanitize-presenter";

describe("sanitize presenter", () => {

	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("sanitize: when method called, passed string should be sanitized by DOMPurify.", () => {
		const result = sanitizePresenter.sanitize("<div>test</div>");
		expect(result).toEqual("<div>test</div>-sanitized");
	});
});
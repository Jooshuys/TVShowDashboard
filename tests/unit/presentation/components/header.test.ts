import HeaderCode from "@/presentation/components/header/header.code";

const mocksRoutePresenter: any = vi.hoisted(() => ({
	handleNavigationItemClick: vi.fn()
}));

vi.mock("@/presenters/route-presenter", () => ({
	default: {
		handleNavigationItemClick: (event: any) => mocksRoutePresenter.handleNavigationItemClick(event)
	}
}));

describe("header", () => {
	let code: HeaderCode;

	beforeEach(() => {
		code = new HeaderCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("handleNavigationItemClick: when called, triggers the route presenter.", () => {
		const event = { type: "pointerdown" } as PointerEvent;
		const context = code;
		context.handleNavigationItemClick.bind(context)(event);
		expect(mocksRoutePresenter.handleNavigationItemClick).toHaveBeenCalledTimes(1);
		expect(mocksRoutePresenter.handleNavigationItemClick).toHaveBeenCalledWith(event);
	});
});

import { isReactive, computed } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";

class TestCode {
	public count = 0;

	public property = computed((): boolean => {
		return true;
	});

	public increment(): number {
		this.count += 1;
		return this.count;
	}

	public getCount(): number {
		return this.count;
	}
}

describe("setup component presenter", () => {
	let instance: TestCode;

	beforeEach(() => {
		instance = new TestCode();
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	it("setupComponent: when method called, give reactive result.", () => {
		const result = setupComponentPresenter.setupComponent(instance);

		expect(isReactive(result)).toEqual(true);
	});

	it("setupComponent: when method called, give result that preserves properties.", () => {
		instance.count = 5;

		const result = setupComponentPresenter.setupComponent(instance);

		expect(result.count).toEqual(5);
		expect(result.property).toEqual(true);
	});

	it("setupComponent: when method called, give result with methods bound to instance.", () => {
		const result = setupComponentPresenter.setupComponent(instance);

		const increment = result.increment;
		increment();

		expect(result.count).toEqual(1);
	});

	it("setupComponent: when method called, give result that doesn't modify constructor.", () => {
		const result = setupComponentPresenter.setupComponent(instance);

		expect((result as any).constructor).toEqual(TestCode);
	});

	test.each([
		["increment"],
		["getCount"]
	])("setupComponent: when method name use case %#, give expected result.", (methodName) => {
		const spy = vi.spyOn(TestCode.prototype as any, methodName);

		const result = setupComponentPresenter.setupComponent(instance);

		expect(typeof (result as any)[methodName]).toEqual("function");

		(result as any)[methodName]();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it("setupComponent: when descriptor or property are missing, give expected result.", () => {
		let proto: any = {
			foo() { return "bar"; },
			bar() { return "baz"; }
		};
		let obj = Object.create(proto);
		
		const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
		
		// Simulate that the descriptor for "foo" is missing, while the one for "bar" is present.
		vi.spyOn(Object, "getOwnPropertyDescriptor").mockImplementation((target, key) => {
			if (key === "foo") return undefined;
			return originalGetOwnPropertyDescriptor(target, key);
		});

		let result = setupComponentPresenter.setupComponent(obj);

		// Check that, despite a missing property descriptor, the presenter does not alter the object.
		expect(result).toEqual(obj);

		proto = { foo() { return "bar"; } };
		obj = Object.create(proto);
		delete proto.foo;

		expect(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), "foo")).toBeUndefined();

		// Check that, when a property is missing entirely, the presenter still does not alter the object.
		result = setupComponentPresenter.setupComponent(obj);
		expect(result).toEqual(obj);
	});

	it("setupComponent: when encountering a non-function prototype property, give expected result.", () => {
		// Create a prototype with a non-function property.
		const proto: any = {
			foo: 123,
			bar() { return "baz"; }
		};
		const obj = Object.create(proto);

		// Spy on Object.defineProperty to ensure it's not called for non-functions.
		const spy = vi.spyOn(Object, "defineProperty");

		setupComponentPresenter.setupComponent(obj);

		// Should only attempt to defineProperty for "bar", not "foo".
		const calls = spy.mock.calls.map(call => call[1]);
		expect(calls).not.toContain("foo");
		expect(calls).toContain("bar");
	});
});
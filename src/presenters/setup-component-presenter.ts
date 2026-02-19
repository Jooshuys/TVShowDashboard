import { reactive, UnwrapNestedRefs } from "vue";

export default class SetupComponentPresenter {

	public static setupComponent<T extends object>(code: T): UnwrapNestedRefs<T> {
		const prototype = Object.getPrototypeOf(code);

		for (const key of Object.getOwnPropertyNames(prototype)) {
			if (key === "constructor") {
				continue;
			}

			const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
			if (!descriptor) {
				continue;
			}

			if (typeof descriptor.value !== "function") {
				continue;
			}

			Object.defineProperty(code, key, {
				value: descriptor.value.bind(code),
				writable: true,
				configurable: true
			});
		}

		return reactive(code) as UnwrapNestedRefs<T>;
	}
}

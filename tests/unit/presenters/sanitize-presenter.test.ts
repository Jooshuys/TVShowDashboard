import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';

// const mocksVue = vi.hoisted(() => ({
// 	nextTick: vi.fn(async () => {}),
// 	watch: vi.fn((payload1: any, payload2: () => Promise<void>) => {})
// }));

// vi.mock('vue', async () => {
// 	const vueResult = await vi.importActual('vue');
// 	return {
// 		__esModule: true,
// 		...vueResult,
// 		nextTick: mocksVue.nextTick,
// 		watch: mocksVue.watch
// 	};
// });

// const mocksValidationPresenter = vi.hoisted(() => {
// 	const methods = {
// 		validateMandatoryFields: vi.fn(() => {}),
// 		isPropertyMissing: vi.fn((payload) => false),
// 		isPropertyInvalid: vi.fn((payload) => false)
// 	};

// 	return {
// 		validateMandatoryFields: methods.validateMandatoryFields,
// 		isPropertyMissing: methods.isPropertyMissing,
// 		isPropertyInvalid: methods.isPropertyInvalid
// 	};
// });

// vi.mock('@/presenters/validation-presenter', () => ({
// 	__esModule: true,
// 	default: {
// 		validateMandatoryFields: () => mocksValidationPresenter.validateMandatoryFields(),
// 		isPropertyMissing: (payload: any) => mocksValidationPresenter.isPropertyMissing(payload),
// 		isPropertyInvalid: (payload: any) => mocksValidationPresenter.isPropertyInvalid(payload)
// 	}
// }));

// const mocksStore: any = vi.hoisted(() => {
// 	const loadingStatusObject = {
// 		value: 1
// 	};

// 	return {
// 		getLoadingStatus: () => loadingStatusObject.value,
// 		updateLoadingStatus: (payload: any) => loadingStatusObject.value = payload,
// 		deliveryMode: { type: 'evenly', overperformanceLimit: 200 },
// 		setDeliveryMode: vi.fn((payload) => {}),
// 		setOverPerformanceLimit: vi.fn((payload) => {})
// 	};
// });

// vi.mock('@/store', () => ({
// 	__esModule: true,
// 	default: {
// 		getters: {
// 			loadingStatusPrimaryData: () => mocksStore.getLoadingStatus(),
// 			deliveryMode: () => mocksStore.deliveryMode
// 		},
// 		mutations: {
// 			setDeliveryMode: (payload: any) => mocksStore.setDeliveryMode(payload),
// 			setOverPerformanceLimit: (payload: any) => mocksStore.setOverPerformanceLimit(payload)
// 		}
// 	}
// }));

import sanitizePresenter from '@/presenters/sanitize-presenter';

let code: any;

describe('sanitize-presenter.ts', () => {

	afterEach(() => {
		vi.clearAllMocks();
		vi.restoreAllMocks();
	});

	test.each([
		[true, true],
		[false, false]
	])('someTest: when use case %#, give expected result.', (input, output) => {
		expect(1).toEqual(1);
	});

	it('mounted: when method called, trigger stuff.', () => {
		expect(1).toEqual(1);
	});
});
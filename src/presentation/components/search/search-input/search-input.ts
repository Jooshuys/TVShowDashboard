import { defineComponent, onMounted, onUnmounted } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import Dropdown from "@/presentation/components/search/dropdown/dropdown.vue";
import SearchInputCode from "./search-input.code";

export default defineComponent({
	components: {
		Dropdown
	},
	setup: () => {
		const code = new SearchInputCode();

		onMounted(code.mounted.bind(code));
		onUnmounted(code.unmounted.bind(code));

		return setupComponentPresenter.setupComponent(code);
	}
});

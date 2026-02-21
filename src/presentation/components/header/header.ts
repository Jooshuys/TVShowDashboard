import { defineComponent } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import SearchInput from "@/presentation/components/search/search-input/search-input.vue";
import HeaderCode from "./header.code";

export default defineComponent({
	components: {
		SearchInput
	},
	setup: () => {
		const code = new HeaderCode();

		return setupComponentPresenter.setupComponent(code);
	}
});

import { defineComponent } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import LoadingWrapper from "@/presentation/components/loading-wrapper/loading-wrapper.vue";
import ShowSpotlightCode from "./show-spotlight.code";

export default defineComponent({
	components: {
		LoadingWrapper
	},
	setup: () => {
		const code = new ShowSpotlightCode();

		return setupComponentPresenter.setupComponent(code);
	}
});

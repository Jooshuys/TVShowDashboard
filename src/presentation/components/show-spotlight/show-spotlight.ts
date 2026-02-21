import { defineComponent } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import ShowSpotlightCode from "./show-spotlight.code";

export default defineComponent({
	setup: () => {
		const code = new ShowSpotlightCode();

		return setupComponentPresenter.setupComponent(code);
	}
});

import { defineComponent, onMounted, onUnmounted } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import ShowDetailsCode from "./show-details.code";

export default defineComponent({
	setup: () => {
		const code = new ShowDetailsCode();

		onMounted(code.mounted.bind(code));
		onUnmounted(code.unmounted.bind(code));

		return setupComponentPresenter.setupComponent(code);
	}
});

import { defineComponent, onMounted, onUnmounted } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import ShowDetailsCode from "./show-details.code";

export default defineComponent({
	setup: () => {
		const code = new ShowDetailsCode();

		onMounted(code.mounted.bind(code));
		onUnmounted(code.unmounted.bind(code));

		return SetupComponentPresenter.setupComponent(code);
	}
});

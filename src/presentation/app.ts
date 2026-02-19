import { defineComponent, onMounted } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import Header from "@/presentation/components/header/header.vue";
import AppCode from "./app.code";

export default defineComponent({
	components: {
		Header
	},
	setup: () => {
		const code = new AppCode();

		onMounted(code.mounted.bind(code));

		return SetupComponentPresenter.setupComponent(code);
	}
});
import { defineComponent, onMounted } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import Header from "@/presentation/components/header/header.vue";
import Footer from "@/presentation/components/footer/footer.vue";
import AppCode from "./app.code";

export default defineComponent({
	components: {
		Header,
		Footer
	},
	setup: () => {
		const code = new AppCode();

		onMounted(code.mounted.bind(code));

		return SetupComponentPresenter.setupComponent(code);
	}
});
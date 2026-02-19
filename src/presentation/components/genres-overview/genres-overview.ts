import { defineComponent, onMounted } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import GenreShowcase from "../genre-showcase/genre-showcase.vue";
import GenreOverviewCode from "./genres-overview.code";

export default defineComponent({
	components: {
		GenreShowcase
	},
	setup: () => {
		const code = new GenreOverviewCode();

		onMounted(code.mounted.bind(code));

		return SetupComponentPresenter.setupComponent(code);
	}
});

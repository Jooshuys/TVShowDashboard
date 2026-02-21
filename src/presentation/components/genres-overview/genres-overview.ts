import { defineComponent } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import GenreShowcase from "@/presentation/components/genre-showcase/genre-showcase.vue";
import GenreOverviewCode from "./genres-overview.code";

export default defineComponent({
	components: {
		GenreShowcase
	},
	setup: () => {
		const code = new GenreOverviewCode();

		return SetupComponentPresenter.setupComponent(code);
	}
});

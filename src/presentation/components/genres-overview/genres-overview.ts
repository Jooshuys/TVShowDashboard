import { defineComponent } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import GenreShowcase from "@/presentation/components/genre-showcase/genre-showcase.vue";
import GenreOverviewCode from "./genres-overview.code";

export default defineComponent({
	components: {
		GenreShowcase
	},
	setup: () => {
		const code = new GenreOverviewCode();

		return setupComponentPresenter.setupComponent(code);
	}
});

import { defineComponent } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import GenresOverview from "@/presentation/components/genres-overview/genres-overview.vue";
import OverviewCode from "./overview.code";

export default defineComponent({
	components: {
		GenresOverview
	},
	setup: () => {
		const code = new OverviewCode();

		return SetupComponentPresenter.setupComponent(code);
	}
});

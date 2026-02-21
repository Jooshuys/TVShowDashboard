import { defineComponent } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import LoadingFailureNotification from "@/presentation/components/loading-failure-notification/loading-failure-notification.vue";
import GenresOverview from "@/presentation/components/genres-overview/genres-overview.vue";
import OverviewCode from "./overview.code";

export default defineComponent({
	components: {
		GenresOverview,
		LoadingFailureNotification
	},
	setup: () => {
		const code = new OverviewCode();

		return setupComponentPresenter.setupComponent(code);
	}
});

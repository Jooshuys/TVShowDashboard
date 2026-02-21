import { defineComponent, onMounted, onUnmounted } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import LoadingFailureNotification from "@/presentation/components/loading-failure-notification/loading-failure-notification.vue";
import ShowSpotlight from "@/presentation/components/show-spotlight/show-spotlight.vue";
import ShowDetailsCode from "./show-details.code";

export default defineComponent({
	components: {
		ShowSpotlight,
		LoadingFailureNotification
	},
	setup: () => {
		const code = new ShowDetailsCode();

		onMounted(code.mounted.bind(code));
		onUnmounted(code.unmounted.bind(code));

		return setupComponentPresenter.setupComponent(code);
	}
});

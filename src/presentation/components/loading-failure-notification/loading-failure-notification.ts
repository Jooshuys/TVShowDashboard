import { defineComponent } from "vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import LoadingFailureNotificationCode from "./loading-failure-notification.code";

export default defineComponent({
	setup: () => {
		const code = new LoadingFailureNotificationCode();

		return setupComponentPresenter.setupComponent(code);
	}
});

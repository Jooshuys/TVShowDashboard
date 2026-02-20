import { defineComponent } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import ShowDetailsCode from "./show-details.code";

export default defineComponent({
	setup: () => {
		const code = new ShowDetailsCode();

		return SetupComponentPresenter.setupComponent(code);
	}
});

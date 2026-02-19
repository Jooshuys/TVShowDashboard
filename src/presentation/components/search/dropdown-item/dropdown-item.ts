import { defineComponent } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import DropdownItemCode from "./dropdown-item.code";

export default defineComponent({
	props: {
		name: {
			type: String,
			required: true
		}
	},
	setup: () => {
		const code = new DropdownItemCode();
		return SetupComponentPresenter.setupComponent(code);
	}
});

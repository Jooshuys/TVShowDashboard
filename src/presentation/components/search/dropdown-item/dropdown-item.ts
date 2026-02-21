import { defineComponent, toRef, Ref } from "vue";
import { SearchResult } from "@/models/search";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import DropdownItemCode from "./dropdown-item.code";

export default defineComponent({
	props: {
		show: {
			type: Object,
			required: true
		}
	},
	setup: (props, context) => {
		const code = new DropdownItemCode(
			context.emit,
			toRef(props, "show") as Ref<SearchResult>
		);
		return SetupComponentPresenter.setupComponent(code);
	}
});

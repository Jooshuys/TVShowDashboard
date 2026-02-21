import { defineComponent, toRef, Ref } from "vue";
import { SearchResult } from "@/models/search";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import DropdownItem from "@/presentation/components/search/dropdown-item/dropdown-item.vue";
import DropdownCode from "./dropdown.code";

export default defineComponent({
	props: {
		searchTerm: {
			type: String,
			required: true
		},
		shows: {
			type: Array,
			required: true
		}
	},
	components: {
		DropdownItem
	},
	setup: (props, context) => {
		const code = new DropdownCode(
			context.emit,
			toRef(props, "shows") as Ref<SearchResult[]>,
			toRef(props, "searchTerm")
		);

		return SetupComponentPresenter.setupComponent(code);
	}
});

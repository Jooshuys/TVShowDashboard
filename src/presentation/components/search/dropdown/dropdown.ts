import { defineComponent, toRef, Ref } from "vue";
import { SearchResult } from "@/models/search";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import DropdownItem from "@/presentation/components/search/dropdown-item/dropdown-item.vue";
import DropdownCode from "./dropdown.code";

export default defineComponent({
	components: {
		DropdownItem
	},
	props: {
		searchTerm: {
			type: String,
			required: true
		},
		searchResults: {
			type: Array,
			required: true
		}
	},
	setup: (props, context) => {
		const code = new DropdownCode(
			context.emit,
			toRef(props, "searchResults") as Ref<SearchResult[]>,
			toRef(props, "searchTerm")
		);

		return setupComponentPresenter.setupComponent(code);
	}
});

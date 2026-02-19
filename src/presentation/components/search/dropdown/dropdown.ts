import { defineComponent, toRef } from "vue";
import DropdownItem from "@/presentation/components/search/dropdown-item/dropdown-item.vue";

export default defineComponent({
	props: {
		searchTerm: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true
		}
	},
	components: {
		DropdownItem
	},
	setup: (props) => {
		const searchTerm = toRef(props, "searchTerm");
		const items = toRef(props, "items");

		return {
			searchTerm,
			items
		};
	}
});

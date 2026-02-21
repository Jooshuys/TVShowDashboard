import { defineComponent, toRef } from "vue";

export default defineComponent({
	props: {
		classes: {
			type: Array,
			required: true,
		},
		isLoading: {
			type: Boolean,
			required: true
		},
		tag: {
			type: String,
			required: false
		}
	},
	setup: (props) => {
		return {
			tag: props.tag || "div",
			classes: toRef(props, "classes"),
			isLoading: toRef(props, "isLoading")
		};
	}
});
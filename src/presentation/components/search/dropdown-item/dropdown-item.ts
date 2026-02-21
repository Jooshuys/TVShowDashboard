import { defineComponent, toRef, Ref } from "vue";
import { SearchResult } from "@/models/search";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import LoadingWrapper from "@/presentation/components/loading-wrapper/loading-wrapper.vue";
import DropdownItemCode from "./dropdown-item.code";

export default defineComponent({
	components: {
		LoadingWrapper
	},
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
		return setupComponentPresenter.setupComponent(code);
	}
});

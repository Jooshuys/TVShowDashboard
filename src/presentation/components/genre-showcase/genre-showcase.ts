import { defineComponent, onMounted, onUnmounted } from "vue";
import LoadingWrapper from "@/presentation/components/loading-wrapper/loading-wrapper.vue";
import ShowPreviewCard from "@/presentation/components/show-preview-card/show-preview-card.vue";
import setupComponentPresenter from "@/presenters/setup-component-presenter";
import GenreShowcaseCode from "./genre-showcase.code";

export default defineComponent({
	components: {
		LoadingWrapper,
		ShowPreviewCard
	},
	props: {
		genreName: {
			type: String,
			required: true
		}
	},
	setup: (props) => {
		const code = new GenreShowcaseCode(props.genreName);

		onMounted(code.mounted.bind(code));
		onUnmounted(code.unmounted.bind(code));

		return setupComponentPresenter.setupComponent(code);
	}
});

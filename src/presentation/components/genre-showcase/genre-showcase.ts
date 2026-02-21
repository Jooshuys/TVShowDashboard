import { defineComponent } from "vue";
import LoadingWrapper from "@/presentation/components/loading-wrapper/loading-wrapper.vue";
import ShowPreviewCard from "@/presentation/components/show-preview-card/show-preview-card.vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
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

		return SetupComponentPresenter.setupComponent(code);
	}
});

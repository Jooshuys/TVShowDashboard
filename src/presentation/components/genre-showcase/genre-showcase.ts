import { defineComponent } from "vue";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import GenreShowcaseCode from "./genre-showcase.code";

export default defineComponent({
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

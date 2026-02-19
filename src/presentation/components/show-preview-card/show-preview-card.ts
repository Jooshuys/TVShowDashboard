import { defineComponent } from "vue";
import { TVMazeItem } from "@/models/tv-maze";
import SetupComponentPresenter from "@/presenters/setup-component-presenter";
import ShowPreviewCardCode from "./show-preview-card.code";

export default defineComponent({
	props: {
		show: {
			type: Object,
			required: true
		}
	},
	setup: (props) => {
		const code = new ShowPreviewCardCode(props.show as TVMazeItem);

		return SetupComponentPresenter.setupComponent(code);
	}
});

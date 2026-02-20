import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
	setup: () => {
		// TODO: Move this into the right component(s);
		const showForCurrentRoute = store.getters.showForCurrentRoute();
		const genreClusterHasShows = store.getters.genreClusterHasShows();

		return {
			showForCurrentRoute,
			genreClusterHasShows
		};
	}
});

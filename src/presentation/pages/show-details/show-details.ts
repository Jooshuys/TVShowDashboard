import { computed } from "vue";
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
	setup: () => {
		// TODO: Move this into the right component(s);
		const showForCurrentRoute = computed(() => store.getters.showForCurrentRoute());
		const genreClusterHasShows = computed(() => store.getters.genreClusterHasShows())

		return {
			showForCurrentRoute,
			genreClusterHasShows
		};
	}
});

import { computed } from "vue";
import { LoadingTypes, LoadingStatuses } from "@/models/loading";
import { TVMazeItem } from "@/models/tv-maze";
import routePresenter from "@/presenters/route-presenter";
import store from "@/store";

export default class ShowPreviewCardCode {
	
	constructor(
		public show: TVMazeItem
	) { }

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public handleNavigationItemClick(event: PointerEvent) {
		routePresenter.handleNavigationItemClick(event);
	}
}

import { computed, Ref } from "vue";
import { SearchResult } from "@/models/search";
import { Emits } from "@/models/emits";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import RoutePresenter from "@/presenters/route-presenter";
import store from "@/store";

export default class DropdownItemCode {

	constructor(
		private emit: (emit: Emits) => void,
		public show: Ref<SearchResult>
	) {}

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.SEARCH);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});
	
	public handleNavigationItemClick(event: PointerEvent) {
		RoutePresenter.handleNavigationItemClick(event);
		this.emit(Emits.ON_CLICK);
	}
}

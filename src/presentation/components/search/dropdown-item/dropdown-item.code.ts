import { computed, Ref } from "vue";
import { SearchResult } from "@/models/search";
import { Emits } from "@/models/emits";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import routePresenter from "@/presenters/route-presenter";
import store from "@/store";

export default class DropdownItemCode {

	constructor(
		private emit: (emit: Emits) => void,
		public show: Ref<SearchResult>
	) {}

	public showYear = computed((): string => {
		return this.show.value.premiered?.substring(0, 4) ?? '';
	});

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.SEARCH);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});
	
	public handleNavigationItemClick(event: PointerEvent) {
		routePresenter.handleNavigationItemClick(event);
		this.emit(Emits.RESULT_CLICKED);
	}
}

import { computed, Ref } from "vue";
import { LoadingTypes, LoadingStatuses } from "@/models/loading";
import { SearchResult } from "@/models/search";
import { Emits } from "@/models/emits";
import store from "@/store";

export default class DropdownCode {

	constructor(
		private emit: (emit: Emits) => void,
		public shows: Ref<SearchResult[]>,
		public searchTerm: Ref<string>
	) { }

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.SEARCH);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public emitClick(): void {
		this.emit(Emits.ON_CLICK);
	}
}

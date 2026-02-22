import { computed, Ref } from "vue";
import { DEFAULT_SEARCH_RESULTS_COUNT, DEFAULT_SEARCH_RESULT } from "@/static/defaults";
import { LoadingTypes, LoadingStatuses, LoadingProcess } from "@/models/loading";
import { SearchResult } from "@/models/search";
import { Emits } from "@/models/emits";
import store from "@/store";

export default class DropdownCode {
	public emitResultClicked = Emits.RESULT_CLICKED;

	constructor(
		private emit: (emit: Emits) => void,
		private searchResults: Ref<SearchResult[]>,
		public searchTerm: Ref<string>
	) { }

	public isLoading = computed((): boolean => {
		return this.loadingProcess.value?.status === LoadingStatuses.ACTIVE;
	});

	public isLoadingFailure = computed((): boolean => {
		return this.loadingProcess.value?.status === LoadingStatuses.ERROR;
	});

	private loadingProcess = computed((): LoadingProcess | undefined => {
		return store.getters.loadingProcessOfType(LoadingTypes.SEARCH);
	});

	public shows = computed((): SearchResult[] => {
		if (this.isLoading.value) {
			const shows = [];
			for (let i = 0; i < DEFAULT_SEARCH_RESULTS_COUNT; i++) {
				shows.push(DEFAULT_SEARCH_RESULT);
			}
			return shows;
		}

		return this.searchResults.value;
	});

	public emitClick(): void {
		this.emit(Emits.RESULT_CLICKED);
	}
}

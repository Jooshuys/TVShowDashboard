import { computed } from "vue";
import store from "@/store";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";

export default class OverviewCode {

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});
}
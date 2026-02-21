import { computed } from "vue";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import store from "@/store";

export default class OverviewCode {

	public isLoadingFailure = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ERROR;
	});
}

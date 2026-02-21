import { reactive } from "vue";
import { Routes } from "@/models/router";
import { State } from "@/models/store";
import { LoadingCluster, LoadingStatuses, LoadingTypes } from "@/models/loading";

const defaultLoadingCluster = Object.values(LoadingTypes).reduce((acc, type) => {
	acc[type] = {
		status: LoadingStatuses.INACTIVE,
		errorMessage: "",
	};
	return acc;
}, {} as LoadingCluster);

const state: State = reactive({
	genreCluster: {},
	loadingCluster: defaultLoadingCluster,
	router: {
		current: Routes.OVERVIEW,
		props: {
			id: 0
		}
	}
});

export default state;
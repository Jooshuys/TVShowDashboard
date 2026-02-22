import { computed } from "vue";
import { LoadingTypes, LoadingProcess } from "@/models/loading";
import store from "@/store";

export default class LoadingFailureNotificationCode {

	public loadingProcess = computed((): LoadingProcess | undefined => {
		return store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
	});
}

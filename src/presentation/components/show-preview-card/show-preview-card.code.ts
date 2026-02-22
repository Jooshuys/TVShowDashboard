import { computed } from "vue";
import { LoadingTypes, LoadingStatuses } from "@/models/loading";
import { TVMazeItem } from "@/models/tv-maze";
import sanitizePresenter from "@/presenters/sanitize-presenter";
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

	public showRating = computed((): string => {
		return this.show.rating.average?.toFixed(1) ?? "";
	});

	public showYear = computed((): string => {
		return this.show?.premiered?.substring(0, 4) ?? "";
	});

	public showNetworkName = computed((): string => {
		return this.show.network?.name ?? "";
	});

	public cardSummary = computed((): string => {
		let description = this.show.name;

		if (this.showYear.value) {
			description += `, released in ${this.showYear.value}`;
		}

		if (this.showNetworkName.value) {
			description += `, aired on ${this.showNetworkName.value}`;
		}

		if (this.showRating.value) {
			description += `, rated ${this.showRating.value} out of 10.`
		}

		return description;
	});

	public sanitizedShowDescription = computed((): string => {
		return sanitizePresenter.sanitize(this.show.summary);
	});

	public handleNavigationItemClick(event: PointerEvent) {
		routePresenter.handleNavigationItemClick(event);
	}
}

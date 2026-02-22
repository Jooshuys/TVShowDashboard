import { computed, ref, Ref } from "vue";
import { DEFAULT_GENRE_COUNT } from "@/static/defaults";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import store from "@/store";

export default class GenreOverviewCode {
	public bottomMarker: Ref<HTMLElement | null> = ref(null);
	private amountOfVisibleGenres = ref(DEFAULT_GENRE_COUNT);
	private observer: IntersectionObserver | null = null;

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public genresToShow = computed((): string[] => {
		if (this.isLoading.value) {
			const loadingGenres = [];
			for (let i = 0; i < this.amountOfVisibleGenres.value; i++) {
				loadingGenres.push(i.toString());
			}
			return loadingGenres;
		}

		const genresOrderedBySize = store.getters.genresOrderedBySize();
		return genresOrderedBySize.slice(0, this.amountOfVisibleGenres.value);
	});

	public mounted(): void {
		if (!this.bottomMarker.value) {
			return;
		}

		const options = {
			root: null,
			rootMargin: "200px",
			threshold: 0
		};

		this.observer = new IntersectionObserver((entries) => {
			if (!entries[0]?.isIntersecting) {
				return;
			}

			this.amountOfVisibleGenres.value += 1;
		}, options);

		this.observer.observe(this.bottomMarker.value);
	}

	public unmounted(): void {
		this.observer?.disconnect();
	}
}
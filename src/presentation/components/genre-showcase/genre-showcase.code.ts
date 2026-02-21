import { computed, ref, Ref } from "vue";
import { DEFAULT_SHOWS_PER_GENRE, DEFAULT_SHOW } from "@/static/defaults";
import { TVMazeItem } from "@/models/tv-maze";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import store from "@/store";

export default class GenreShowcaseCode {
	public scrollTrack: Ref<HTMLElement | null> = ref(null);
	public scrollButtonLeft: Ref<HTMLButtonElement | null> = ref(null);
	public scrollButtonRight: Ref<HTMLButtonElement | null> = ref(null);
	
	constructor(
		public genreName: string
	) { }

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public showsOfGenre = computed((): TVMazeItem[] => {
		if (this.isLoading.value) {
			const shows = [];
			for (let i = 0; i < DEFAULT_SHOWS_PER_GENRE; i++) {
				shows.push(DEFAULT_SHOW);
			}
			return shows;
		}

		return store.getters.showsOfGenre(this.genreName);
	});

	public scrollOnTrack(directionIsRight: boolean): void {
		if (!this.scrollTrack.value) {
			return;
		}

		const oneStepInPixels = 224;
		const currentPosition = this.scrollTrack.value.scrollLeft;
		const snappedPosition = Math.floor(currentPosition / oneStepInPixels) * oneStepInPixels;
		const newPosition = directionIsRight ? snappedPosition + oneStepInPixels : snappedPosition - oneStepInPixels;

		this.scrollTrack.value.scrollTo({
			left: newPosition,
			behavior: 'smooth'
		});
	}
}

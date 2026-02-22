import { computed, ref, Ref } from "vue";
import { DEFAULT_SHOWS_PER_GENRE, DEFAULT_SHOW } from "@/static/defaults";
import { TVMazeItem } from "@/models/tv-maze";
import { LoadingStatuses, LoadingTypes } from "@/models/loading";
import store from "@/store";

export default class GenreShowcaseCode {
	public scrollTrack: Ref<HTMLElement | null> = ref(null);
	public scrollButtonLeft: Ref<HTMLButtonElement | null> = ref(null);
	public scrollButtonRight: Ref<HTMLButtonElement | null> = ref(null);
	private boundScrollListener: () => void;
	private amountOfCardsThatFit: number;
	private amountOfShows = ref(DEFAULT_SHOWS_PER_GENRE);
	private snappedIndex = ref(0);
	private readonly cardWidthInPixels = 224;
	
	constructor(
		public genreName: string
	) {
		this.boundScrollListener = this.addMoreShowsIfEndOfTrackReached.bind(this);
		this.amountOfCardsThatFit = Math.floor(window.innerWidth / this.cardWidthInPixels);
	}

	public isLoading = computed((): boolean => {
		const loadingProcess = store.getters.loadingProcessOfType(LoadingTypes.GENRE_CLUSTER);
		return loadingProcess?.status === LoadingStatuses.ACTIVE;
	});

	public isButtonScrollLeftDisabled = computed((): boolean => {
		return this.snappedIndex.value <= 0;
	});

	public isButtonScrollRightDisabled = computed((): boolean => {
		return this.snappedIndex.value >= this.showsOfGenre.value.length - this.amountOfCardsThatFit;
	});

	public showsOfGenre = computed((): TVMazeItem[] => {
		if (this.isLoading.value) {
			const shows = [];
			for (let i = 0; i < this.amountOfShows.value; i++) {
				shows.push(DEFAULT_SHOW);
			}
			return shows;
		}

		return store.getters.showsOfGenre(this.genreName, this.amountOfShows.value);
	});

	public mounted(): void {
		if (!this.scrollTrack.value) {
			return;
		}

		this.scrollTrack.value.addEventListener("scroll", this.boundScrollListener);
	}

	public unmounted(): void {
		if (!this.scrollTrack.value) {
			return;
		}

		this.scrollTrack.value.removeEventListener("scroll", this.boundScrollListener);
	}

	public scrollOnTrack(directionIsRight: boolean): void {
		if (!this.scrollTrack.value) {
			return;
		}

		this.snappedIndex.value = this.calculateSnappedIndex(directionIsRight ? 1 : -1);
		const newPosition = this.snappedIndex.value * this.cardWidthInPixels;

		this.scrollTrack.value.scrollTo({
			left: newPosition,
			behavior: "smooth"
		});

		this.addMoreShowsIfEndOfTrackReached();
	}

	private addMoreShowsIfEndOfTrackReached(): void {
		// A bit of margin to ensure that cards load before user reaches the end.
		const extraMargin = 5;
		this.snappedIndex.value = this.calculateSnappedIndex(0);
		if (this.snappedIndex.value < this.showsOfGenre.value.length - this.amountOfCardsThatFit - extraMargin) {
			return;
		}

		this.amountOfShows.value += 20;
	}

	private calculateSnappedIndex(step: number): number {
		if (!this.scrollTrack.value) {
			return 0;
		}

		const currentPosition = this.scrollTrack.value.scrollLeft;
		const snappedIndex = Math.floor(currentPosition / this.cardWidthInPixels);
		return snappedIndex + step;
	}
}

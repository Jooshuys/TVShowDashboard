import { computed } from "vue";
import store from "@/store";

export default class GenreOverviewCode {
	private amountOfGenresToShow = 5;

	public genresToShow = computed((): string[] => {
		const genresOrderedBySize = store.getters.genresOrderedBySize();
		return genresOrderedBySize.slice(0, this.amountOfGenresToShow);
	});
}

// TODO: Show more genres when at bottom of page.
// TODO: Fetch more shows when near end of one genre.
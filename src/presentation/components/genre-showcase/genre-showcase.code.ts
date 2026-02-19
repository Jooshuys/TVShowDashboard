import { computed } from "vue";
import store from "@/store";
import { TVMazeItem } from "@/models/tv-maze";

export default class GenreShowcaseCode {

	public showsOfGenre = computed((): TVMazeItem[] => {
		return store.getters.showsOfGenre(this.genreName);
	});
	
	constructor(
		public genreName: string
	) { }
}

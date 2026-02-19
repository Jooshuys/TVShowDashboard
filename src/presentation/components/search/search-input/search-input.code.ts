import { ref, Ref } from "vue";
import { SearchResult } from "@/models/search";
import TVMazeService from "@/services/tv-maze-service";

export default class SearchInputCode {
	public searchInput: Ref<HTMLInputElement | null> = ref(null);
	public searchTerm: Ref<string> = ref("");
	public searchResults = ref<SearchResult[]>([]);
	public showDropdown = ref<boolean>(false);
	public searchWrapper = ref<HTMLDivElement | null>(null);

	// public searchResultsAsString = computed((): string => {
	// 	return this.searchResults.value.map((item) => item.name).join(",");
	// });

	private debounceTimeout: NodeJS.Timeout | number | null = null;
	private boundHandleOutsideClick: (event: MouseEvent) => void;

	constructor() {
		this.boundHandleOutsideClick = this.handleOutsideClick.bind(this);
	}

	public mounted(): void {
		document.addEventListener("click", this.boundHandleOutsideClick);
	}

	public unmounted(): void {
		document.removeEventListener("click", this.boundHandleOutsideClick);
	}

	public setSearchTerm(): void {
		if (!this.searchInput.value) {
			return;
		}

		this.searchTerm.value = this.searchInput.value.value;

		if (this.searchTerm.value.trim() === "") {
			this.searchResults.value = [];
			return;
		}

		this.debounceSearch();
	}

	public onInputFocus(): void {
		this.showDropdown.value = true;
	}

	private debounceSearch(): void {
		if (this.debounceTimeout) {
			clearTimeout(this.debounceTimeout as NodeJS.Timeout);
		}

		this.debounceTimeout = setTimeout(() => void this.delayedFunction(), 1000);
	}

	private async delayedFunction(): Promise<void> {
		if (this.searchTerm.value.trim() === "") {
			this.searchResults.value = [];
			return;
		}

		this.showDropdown.value = true;

		const shows = await TVMazeService.retrieveShowsThatMatchName(this.searchTerm.value);
		
		this.searchResults.value = shows;
	}

	private handleOutsideClick(event: MouseEvent): void {
		if (!this.searchWrapper.value || this.searchWrapper.value.contains(event.target as Node)) {
			return;
		}

		this.showDropdown.value = false;
	}
}

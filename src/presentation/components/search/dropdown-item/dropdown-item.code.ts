import { Ref } from "vue";
import { SearchResult } from "@/models/search";
import RoutePresenter from "@/presenters/route-presenter";
import { Emits } from "@/models/emits";

export default class DropdownItemCode {

	constructor(
		private emit: (emit: Emits) => void,
		public show: Ref<SearchResult>
	) {}
	
	public handleNavigationItemClick(event: PointerEvent) {
		RoutePresenter.handleNavigationItemClick(event);
		this.emit(Emits.ON_CLICK);
	}
}

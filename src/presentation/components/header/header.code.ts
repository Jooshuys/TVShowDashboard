import RoutePresenter from "@/presenters/route-presenter";

export default class HeaderCode {
	
	public handleNavigationItemClick(event: PointerEvent) {
		RoutePresenter.handleNavigationItemClick(event);
	}
}
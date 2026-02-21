import routePresenter from "@/presenters/route-presenter";

export default class HeaderCode {
	
	public handleNavigationItemClick(event: PointerEvent) {
		routePresenter.handleNavigationItemClick(event);
	}
}
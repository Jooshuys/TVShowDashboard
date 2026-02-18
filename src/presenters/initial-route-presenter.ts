import { Routes } from "@/models/router/router";
import store from "@/store";

class InitialRoutePresenter {
	private static githubApplicationName = import.meta.env.VITE_APP_URL_SEPARATOR;

	private static get defaultRoute(): Routes {
		return Routes.OVERVIEW;
	}

	private static get relevantUrlPart(): string {
		const urlSegments = window.location.href.split(this.githubApplicationName);
		const relevantUrlPart = urlSegments[1];
		if (!relevantUrlPart) {
			return '';
		}

		return relevantUrlPart;
	}

	private static get idFromUrl(): number {
		const urlSegments = this.relevantUrlPart.split("/");
		const id = urlSegments[2];
		if (!id) {
			return 0;
		}

		const idAsNumber = parseInt(id);
		if (isNaN(idAsNumber)) {
			return 0;
		}

		return idAsNumber;
	}

	private static get routeToShow(): Routes {
		const urlSegments = this.relevantUrlPart.split("/");
		const initialRoute = urlSegments[1];
		if (!initialRoute) {
			return this.defaultRoute;
		}

		const allRoutes: string[] = Object.values(Routes);
		if (!allRoutes.includes(initialRoute)) {
			return this.defaultRoute;
		}

		return initialRoute as Routes;
	}

	public static prepareForRoutingActions(): void {
		this.showComponentInLineWithCurrentRoute();
		this.respondToExternalRouteChanges();
	}

	private static showComponentInLineWithCurrentRoute(): void {
		store.mutations.setCurrentRoute(this.routeToShow, this.idFromUrl);
	}

	private static respondToExternalRouteChanges(): void {
		window.addEventListener(
			"hashchange",
			this.showComponentInLineWithCurrentRoute.bind(this)
		);
	}
}

export default InitialRoutePresenter;
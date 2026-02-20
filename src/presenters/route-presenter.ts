import { Routes } from "@/models/router";
import store from "@/store";

export default class RoutePresenter {
	private static githubApplicationName = import.meta.env.VITE_APP_URL_SEPARATOR;

	private static get defaultRoute(): Routes {
		return Routes.OVERVIEW;
	}

	public static handleNavigationItemClick(event: PointerEvent): void {
		if (
			event.metaKey || // Cmd click.
			event.ctrlKey || // Ctrl click.
			event.shiftKey ||
			event.altKey ||
			event.button !== 0 // Not left click.
		) {
			return;
		}

		const target = event.currentTarget as HTMLAnchorElement | null
		if (!target) {
			return;
		}
		
		event.preventDefault();

		const path = target.getAttribute("href") as string;
		store.mutations.navigateToRoute(path);
	}

	public static prepareForRoutingActions(): void {
		store.mutations.navigateToRoute(window.location.href);
		this.respondToExternalRouteChanges();
	}

	public static retrieveIdFromUrl(url: string): number {
		const urlSegments = this.retrieveRelevantUrlPart(url).split("/");
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

	public static retrieveRouteNameFromUrl(url: string): Routes {
		const urlSegments = this.retrieveRelevantUrlPart(url).split("/");
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

	public static retrieveRelevantUrlPart(url: string): string {
		const urlIsRootRelative = url[0] === '/';
		if (urlIsRootRelative) {
			return url;
		}

		const urlSegments = url.split(this.githubApplicationName);
		const relevantUrlPart = urlSegments[1];
		if (!relevantUrlPart) {
			return '';
		}

		return relevantUrlPart;
	}

	private static respondToExternalRouteChanges(): void {
		window.addEventListener(
			"hashchange",
			() => store.mutations.navigateToRoute(window.location.href)
		);
	}
}
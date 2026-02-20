import { Mutations } from "@/models/store";
import RoutePresenter from "@/presenters/route-presenter";
import state from "./state";

const mutations: Mutations = {
	addShowsToGenreCluster: (shows) => {
		shows.forEach(show => {
			show.genres.forEach(genre => {
				if (!state.genreCluster[genre]) {
					state.genreCluster[genre] = [show];
					return;
				}

				const alreadyStored = state.genreCluster[genre].some((genreShow) => genreShow.id === show.id);
				if (alreadyStored) {
					return;
				}
				
				state.genreCluster[genre].push(show);
			});
		});

		for (const [genre, items] of Object.entries(state.genreCluster)) {
			const sortedItems = [...items].sort((a, b) => {
				return (b.rating.average ?? 0) - (a.rating.average ?? 0);
			});

			state.genreCluster[genre] = sortedItems;
		}
	},
	navigateToRoute: (url) => {
		debugger;
		const routeName = RoutePresenter.retrieveRouteNameFromUrl(url);
		const id = RoutePresenter.retrieveIdFromUrl(url);
		state.router.props.id = id ? id : 0;
		state.router.current = routeName;
		history.pushState({}, '', url);
	}
};

export default mutations;


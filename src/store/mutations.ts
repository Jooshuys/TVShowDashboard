import { Mutations } from "@/models/store";
import routePresenter from "@/presenters/route-presenter";
import state from "./state";

const mutations: Mutations = {
	addShowsToGenreCluster: (shows) => {
		shows.forEach(show => {
			if (show.genres.length === 0) {
				show.genres = ['Other'];
			}

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
		const routeName = routePresenter.retrieveRouteNameFromUrl(url);
		const id = routePresenter.retrieveIdFromUrl(url);
		state.router = {
			current: routeName,
			props: {
				id: id ? id : 0
			}
		};
		history.pushState({}, '', url);
	},
	updateLoadingStatusOfType: (type, status) => {
		if (!state.loadingCluster[type]) {
			return;
		}

		state.loadingCluster[type].status = status;
	}
};

export default mutations;


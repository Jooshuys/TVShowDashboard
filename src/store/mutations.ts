import { Mutations } from "@/models/store";
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
	setCurrentRoute: (name, id) => {
		state.router.props.id = id ? id : 0;
		state.router.current = name;
	}
};

export default mutations;


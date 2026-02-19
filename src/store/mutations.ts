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
	},
	setCurrentRoute: (name, id) => {
		state.router.props.id = id ? id : 0;
		state.router.current = name;
	}
};

export default mutations;


import { Mutations } from "@/models/store";
import state from "./state";

const mutations: Mutations = {
	setCurrentRoute: (name, id) => {
		state.router.props.id = id ? id : 0;
		state.router.current = name;
	}
};

export default mutations;
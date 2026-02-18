import state from "./state";
import { Getters } from "@/models/store/store";

const getters: Getters = {
	router: () => state.router
}

export default getters;
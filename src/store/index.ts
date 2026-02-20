import { readonly } from "vue";
import { Store, State } from "@/models/store";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";

const store: Store = {
	state: readonly(state) as State,
	mutations,
	getters
};

export default store;
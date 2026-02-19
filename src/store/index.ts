import { readonly } from "vue";
import { Store } from "@/models/store";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";

const store: Store = {
	state: readonly(state),
	mutations,
	getters
};

export default store;
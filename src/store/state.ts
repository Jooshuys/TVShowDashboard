import { reactive } from "vue";
import { Routes } from "@/models/router";
import { State } from "@/models/store";

const state: State = reactive({
	router: {
		current: Routes.OVERVIEW,
		props: {
			id: 0
		}
	}
});

export default state;
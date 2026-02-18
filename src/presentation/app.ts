import { defineComponent, onMounted } from "vue";
import AppCode from "./app.code";

export default defineComponent({
	setup: () => {
		const code = new AppCode();

		onMounted(code.mounted.bind(code));

		return code;
	}
});
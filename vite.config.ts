import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.message.includes("source-map-js")) {
					return;
				}

				warn(warning);
			}
		}
	}
});

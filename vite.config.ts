import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	test: {
		globals: true,
		environment: "jsdom",
		coverage: {
			include: [
				"src/presentation/**/*.code.ts",
				"src/infrastructure/*.ts",
				"src/presenters/*.ts",
				"src/services/*.ts",
				"src/store/*.ts"
			],
			provider: "v8",
			reporter: [
				["text", { maxCols: 200 }]
			],
			reportsDirectory: "tests/coverage-results"
		}
	}
});

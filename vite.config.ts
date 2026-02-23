import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	base: '/TVShowDashboard/',
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
			provider: "v8",
			include: [
				"src/presentation/**/*.code.ts",
				"src/infrastructure/*.ts",
				"src/presenters/*.ts",
				"src/services/*.ts",
				"src/store/*.ts"
			],
			reportsDirectory: "tests/coverage-results",
			reporter: [
				["text", { maxCols: 200 }]
			]
		},
		setupFiles: [
			"tests/unit/additionalMocks.ts"
		]
	}
});

/// <reference types="vitest" />

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	css: {
		postcss: "./postcss.config.js", // PostCSS config path
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	define: {
		"process.env": process.env,
	},
});

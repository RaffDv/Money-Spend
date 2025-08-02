import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: "http://localhost:4000/api-json",
	output: {
		path: "./lib/client",
	},
	plugins: [
		"@hey-api/schemas",
		{
			dates: true,
			name: "@hey-api/transformers",
		},
		{
			enums: "javascript",
			name: "@hey-api/typescript",
		},
		{
			name: "@hey-api/sdk",
			transformer: true,
		},
		"@tanstack/react-query",
	],
});

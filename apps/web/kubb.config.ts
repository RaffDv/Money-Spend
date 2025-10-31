import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";

export default defineConfig(() => {
	return {
		root: ".",
		input: {
			path: "./api.json",
		},
		output: {
			path: "./lib/gen",
		},
		plugins: [
			pluginOas(),
			pluginTs(),
			pluginReactQuery({
				output: {
					path: "hooks",
				},
				paramsType: "inline",
				pathParamsType: "object",
				suspense: false,

				client: {
					baseURL: "http://localhost:4000",
					dataReturnType: "data",
					importPath: "@/lib/client.ts",
				},
			}),
		],
	};
});

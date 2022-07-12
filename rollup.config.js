import resolve from "@rollup/plugin-node-resolve"

import { version } from "./package.json"
const year = new Date().getFullYear()
const banner = `/*\nWebapi ${version}\nCopyright © ${year} Kacestudio\n*/`

export default {
  input: "src/webapi.js",
	output: [
		{
			file: "dist/webapi.umd.js",
			format: "umd",
			banner
		},
		{
			file: "dist/webapi.esm.js",
			format: "es",
			banner
		}
	],
	plugins: [resolve()]
}
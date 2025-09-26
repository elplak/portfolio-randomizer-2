import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
    root: "client",
    resolve: {
        alias: {
            components: path.resolve(__dirname, "client/src/components"),
            core: path.resolve(__dirname, "client/src/core"),
            data: path.resolve(__dirname, "client/src/data"),
            features: path.resolve(__dirname, "client/src/features"),
            utils: path.resolve(__dirname, "client/src/utils"),
        },
        extensions: [".ts", ".js", ".mjs", ".json"],
    },
    server: {
        port: 5173,
    },
});
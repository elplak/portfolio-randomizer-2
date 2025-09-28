"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000", // TODO: change to env variable
                changeOrigin: true
            }
        }
    }
});

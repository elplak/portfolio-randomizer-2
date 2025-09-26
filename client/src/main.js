"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layout_1 = require("./core/layout");
var generator_1 = require("./core/generator");
fetch("/toolbar.html")
    .then(function (res) { return res.text(); })
    .then(function (html) {
    document.getElementById("toolbar-container").innerHTML = html;
    (0, layout_1.initLayoutControls)();
    (0, generator_1.generate)();
});

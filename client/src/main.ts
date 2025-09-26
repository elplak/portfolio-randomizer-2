import { initLayoutControls } from "./core/layout";
import { generate } from "./core/generator";

fetch("/toolbar.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("toolbar-container")!.innerHTML = html;
        initLayoutControls();
        generate();
    });

import { generate } from "./generator";

declare const JSZip: any;
declare function saveAs(data: Blob, filename: string): void;

export function initLayoutControls(): void {
    const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement | null;
    const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement | null;

    if (!generateBtn || !downloadBtn) return;

    generateBtn.addEventListener("click", async () => {
        await generate();
    });

    downloadBtn.addEventListener("click", async () => {
        const appEl = document.getElementById("app");
        if (!appEl) return;

        const appClone = appEl.cloneNode(true) as HTMLElement;
        appClone.querySelectorAll(".editor-only").forEach((el) => el.remove());

        const content: string = appClone.innerHTML;

        const toolbarEl = document.querySelector(".toolbar");
        const footerEl = document.querySelector(".footer");
        const footerHTML = footerEl ? `<footer class="footer">${footerEl.innerHTML}</footer>` : "";

        const fullHTML = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Meine Random Website</title>
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/effects.css">
  <link rel="stylesheet" href="css/toolbar.css">
</head>
<body>
<header class="toolbar">
  ${toolbarEl ? toolbarEl.innerHTML : ""}
</header>
<main class="container">
  ${content}
</main>
${footerHTML}
</body>
</html>`;

        const zip = new JSZip();
        zip.file("index.html", fullHTML);

        const cssFiles = ["styles/styles.css", "styles/effects.css", "styles/toolbar.css"];
        for (const file of cssFiles) {
            try {
                const response = await fetch(file);
                let text = await response.text();

                text = text.replace(/\.delete-section[\s\S]*?\}/g, "");
                text = text.replace(/\.editor-only[\s\S]*?\}/g, "");

                zip.file(file, text);
            } catch (e) {
                console.warn(`Konnte ${file} nicht laden:`, e);
            }
        }

        const imgElements = document.querySelectorAll<HTMLImageElement>("img");
        for (const img of Array.from(imgElements)) {
            try {
                const response = await fetch(img.src);
                const blob = await response.blob();
                const filename = img.src.split("/").pop() ?? "image";
                zip.file(filename, blob);
            } catch (e) {
                console.warn(`Konnte Bild ${img.src} nicht laden:`, e);
            }
        }

        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, "website.zip");
    });
}
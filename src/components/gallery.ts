import {randomBool} from "../utils/random";

export const gallery: Array<() => Promise<string>> = [
    async (): Promise<string> => {
        const count: number = 5 + Math.floor(Math.random() * 3);

        const images: string = Array.from({ length: count })
            .map(() => {
                const src = `https://picsum.photos/${
                    randomBool() ? "300/200" : "250/200"
                }?random=${Math.random()}`;

                return `
          <div class="img-wrapper">
            <div class="spinner"></div>
            <img data-src="${src}" alt="Gallery">
          </div>`;
            })
            .join("");

        return `
      <section class="gallery grid draggable-section" draggable="true">
        ${images}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },

    async (): Promise<string> => {
        const count: number = 4 + Math.floor(Math.random() * 3);

        const images: string = Array.from({ length: count })
            .map(() => {
                const src = `https://picsum.photos/${
                    randomBool() ? "400/250" : "350/220"
                }?random=${Math.random()}`;

                return `
          <div>
            <div class="img-wrapper">
              <div class="spinner"></div>
              <img data-src="${src}" alt="Gallery">
            </div>
          </div>`;
            })
            .join("");

        return `
      <section class="gallery carousel draggable-section" draggable="true">
        ${images}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },
];

// lazy-loading
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll<HTMLImageElement>(".img-wrapper img").forEach((img) => {
        const src = img.getAttribute("data-src");
        if (!src) return;

        img.addEventListener("load", () => {
            img.closest(".img-wrapper")?.classList.add("loaded");
        });

        img.src = src;
    });
});

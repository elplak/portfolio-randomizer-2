import { randomBool } from "../utils/random";
import type { SectionFactory } from "./hero";

export const gallery: SectionFactory[] = [
    async (): Promise<string> => {
        const count = 5 + Math.floor(Math.random() * 3);

        const images = Array.from({ length: count })
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
        const count = 4 + Math.floor(Math.random() * 3);

        const images = Array.from({ length: count })
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
    }
];
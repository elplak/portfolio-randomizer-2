import { randomBool } from "utils/random";
import { getRandomImage } from "utils/api";
import type { SectionFactory } from "./hero";

export const gallery: SectionFactory[] = [
    async (): Promise<string> => {
        const count = 5 + Math.floor(Math.random() * 3);

        const images = await Promise.all(
            Array.from({ length: count }).map(async () => {
                const src = await getRandomImage(
                    randomBool() ? 300 : 250,
                    200 // fixed height
                );
                return `
          <div class="img-wrapper">
            <div class="spinner"></div>
            <img data-src="${src}" alt="Gallery">
          </div>`;
            })
        ).then((arr) => arr.join(""));

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

        const images = await Promise.all(
            Array.from({ length: count }).map(async () => {
                const src = await getRandomImage(
                    randomBool() ? 400 : 350,
                    randomBool() ? 250 : 220
                );
                return `
          <div>
            <div class="img-wrapper">
              <div class="spinner"></div>
              <img data-src="${src}" alt="Gallery">
            </div>
          </div>`;
            })
        ).then((arr) => arr.join(""));

        return `
      <section class="gallery carousel draggable-section" draggable="true">
        ${images}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    }
];
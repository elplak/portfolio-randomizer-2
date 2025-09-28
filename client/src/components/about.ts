import { randomBool } from "utils/random";
import { getRandomText, getRandomImage } from "utils/api";
import type { SectionFactory } from "./hero";

export const about: SectionFactory[] = [
    async (): Promise<string> => {
        const imgUrl = await getRandomImage(randomBool() ? 400 : 350, randomBool() ? 300 : 250);
        const text = await getRandomText();

        return `
      <section class="about img-left draggable-section" draggable="true">
        <div class="img-wrapper">
          <div class="spinner"></div>
          <img data-src="${imgUrl}" alt="About">
        </div>
        <div>
          <h2>${randomBool() ? "Who I am" : "About Me"}</h2>
          <p>${text}</p>
        </div>
        <button class="delete-section editor-only" onclick="this.closest('section')?.remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>
    `;
    },

    async (): Promise<string> => {
        const text = await getRandomText();

        return `
      <section class="about simple draggable-section" draggable="true">
        <h2>${randomBool() ? "About Me" : "My Story"}</h2>
        <p>${text}</p>
        <button class="delete-section editor-only" onclick="this.closest('section')?.remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>
    `;
    }
];
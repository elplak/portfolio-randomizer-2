import { randomChoice, randomBool } from "../utils/random";
import { getLoremCached } from "../utils/lorem";

type AboutSection = () => Promise<string>;

export const about: AboutSection[] = [
    async (): Promise<string> => `
    <section class="about img-left draggable-section" draggable="true">
      <div class="img-wrapper">
        <div class="spinner"></div>
        <img data-src="https://picsum.photos/${
        randomBool() ? "400/300" : "350/250"
    }?random=${Math.random()}" alt="About">
      </div>
      <div>
        <h2>${randomBool() ? "Who I am" : "About Me"}</h2>
        <p>${await getLoremCached(randomBool() ? 1 : 2)}</p>
      </div>
      <button class="delete-section editor-only" onclick="this.closest('section')?.remove()">
        <i class="fa-solid fa-trash"></i>
      </button>
    </section>
  `,

    async (): Promise<string> => `
    <section class="about simple draggable-section" draggable="true">
      <h2>${randomBool() ? "About Me" : "My Story"}</h2>
      <p>${await getLoremCached(2)}</p>
      <button class="delete-section editor-only" onclick="this.closest('section')?.remove()">
        <i class="fa-solid fa-trash"></i>
      </button>
    </section>
  `
];

import { randomBool, randomChoice } from "../utils/random";
import { getLoremCached } from "../utils/lorem";
import { slogans } from "../data/slogans";
import { btnVariants } from "../data/buttonVariants";

export type SectionFactory = () => Promise<string>;

export const hero: SectionFactory[] = [
    async (): Promise<string> => {
        const title = randomChoice(slogans);
        const text = await getLoremCached(randomBool() ? 1 : 2);
        const btnClass = randomChoice(btnVariants);
        const btnLabel = randomBool() ? "Learn more" : "Get started";

        return `
      <section class="hero center draggable-section" draggable="true">
        <h1>${title}</h1>
        <p>${text}</p>
        <a href="#" class="${btnClass}">
          ${btnLabel}
        </a>
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },

    async (): Promise<string> => {
        const heading =
            randomBool()
                ? "Portfolio " + Math.floor(Math.random() * 2050)
                : randomChoice(slogans);
        const text = await getLoremCached(1);
        const btnClass = randomChoice(btnVariants);
        const btnLabel = randomBool() ? "Discover" : "Explore";
        const imgUrl = `https://picsum.photos/${
            randomBool() ? "600/400" : "500/350"
        }?random=${Math.random()}`;

        return `
      <section class="hero split draggable-section" draggable="true">
        <div>
          <h1>${heading}</h1>
          <p>${text}</p>
          <a href="#" class="${btnClass}">
            ${btnLabel}
          </a>
        </div>
        <div class="img-wrapper">
          <div class="spinner"></div>
          <img data-src="${imgUrl}" alt="Hero">
        </div>
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },

    async (): Promise<string> => {
        const bgUrl = `https://picsum.photos/${
            1200 + Math.floor(Math.random() * 100)
        }/${400 + Math.floor(Math.random() * 100)}?random=${Math.random()}`;
        const title = randomChoice(slogans);

        return `
      <section class="hero full-bg draggable-section" draggable="true" style="background-image:url('${bgUrl}')">
        <h1>${title}</h1>
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    }
];
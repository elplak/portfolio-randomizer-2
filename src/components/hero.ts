import {randomBool, randomChoice} from "../utils/random";
import {getLoremCached} from "../utils/lorem";
import {slogans} from "../data/slogans";
import {btnVariants} from "../data/buttonVariants";

export const hero: Array<() => Promise<string>> = [
    async (): Promise<string> => {
        const title: string = randomChoice(slogans);
        const text: string = await getLoremCached(randomBool() ? 1 : 2);
        const btnClass: string = randomChoice(btnVariants);
        const btnLabel: string = randomBool() ? "Learn more" : "Get started";

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
        const heading: string = randomBool()
            ? "Portfolio " + Math.floor(Math.random() * 2050)
            : randomChoice(slogans);
        const text: string = await getLoremCached(1);
        const btnClass: string = randomChoice(btnVariants);
        const btnLabel: string = randomBool() ? "Discover" : "Explore";
        const imgUrl: string = `https://picsum.photos/${
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
        const bgUrl: string = `https://picsum.photos/${
            1200 + Math.floor(Math.random() * 100)
        }/${400 + Math.floor(Math.random() * 100)}?random=${Math.random()}`;
        const title: string = randomChoice(slogans);

        return `
      <section class="hero full-bg draggable-section" draggable="true" style="background-image:url('${bgUrl}')">
        <h1>${title}</h1>
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },
];
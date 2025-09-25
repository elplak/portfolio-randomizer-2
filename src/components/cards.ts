import { randomBool } from "../utils/random";
import { getLoremCached } from "../utils/lorem";

export const cards: Array<() => Promise<string>> = [
    async (): Promise<string> => {
        const count: number = 3 + Math.floor(Math.random() * 2);

        const cardHtml: string = await Promise.all(
            Array.from({ length: count }).map(async (): Promise<string> => {
                const imgUrl = `https://picsum.photos/${
                    randomBool() ? "300/200" : "280/180"
                }?random=${Math.random()}`;

                const title = randomBool() ? "Card" : "Project";
                const text = await getLoremCached(1);

                return `
          <div class="card">
            <div class="img-wrapper">
              <div class="spinner"></div>
              <img data-src="${imgUrl}" alt="Card">
            </div>
            <h3>${title}</h3>
            <p>${text}</p>
          </div>`;
            })
        ).then((arr: string[]) => arr.join(""));

        return `
      <section class="cards grid draggable-section" draggable="true">
        ${cardHtml}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },
];

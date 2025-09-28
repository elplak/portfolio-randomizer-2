import { randomBool } from "utils/random";
import { getRandomText, getRandomImage } from "utils/api";
import type { SectionFactory } from "./hero";

export const cards: SectionFactory[] = [
    async (): Promise<string> => {
        const count = 3 + Math.floor(Math.random() * 2);

        const cardHtml = await Promise.all(
            Array.from({ length: count }).map(async (): Promise<string> => {
                const imgUrl = await getRandomImage(
                    randomBool() ? 300 : 280,
                    randomBool() ? 200 : 180
                );
                const title = randomBool() ? "Card" : "Project";
                const text = await getRandomText();

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
        ).then((arr) => arr.join(""));

        return `
      <section class="cards grid draggable-section" draggable="true">
        ${cardHtml}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    }
];
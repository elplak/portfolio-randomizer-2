import {getLoremCached} from "../utils/lorem";

export const features: Array<() => Promise<string>> = [
    async (): Promise<string> => {
        const count: number = 3 + Math.floor(Math.random() * 3);

        const cardsHtml: string = await Promise.all(
            Array.from({ length: count }).map(async (_: unknown, i: number): Promise<string> => {
                const title: string =
                    Math.random() > 0.5
                        ? "Feature " + String.fromCharCode(65 + i) // A, B, C ...
                        : "Option " + (i + 1);
                const text: string = await getLoremCached(1);

                return `
          <div class="card">
            <h3>${title}</h3>
            <p>${text}</p>
          </div>`;
            })
        ).then((arr: string[]) => arr.join(""));

        return `
      <section class="features draggable-section" draggable="true">
        ${cardsHtml}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },
];

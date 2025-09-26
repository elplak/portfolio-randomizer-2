import { getLoremCached } from "../utils/lorem";
import type { SectionFactory } from "./hero";

export const testimonials: SectionFactory[] = [
    async (): Promise<string> => {
        const text1 = await getLoremCached(1);
        const text2 = await getLoremCached(1);
        const author1 = Math.random() > 0.5 ? "Alex" : "Taylor";
        const author2 = Math.random() > 0.5 ? "Jamie" : "Chris";

        return `
      <section class="testimonials draggable-section" draggable="true">
        <blockquote>"${text1}" <span>- ${author1}</span></blockquote>
        <blockquote>"${text2}" <span>- ${author2}</span></blockquote>
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },

    async (): Promise<string> => {
        const items = await Promise.all(
            Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map(
                async (_, i) =>
                    `<blockquote>"${await getLoremCached(1)}" <span>- Person ${i + 1}</span></blockquote>`
            )
        ).then((arr) => arr.join(""));

        return `
      <section class="testimonials grid draggable-section" draggable="true">
        ${items}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    }
];
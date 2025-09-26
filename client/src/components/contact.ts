import { randomBool, randomChoice } from "../utils/random";
import { btnVariants } from "../data/buttonVariants";
import type { SectionFactory } from "./hero";

export const contact: SectionFactory[] = [
    async (): Promise<string> => {
        const heading = randomBool() ? "Contact" : "Get in Touch";
        const namePlaceholder = randomBool() ? "Your Name" : "Name";
        const emailPlaceholder = randomBool() ? "Email Address" : "Email";
        const messagePlaceholder = randomBool()
            ? "Write your message..."
            : "Message";
        const buttonClass = randomChoice(btnVariants);

        return `
      <section class="contact draggable-section" draggable="true">
        <h2>${heading}</h2>
        <form>
          <input type="text" placeholder="${namePlaceholder}" required>
          <input type="email" placeholder="${emailPlaceholder}" required>
          <textarea placeholder="${messagePlaceholder}" required></textarea>
          <button class="${buttonClass}">Send</button>
        </form>
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    }
];
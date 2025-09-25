import {randomBool, randomChoice} from "../utils/random";
import {btnVariants} from "../data/buttonVariants";

export const contact: Array<() => Promise<string>> = [
    async (): Promise<string> => {
        const heading: string = randomBool() ? "Contact" : "Get in Touch";
        const namePlaceholder: string = randomBool() ? "Your Name" : "Name";
        const emailPlaceholder: string = randomBool() ? "Email Address" : "Email";
        const messagePlaceholder: string = randomBool()
            ? "Write your message..."
            : "Message";
        const buttonClass: string = randomChoice(btnVariants);

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
    },
];
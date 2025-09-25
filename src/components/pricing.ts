import {getLoremCached} from "../utils/lorem";
import {randomBool, randomChoice} from "../utils/random";
import {btnVariants} from "../data/buttonVariants";

type Plan = { name: string; price: string };
type SectionFactory = () => Promise<string>;

export const pricing: SectionFactory[] = [
    async (): Promise<string> => {
        const plans: Plan[] = [
            { name: "Basic", price: "19€" },
            { name: "Pro", price: "49€" },
            { name: "Enterprise", price: "99€" }
        ];
        const featuredIndex: number = Math.floor(Math.random() * plans.length);

        const plansHtml: string = await Promise.all(
            plans.map(
                async (plan, idx): Promise<string> => `
          <div class="card ${idx === featuredIndex ? "featured" : ""}">
            <h3>${plan.name}</h3>
            <strong>${plan.price}</strong>
            <ul>
              ${(await Promise.all(
                    Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map(
                        async (): Promise<string> => `<li>${await getLoremCached(1)}</li>`
                    )
                )).join("")}
            </ul>
            <a href="#" class="${randomChoice(btnVariants)}">
              ${randomBool() ? "Choose" : "Select"}
            </a>
          </div>`
            )
        ).then((arr: string[]) => arr.join(""));

        return `
      <section class="pricing grid draggable-section" draggable="true">
        ${plansHtml}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },

    async (): Promise<string> => {
        const plans: Plan[] = [
            { name: "Starter", price: "15€" },
            { name: "Team", price: "39€" },
            { name: "Business", price: "89€" }
        ];
        const highlightIndex: number = Math.floor(Math.random() * plans.length);

        const plansHtml: string = await Promise.all(
            plans.map(
                async (plan, idx): Promise<string> => `
          <div class="row ${idx === highlightIndex ? "highlight" : ""}">
            <h3>${plan.name}</h3>
            <p>${await getLoremCached(1)}</p>
            <strong>${plan.price}</strong>
            <a href="#" class="${randomChoice(btnVariants)}">
              ${randomBool() ? "Start" : "Get it"}
            </a>
          </div>`
            )
        ).then((arr: string[]) => arr.join(""));

        return `
      <section class="pricing rows draggable-section" draggable="true">
        ${plansHtml}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    },

    async (): Promise<string> => {
        const plans: Plan[] = [
            { name: "Lite", price: "9€" },
            { name: "Pro", price: "59€" },
            { name: "Ultimate", price: "129€" }
        ];

        const plansHtml: string = plans
            .map(
                (plan): string => `
          <div>
            <strong>${plan.price}</strong>
            <h3>${plan.name}</h3>
          </div>`
            )
            .join("");

        return `
      <section class="pricing minimal draggable-section" draggable="true">
        ${plansHtml}
        <button class="delete-section editor-only" onclick="this.closest('section').remove()">
          <i class="fa-solid fa-trash"></i>
        </button>
      </section>`;
    }
];
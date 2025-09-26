import { components } from "../components";
import {applyRandomDesign} from "../features/themes";
import {applyRandomEffects} from "../features/effects";
import {enableSectionDragDrop} from "../utils/dragdrop";

function shuffle<T>(array: T[]): T[] {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function getSelectedSections(): string[] {
    return Array.from(
        document.querySelectorAll<HTMLInputElement>(
            '.controls input[type="checkbox"]:checked'
        )
    ).map((cb) => cb.value);
}

export async function generate(): Promise<void> {
    let html = "";
    const selected = shuffle(getSelectedSections());

    if (selected.includes("hero")) {
        const hero =
            components.hero[Math.floor(Math.random() * components.hero.length)];
        html += await hero();
    }

    for (const sec of [
        "about",
        "features",
        "cards",
        "gallery",
        "testimonials",
        "pricing"
    ]) {
        if (selected.includes(sec) && components[sec]) {
            const comp =
                components[sec][
                    Math.floor(Math.random() * components[sec].length)
                    ];
            html += await comp();
        }
    }

    if (components.contact) {
        const contact =
            components.contact[
                Math.floor(Math.random() * components.contact.length)
                ];
        html += await contact();
    }

    const layouts = [
        "container narrow",
        "container wide",
        "container boxed",
        "container fluid"
    ];
    const mainEl = document.querySelector<HTMLElement>("main.container");
    if (mainEl) {
        mainEl.className = layouts[Math.floor(Math.random() * layouts.length)];
    }

    const appEl = document.getElementById("app");
    if (appEl) {
        appEl.innerHTML = html;
    }

    applyRandomDesign();
    applyRandomEffects();
    enableSectionDragDrop();
    initLazyLoading();
}

function initLazyLoading(): void {
    const images = document.querySelectorAll<HTMLImageElement>("img[data-src]");

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.dataset.src;
                    if (!src) return;

                    img.src = src;
                    img.onload = () => {
                        const wrapper = img.closest<HTMLElement>(".img-wrapper");
                        if (wrapper) wrapper.classList.add("loaded");
                    };

                    img.removeAttribute("data-src");
                    obs.unobserve(img);
                }
            });
        },
        { rootMargin: "300px" }
    );

    images.forEach((img) => observer.observe(img));
}
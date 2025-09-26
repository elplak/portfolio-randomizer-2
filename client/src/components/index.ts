import { hero } from "./hero";
import { about } from "./about";
import { features } from "./features";
import { cards } from "./cards";
import { gallery } from "./gallery";
import { testimonials } from "./testimonials";
import { pricing } from "./pricing";
import { contact } from "./contact";

import type { SectionFactory } from "./hero";

export const components: Record<string, SectionFactory[]> = {
    hero,
    about,
    features,
    cards,
    gallery,
    testimonials,
    pricing,
    contact
};
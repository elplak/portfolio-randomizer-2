import { hero } from "./hero.js";
import { features } from "./features.js";
import { gallery } from "./gallery.js";
import { testimonials } from "./testimonials.js";
import { pricing } from "./pricing.js";
import { contact } from "./contact.js";
import {about} from "./about";
import {cards} from "./cards";

type SectionFactory = () => Promise<string>;

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
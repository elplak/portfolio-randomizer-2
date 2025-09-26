import { Router, Request, Response } from "express";

const router = Router();

interface Theme {
    primary: string;
    secondary: string;
    font: string;
}

interface ThemeResponse {
    theme: Theme;
}

const themes: Theme[] = [
    { primary: "#ff6b6b", secondary: "#ffe66d", font: "Roboto" },
    { primary: "#4ecdc4", secondary: "#1a535c", font: "Montserrat" },
    { primary: "#f7fff7", secondary: "#2b2d42", font: "Lato" }
];

router.get("/", (_req: Request, res: Response<ThemeResponse>) => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    res.json({ theme: randomTheme });
});

export default router;
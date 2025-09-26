import { Router, Request, Response } from "express";

const router = Router();

interface TextResponse {
    paragraphs: string[];
}

router.get("/", async (_req: Request, res: Response<TextResponse | { error: string }>) => {
    try {
        const response = await fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=3");
        const data = await response.json() as unknown as string[];
        res.json({ paragraphs: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fehler beim Abrufen der Texte" });
    }
});

export default router;

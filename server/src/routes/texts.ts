import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (_req: Request, res: Response<{ text: string } | { error: string }>) => {
    try {
        const response = await fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1");
        const data = (await response.json()) as string[];
        res.json({ text: data[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch text" });
    }
});

export default router;
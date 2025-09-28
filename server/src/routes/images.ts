import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response<{ url: string }>) => {
    const width = parseInt(req.query.width as string) || 600;
    const height = parseInt(req.query.height as string) || 400;

    const id = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/id/${id}/${width}/${height}`;

    res.json({ url });
});

export default router;
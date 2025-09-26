import { Router, Request, Response } from "express";

const router = Router();

interface ImagesResponse {
    images: string[];
}

router.get("/", (req: Request, res: Response<ImagesResponse>) => {
    const count: number = parseInt(req.query.count as string) || 5;
    const images = Array.from({ length: count }, () => {
        const id = Math.floor(Math.random() * 1000);
        return `https://picsum.photos/id/${id}/600/400`;
    });
    res.json({ images });
});

export default router;
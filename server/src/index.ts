import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let templates: Template[] = [
    {
        id: "templ1",
        name: "Hero + Projects",
        sectionOrder: ["hero", "projects", "about"],
        html: {
            hero: "<section class='hero'>...</section>",
            projects: "<section class='projects'>...</section>",
            about: "<section class='about'>...</section>"
        },
        metadata: { tags: ["bold", "image-heavy"] }
    }
];

interface Template {
    id: string;
    name: string;
    sectionOrder: string[];
    html: Record<string, string>;
    metadata?: {
        tags?: string[];
        [key: string]: any;
    };
}

app.get("/api/templates", (req: any, res: any) => {
    res.json({ templates });
});

app.get("/", (req: any, res: any) => {
    res.send("hello world!")
});

app.post("/api/templates", (req: any, res: any) => {
    const t: Template = req.body;
    templates.push(t);
    res.status(201).json({ template: t });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
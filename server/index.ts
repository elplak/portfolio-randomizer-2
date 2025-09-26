import express from "express";

const index = express();
const PORT = 4000;

index.get("/api/projects", (req: any, res: any): void => {
    res.json([
        { id: 1, name: "Projekt A" },
        { id: 2, name: "Projekt B" }
    ]);
});

index.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

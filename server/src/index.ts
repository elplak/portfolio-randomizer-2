import express, { Application } from "express";
import cors from "cors";

import textsRouter from "./routes/texts";
import imagesRouter from "./routes/images";
import themesRouter from "./routes/themes";

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/texts", textsRouter);
app.use("/api/images", imagesRouter);
app.use("/api/themes", themesRouter);

app.get("/", (_req, res) => {
    res.send("hello world!");
})

app.listen(PORT, () => {
    console.log(`backend is running on port ${PORT}`);
});

export default app;
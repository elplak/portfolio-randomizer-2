import request from "supertest";
import app from "../src/index";
import { describe, expect, it } from "vitest";
describe("GET /api/themes", () => {
    it("returns a theme", async () => {
        const res = await request(app).get("/api/themes");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("theme");
        expect(res.body.theme).toHaveProperty("primary");
        expect(res.body.theme).toHaveProperty("secondary");
        expect(res.body.theme).toHaveProperty("font");
    });
});

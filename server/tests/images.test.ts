import request from "supertest";
import {describe, expect, it} from "vitest";
import app from "../src/index";

describe("GET /api/images", () => {
    it("returns an image", async () => {
        const res = await request(app).get("/api/images?width=200&height=100");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("url");
        expect(res.body.url).toContain("/200/100");
    });
});

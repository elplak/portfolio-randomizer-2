import request from "supertest";
import app from "../src/index";
import {describe, expect, it} from "vitest";

describe("GET /api/texts", () => {
    it("returns lorem ipsum text", async () => {
        const res = await request(app).get("/api/texts");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("text");
        expect(typeof res.body.text).toBe("string");
    });
});
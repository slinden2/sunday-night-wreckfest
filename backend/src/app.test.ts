import app from "./app";
import supertest from "supertest";

const api = supertest(app);

describe("GET / - Server working", () => {
  it("should exist", () => {
    expect(app).toBeDefined;
  });
  it('should return "pong"', async () => {
    const res = await api.get("/ping").expect(200);
    expect(res.text).toEqual("pong");
  });
  it("should respond with 200 with /api/races", async () => {
    const res = await api.get("/api/races", () => {
      expect(res.status).toEqual(200);
    });
  });
  it("should return 404 when sending a GET to /fake-ping", async done => {
    const res = await api.get("/fake-ping");
    expect(res.status).toEqual(404);
    done();
  });
});

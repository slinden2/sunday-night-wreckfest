import app from "./app";
import supertest from "supertest";

const api = supertest(app);

describe("GET / - Server working", () => {
  it("should exist", () => {
    expect(app).toBeDefined();
  });
  it('should return "pong"', async () => {
    const res = await api.get("/ping").expect(200);
    expect(res.text).toEqual("pong");
  });
  it("should return 404 when sending a GET to /fake-ping", async done => {
    const res = await api.get("/fake-ping");
    expect(res.status).toEqual(404);
    done();
  });
});

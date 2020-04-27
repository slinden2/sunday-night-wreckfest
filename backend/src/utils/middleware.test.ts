import express from "express";
// import supertest from "supertest";
// import app from "../app";
import middleware from "./middleware";

// const api = supertest(app);

describe("middleware", () => {
  describe("requestLogger", () => {
    it("calls next", () => {
      const fakeNext = jest.fn();

      middleware.requestLogger(
        {} as express.Request,
        {} as express.Response,
        fakeNext
      );

      expect(fakeNext).toHaveBeenCalled();
    });
  });

  // describe("unknownEndpoint", () => {
  //   middleware.unknownEndpoint({} as express.Request, {} as express.Response);
  //   expect()
  // });
});

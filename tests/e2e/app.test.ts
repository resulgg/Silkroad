import request from "supertest";

import app from "../../src/app";

describe("app", () => {
  it("should return hi", () => {
    return request(app).get("/").expect({ message: "hi" });
  });
});

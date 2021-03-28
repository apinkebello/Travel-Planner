import "regenerator-runtime/runtime";
const app = require("../src/server/index"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
import "regenerator-runtime/runtime";

it("gets the getData endpoint", async (done) => {
  // Sends GET Request to /test endpoint
  const res = await request.get("/getData");

  // ...
  done();
});

it("gets the getData endpoint", async (done) => {
  const response = await request.get("/getData");

  expect(response.status).toBe(200);
  expect(response.body).toEqual({});
  done();
});

it("posts to the postData endpoint", async (done) => {
  const response = await request.post("/addData");

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ success: true });
  done();
});

const request = require("supertest");

const app = require("../../../app");
const User = require("../../../models/userModel");
const { setUp } = require("../../db");

setUp();

test("Login with a valid user", async () => {
  //Create dummy user before testing
  const data = {
    email: "test@example.com",
    password: "Nguyen2652001!",
    name: "Jonathan Doe",
    jobTitle: "Backend Developer",
  };
  await User.create(data);

  const response = await request(app)
    .post("/api/v1/users/login")
    .send(data)
    .expect(200);

  // Test if there is a jwt cookie
  expect(
    response.headers["set-cookie"].some((cookieString) =>
      cookieString.startsWith("jwt")
    )
  ).toBe(true);

  // Test if there is token in the response body
  expect(response.body.data.token).not.toBeNull();
});

test("Login with an invalid user", async () => {
  const data = {
    email: "test@example.com",
    password: "Nguyen2652001!",
  };
  await request(app).post("/api/v1/users/login").send(data).expect(400);
});

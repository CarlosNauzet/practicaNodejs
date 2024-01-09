const app = require("../../app");
const request = require("supertest");
describe("Products endpoint", () => {
  test("Shall return all products listed", async () => {
    const { body } = await request(app).get("/api/v1/productos").expect(200);
    console.log(body);
    expect(body[0]).toEqual({
      __v: expect.any(Number),
      _id: expect.any(String),
      foto: expect.any(String),
      nombre: expect.any(String),
      precio: expect.any(Number),
      seVende: expect.any(Boolean),
      tags: expect.any(Array),
    });
  });
});

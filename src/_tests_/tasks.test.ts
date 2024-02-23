const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/tasks", () => {
  it("should return all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/tasks/:id", () => {
  it("should return a task", async () => {
    const res = await request(app).get("/api/tasks/65d4fef48b79586259ef2cb6");
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Task #3");
  });
});

describe("POST /api/tasks", () => {
  it("should create a product", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Task #4",
      description: "Complete exercises on topic",
      course: "React Basic",
      instructor: "John Smith",
      deadline: "2024-03-18",
      rating: 4.6,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.rating).toBe(4.6);
  });
});

describe("PUT /api/tasks/:id", () => {
  it("should update a task", async () => {
    const res = await request(app)
      .put("/api/tasks/65d8957d816fb040afc8aba6")
      .send({
        title: "Updated Task #4",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Task #4");
  });
});

describe("DELETE /api/tasks/:id", () => {
  it("should delete a task", async () => {
    const res = await request(app).delete(
      "/api/tasks/65d894f4a7938b662bbe6849"
    );
    expect(res.statusCode).toBe(200);
  });
});

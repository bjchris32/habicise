// npm test -- test/controllers/habits.test.ts
// import { createHabit, getHabit, updateHabit, deleteHabit } from "../../src/controllers/habits";
import { createHabit, getHabit } from "../../src/controllers/habits";
import { dbConnect, dbDisconnect } from "../utils/dbHandler"
import express, { Express, Request, Response } from "express";
import request from 'supertest';
import { Habit } from "../../src/models/habit";

const app = express();
app.use(express.json());
app.post('/habits', createHabit);
app.get('/habits/:id', getHabit);
// app.put('/habits/:id', updateHabit);
// app.delete('/habits/:id', deleteHabit);

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Habits functions", () => {
  it("should create a habit document", async () => {
    const response = await request(app)
      .post('/habits')
      .send({ name: 'Habit 2' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Habit 2');
  });

  it("should read a habit document", async () => {
    const habit = new Habit({ name: 'Habit 3' });
    const savedHabit = await habit.save();
    const response = await request(app).get(`/habits/${savedHabit._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Habit 3');
  });

  it("should update a habit document", () => {
  });

  it("should delete a habit document", () => {
  });
});

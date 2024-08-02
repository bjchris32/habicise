// npm test -- test/controllers/habits.test.ts
// import { createHabit, getHabit, updateHabit, deleteHabit } from "../../src/controllers/habits";
import { createHabit, getHabit } from "../../src/controllers/habits";
import { dbConnect, dbDisconnect } from "../utils/dbHandler"
import express, { Express, Request, Response } from "express";
import router from '../../src/config/routes';
import request from 'supertest';
import { Habit } from "../../src/models/habit";

// TODO: put into test util to set up routes
const app = express();
app.use(express.json());
app.use('/api', router);

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Habits functions", () => {
  it("should create a habit document", async () => {
    const response = await request(app)
      .post('/api/habits')
      .send({ name: 'Habit 2' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Habit 2');
  });

  it("should read a habit document", async () => {
    const habit = new Habit({ name: 'Habit 3' });
    const savedHabit = await habit.save();
    const response = await request(app).get(`/api/habits/${savedHabit._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Habit 3');
  });

  it("should update a habit document", async () => {
    const habit = new Habit({ name: 'Habit 3' });
    const savedHabit = await habit.save();
    const response = await request(app)
      .put(`/api/habits/${savedHabit._id}`)
      .send({ name: 'Habit not your business' });;
    expect(response.status).toBe(200);
    expect(response.body.name).toBe ('Habit not your business');
  });

  it("should delete a habit document", () => {
  });
});

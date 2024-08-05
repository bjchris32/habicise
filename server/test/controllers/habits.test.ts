// npm test -- test/controllers/habits.test.ts
import { dbConnect, dbDisconnect } from "../utils/dbHandler"
import express, { Express, Request, Response } from "express";
import router from '../../src/config/routes';
import request from 'supertest';
import { Habit } from "../../src/models/habit";

// TODO: put into test util to set up routes
const app = express();
app.use(express.json());
app.use('/api', router);

beforeEach(async () => {
  await dbConnect();
});

afterEach(async () => {
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

  it("should list habit documents", async () => {
    const habit1 = new Habit({ name: 'Habit 7' });
    const savedHabit1 = await habit1.save();
    const habit2 = new Habit({ name: 'Habit 8' });
    const savedHabit2 = await habit2.save();
    const response = await request(app).get(`/api/habits/`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('Habit 7');
    expect(response.body[1].name).toBe('Habit 8');
  });

  it("should update a habit document", async () => {
    const habit = new Habit({ name: 'Habit 3' });
    const savedHabit = await habit.save();
    const response = await request(app)
      .put(`/api/habits/${savedHabit._id}`)
      .send({ name: 'Habit not your business' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe ('Habit not your business');
  });

  it("should delete a habit document", async () => {
    const habit = new Habit({ name: 'Habit to be removed' });
    const savedHabit = await habit.save();
    const response = await request(app)
      .delete(`/api/habits/${savedHabit._id}`)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe ('Habit deleted successfully');
  });
});

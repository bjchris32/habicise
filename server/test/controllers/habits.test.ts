// npm test -- test/controllers/habits.test.ts
import { authSetup } from '../utils/authSetup'
import { setupDB } from "../utils/dbHandler"
import app from '../utils/routesSetup'
import request from 'supertest';
import { Habit } from "../../src/models/habit";
import { User } from "../../src/models/user";

setupDB();

let user: any;
beforeEach(async () => {
  user = new User({
    name: 'First User',
    email: 'first@gmail.com',
    password: 'test123'
  });
  const savedUser = await user.save();
  authSetup(savedUser);
});

describe("Habits functions", () => {
  it("should create a habit document", async () => {
    const response = await request(app)
      .post('/api/habits')
      .send({ name: 'Habit 2' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Habit 2');
    expect(response.body.user).toBe(user.id);
  });

  it("should read a habit document", async () => {
    const habit = new Habit({ name: 'Habit 3', user: user.id });
    const savedHabit = await habit.save();
    const response = await request(app).get(`/api/habits/${savedHabit._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Habit 3');
  });

  it("should list habit documents", async () => {
    const habit1 = new Habit({ name: 'Habit 7', user: user.id });
    const savedHabit1 = await habit1.save();
    const habit2 = new Habit({ name: 'Habit 8', user: user.id });
    const savedHabit2 = await habit2.save();
    const response = await request(app).get(`/api/habits/`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(savedHabit1.name);
    expect(response.body[1].name).toBe(savedHabit2.name);
  });

  it("should update a habit document", async () => {
    const habit = new Habit({ name: 'Habit 3', user: user.id });
    const savedHabit = await habit.save();
    const response = await request(app)
      .put(`/api/habits/${savedHabit._id}`)
      .send({ name: 'Habit not your business' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe ('Habit not your business');
  });

  it("should delete a habit document", async () => {
    const habit = new Habit({ name: 'Habit to be removed', user: user.id });
    const savedHabit = await habit.save();
    const response = await request(app)
      .delete(`/api/habits/${savedHabit._id}`)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe ('Habit deleted successfully');
  });
});

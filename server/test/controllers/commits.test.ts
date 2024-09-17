// npm test -- test/controllers/habits.test.ts
import { dbConnect, dbDisconnect } from "../utils/dbHandler"
import express, { Express, Request, Response } from "express";
import router from '../../src/config/routes';
import request from 'supertest';
import { Habit, IHabit } from "../../src/models/habit";
import { Commit } from "../../src/models/commit";
import { Document, Types } from "mongoose";
import { authenticate } from "../../src/middlewares/auth.middleware";

// TODO: put into test util to set up routes
const app = express();
app.use(express.json());
app.use('/api', router);

// Mock the auth middlewares
jest.mock('./../../src/middlewares/auth.middleware', () => ({
  authenticate: jest.fn(),
}));

const mockAuthenticate = authenticate as jest.Mock;
mockAuthenticate.mockImplementation(async (req, res, next) => {
  next(); // Call `next` to simulate successful authentication
});

beforeEach(async () => {
  await dbConnect();
});

afterEach(async () => {
  await dbDisconnect();
});

describe("Habits functions", () => {
  // TODO: figure out why we can not use IHabit as type
  let habit: any;

  beforeEach(async () => {
    habit = new Habit({
      name: 'First Habit'
    });
    await habit.save();
  });

  it("should create a commit document", async () => {
    const response = await request(app)
      .post('/api/commits')
      .send({ description: 'commit to habit', length: 5, habit: habit._id });
    expect(response.status).toBe(201);
    expect(response.body?.description).toBe('commit to habit');
    expect(response.body?.length).toBe(5);
    expect(response.body?.habit.toString()).toEqual(habit._id.toString());

    // TODO: check habit has the newly created commit
  });

  it("should read a commit document", async () => {
    const commit = new Commit({ description: 'commit to habit', length: 5, habit: habit._id });
    const savedCommit = await commit.save();
    const response = await request(app).get(`/api/commits/${savedCommit._id}`);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('commit to habit');
  });

  it("should list commit documents", async () => {
    const commit1 = new Commit({ description: 'commit to habit 1', length: 5, habit: habit._id });
    const savedCommit1 = await commit1.save();
    const commit2 = new Commit({ description: 'commit to habit 2', length: 5, habit: habit._id });
    const savedCommit2 = await commit2.save();

    const response = await request(app).get(`/api/habit/${habit._id}/commits`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]?.description).toBe(savedCommit1.description);
    expect(response.body[1]?.description).toBe(savedCommit2.description);
  });

  it("should list commit documents by date", async () => {
    const commitsInputDate = [
      { description: 'Commit 1', habit: habit._id, createdAt: new Date('2024-09-01T10:00:00Z') },
      { description: 'Commit 2', habit: habit._id, createdAt: new Date('2024-09-01T15:30:00Z') },
      { description: 'Commit 3', habit: habit._id, createdAt: new Date('2024-09-02T11:00:00Z') },
      { description: 'Commit 4', habit: habit._id, createdAt: new Date('2024-09-03T08:00:00Z') },
    ];

    await Commit.insertMany(commitsInputDate);
    const response = await request(app).get(`/api/habit/${habit._id}/commitsByDate`);

    const expected = [
      { _id: '2024-09-01', count: 2 },
      { _id: '2024-09-02', count: 1 },
      { _id: '2024-09-03', count: 1 },
    ];

    expect(response.body).toEqual(expected);
  });

  it("should update a commit document", async () => {
    const commit = new Commit({ description: 'commit to habit 1', length: 5, habit: habit._id });
    const savedCommit = await commit.save();
    const response = await request(app)
      .put(`/api/commits/${savedCommit._id}`)
      .send({ description: 'Commit not your business' });
    expect(response.status).toBe(200);
    expect(response.body.description).toBe ('Commit not your business');
  });

  it("should delete a commit document", async () => {
    const commit = new Commit({ description: 'commit to habit 1', length: 5, habit: habit._id });
    const savedCommit = await commit.save();
    const response = await request(app)
      .delete(`/api/commits/${savedCommit._id}`)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe ('Commit deleted successfully');

    // TODO: check commit is deleted in habit
  });
});

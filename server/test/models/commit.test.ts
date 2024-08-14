import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Habit } from "../../src/models/habit";
import { ICommit, Commit } from "../../src/models/commit";
import { dbConnect, dbDisconnect } from "../utils/dbHandler"

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe('Commit model test', () => {
  it('should create & save commit with habit successfully', async () => {
    const habit = new Habit({ name: 'Parent 1' });
    const savedHabit = await habit.save();

    const commit1 = new Commit({ description: 'commit 1 description', habit: habit._id });
    const commit2 = new Commit({ description: 'commit 2 description', habit: habit._id });
    const savedCommit1 = await commit1.save();
    const savedCommit2 = await commit2.save();
    savedHabit.commits.push(savedCommit1._id, savedCommit2._id);
    await savedHabit.save();

    const finalHabit =  await Habit.findById(habit._id).populate<{ commits: ICommit[] }>('commits').exec();
    expect(finalHabit).not.toBeNull();
    expect(finalHabit?.commits.length).toBe(2);
    expect(finalHabit?.commits[0].description).toBe('commit 1 description');
    expect(finalHabit?.commits[1].description).toBe('commit 2 description');
  });
});

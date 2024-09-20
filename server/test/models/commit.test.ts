import mongoose from 'mongoose';
import { User } from "../../src/models/user";
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
    const user = new User({
      name: 'First User',
      email: 'first@gmail.com',
      password: 'test123'
    });
    const savedUser = await user.save();

    const habit = new Habit({ name: 'Parent 1', user: savedUser.id });
    const savedHabit = await habit.save();

    const commit1 = new Commit({ description: 'commit 1 description', habit: habit._id });
    const commit2 = new Commit({ description: 'commit 2 description', habit: habit._id });
    const savedCommit1 = await commit1.save();
    const savedCommit2 = await commit2.save();
    savedHabit.commits.push(savedCommit1._id, savedCommit2._id);
    await savedHabit.save();

    const finalHabit =  await Habit.findById(habit._id).populate<{ commits: ICommit[] }>('commits')
    expect(finalHabit).not.toBeNull();
    expect(finalHabit?.commits.length).toBe(2);
    expect(finalHabit?.commits[0].description).toBe('commit 1 description');
    expect(finalHabit?.commits[1].description).toBe('commit 2 description');
  });

  it('should not create & save commit without habit', async () => {
    const commit1 = new Commit({ description: 'commit 1 description' });

    let err: any;
    try {
      const savedCommitWithoutParent = await commit1.save();

      err = savedCommitWithoutParent;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors).toBeDefined();
  });
});

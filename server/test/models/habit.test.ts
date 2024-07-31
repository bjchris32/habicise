import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Habit } from "../../src/models/habit";


let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Habit model test', () => {
  it('should create & save habit successfully', async () => {
    const habitData = { name: 'Habit 1' };
    const habit = new Habit(habitData);
    const savedHabit = await habit.save();

    expect(savedHabit._id).toBeDefined();
    expect(savedHabit.name).toBe(habitData.name);
  });

  it('should not create habit without required field', async () => {
    const habitWithoutRequiredField = new Habit({ some_field_not_exist: 123 });
    let err: any;
    try {
      const savedHabitWithoutRequiredField = await habitWithoutRequiredField.save();
      err = savedHabitWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });
});

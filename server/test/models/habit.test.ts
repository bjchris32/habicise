import mongoose from 'mongoose';
import { Habit } from "../../src/models/habit";
import { dbConnect, dbDisconnect } from "../utils/dbHandler"

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe('Habit model test', () => {
  it('should create & save habit successfully without commits', async () => {
    const habitData = { name: 'Habit 1' };
    const habit = new Habit(habitData);
    const savedHabit = await habit.save();

    expect(savedHabit._id).toBeDefined();
    expect(savedHabit.name).toBe(habitData.name);
    expect(savedHabit?.commits).toEqual([]);
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

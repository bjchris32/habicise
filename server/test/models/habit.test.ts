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

//   it('should not create user with invalid field', async () => {
//     const userWithInvalidField = new User({ name: 'John Doe', email: 'john@example.com', nickname: 'Johnny' });
//     let err;
//     try {
//       const savedUserWithInvalidField = await userWithInvalidField.save();
//       err = savedUserWithInvalidField;
//     } catch (error) {
//       err = error;
//     }
//     expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
//     expect(err.errors.nickname).toBeUndefined();
//   });

//   it('should not create user without required field', async () => {
//     const userWithoutRequiredField = new User({ name: 'John Doe' });
//     let err;
//     try {
//       const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
//       err = savedUserWithoutRequiredField;
//     } catch (error) {
//       err = error;
//     }
//     expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
//     expect(err.errors.email).toBeDefined();
//   });
});

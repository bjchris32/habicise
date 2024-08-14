import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IHabit {
  name: string;
  commits: Types.ObjectId[];
}

// 2. Create a Schema corresponding to the document interface.
const habitSchema = new Schema<IHabit>({
  name: { type: String, required: [true, 'habit name required'] },
  commits: [{ type: Schema.Types.ObjectId, ref: 'Commit' }]
}, { timestamps: true });

// 3. Create a Model.
export const Habit = model<IHabit>('Habit', habitSchema);


// test with ts-node
// import {Habit, IHabit} from './src/models/habit'
// import { HydratedDocument } from 'mongoose';
// import mongoose from 'mongoose';

// const habit: HydratedDocument<IHabit> = new Habit({name: 'sleep early'});
// mongoose.connect('mongodb://localhost:27017/mydatabase').then(() => {
//   console.log('Connected to MongoDB');
//   return habit.save();
// }).then((saveHabit) => {
//   console.log(saveHabit)
//   mongoose.disconnect();
// })

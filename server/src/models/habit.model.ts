import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IHabbit {
  name: string;
}

// 2. Create a Schema corresponding to the document interface.
const habitSchema = new Schema<IHabbit>({
  name: { type: String, required: true },
});

// 3. Create a Model.
const Habit = model<IHabbit>('Habit', habitSchema);
export default Habit;

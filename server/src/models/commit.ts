import { Schema, model, Types } from 'mongoose';

export interface ICommit {
  description: string;
  length: number;
  habit: Types.ObjectId;
}

const commitSchema = new Schema<ICommit>({
  description: { type: String, required: [true, 'description required'] },
  length: { type: Number },
  habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: [true, 'habit required'] }
}, { timestamps: true });

export const Commit = model<ICommit>('Commit', commitSchema);

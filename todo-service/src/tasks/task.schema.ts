import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  completed: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: { type: Number, default: Date.now },
});

export const TodoModel = mongoose.models.todos || mongoose.model('todos', todoSchema);

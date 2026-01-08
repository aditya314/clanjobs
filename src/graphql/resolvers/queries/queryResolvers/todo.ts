import { TodoModel } from '@src/mongoDb/daoModels/todo';
import { ObjectId } from 'mongodb';

const TodoResolver = async (_: any, { todoId }, { session }) => {
  if (!session) {
    throw new Error('Unauthenticated user');
  } else {
    console.log('Passed!! Session is : ', JSON.stringify(session));
  }
  const todo = await TodoModel.findOne({
    _id: ObjectId.createFromHexString(todoId),
  });
  return {
    todoId: todo._id.toHexString(),
    completed: todo.completed,
    description: todo.description,
  };
};

export default TodoResolver;

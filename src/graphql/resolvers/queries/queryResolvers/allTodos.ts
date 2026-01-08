import { TodoModel } from '@src/mongoDb/daoModels/todo';

const allTodosResolver = async (_, __, { cachedConnection }) => {
  let todoList = await TodoModel.find();
  return todoList.map(todo => {
    return {
      todoId: todo._id.toHexString(),
      completed: todo.completed,
      description: todo.description,
    };
  });
};

export default allTodosResolver;

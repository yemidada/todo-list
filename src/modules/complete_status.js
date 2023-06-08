import { storageData } from './store_locally.js';

export const updateCompleteStatus = (todoList, completed, position) => {
  const index = todoList.findIndex(
    (item) => item.position === parseInt(position, 10),
  );
  if (index !== -1) {
    todoList[index].completed = completed;
  }
  storageData(todoList);
};

export const deleteAllCompleted = (todoList) => {
  const result = todoList.filter((res) => res.completed);
  result.forEach((element) => {
    const index = todoList.findIndex(
      (item) => item.position === parseInt(element.position, 10),
    );
    todoList.splice(index, 1);
  });
  storageData(todoList);
};

export const storageData = (items) => {
  localStorage.setItem('storages', JSON.stringify(items));
};
export const loadData = () => {
  const storedTodo = localStorage.getItem('storages');
  if (storedTodo) {
    return JSON.parse(storedTodo);
  }
  return [];
};

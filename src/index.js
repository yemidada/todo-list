import './style.css';
import todoList from './modules/todo.js';

const divList = window.document.getElementById('todo_list');

const onLoad = () => {
  for (let i = 0; i < todoList.length; i += 1) {
    if (divList) {
      let html = '';
      const todo = todoList[i];
      html += '<li class="my_list">';
      html += `<span><input type="checkbox" value /> ${todo.description}</span>`;
      html += '<span class="dragger"><i class="fa-solid fa-ellipsis-vertical"></i></span>';
      html += '</li>';
      divList.innerHTML += html;
    }
  }
};
document.addEventListener('DOMContentLoaded', () => {
  onLoad();
}, false);

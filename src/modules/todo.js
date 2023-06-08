import {
  divList,
  description,
  todobutton,
} from './dom.js';

import {
  storageData,
  loadData,
} from './store_locally.js';

import {
  updateCompleteStatus,
  deleteAllCompleted,
} from './complete_status.js';

import onRefresh from './refresh.js';

class TodoList {
  constructor() {
    this.selected_item = null;
    this.newListBook = {};
    this.todo_list = loadData();
    this.list();
  }

  list() {
    divList.innerHTML = '';
    for (let i = 0; i < this.todo_list.length; i += 1) {
      if (divList) {
        let html = '';
        const todo = this.todo_list[i];
        html += '<li class="my_list">';
        html += `<div class="content">
        <span class="checkbox" ><input class="check_status" ${todo.completed ? 'checked' : ''} data-position="${todo.position}" type="checkbox" /></span>
                  <span ${todo.completed ? ' class="info line_thr"' : 'class="info"'} >${todo.description}</span>
                  <input class="edit_description" data-position="${todo.position}" value="${todo.description}" />
                </div>`;
        html += `<div class="delete_todo" >
        <span class="cursor_pointer delete_icon" data-position="${todo.position}"><i class="fa-regular fa-trash-can"></i></span>
                    <span class="cursor_drag" ><i class="fa-solid fa-ellipsis-vertical"></i></span>
                 </div>`;
        html += '</li>';
        divList.innerHTML += html;
      }
    }
  }

  edit(description, position) {
    const index = this.todo_list.findIndex(
      (item) => item.position === parseInt(position, 10),
    );
    if (index !== -1) {
      this.todo_list[index].description = description;
    }
    storageData(this.todo_list);
    this.list();
    this.setupEventListeners();
  }

  add(description) {
    const position = this.todo_list.length + 1;
    const newTodo = { description, position, completed: false };
    this.todo_list.push(newTodo);
    storageData(this.todo_list);
    this.list();
    this.setupEventListeners();
  }

  remove(position) {
    const index = this.todo_list.findIndex(
      (item) => item.position === parseInt(position, 10),
    );
    this.todo_list.splice(index, 1);
    storageData(this.todo_list);
    this.list();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const selectedList = document.querySelectorAll('.info');
    const deleteTodo = document.querySelectorAll('.delete_icon');
    const editDescription = document.querySelectorAll('.edit_description');
    const checkStatus = document.querySelectorAll('.check_status');
    const button = document.querySelector('.clear-button');

    onRefresh();

    description.addEventListener('input', () => {
      if (description.value) {
        todobutton.classList.add('show');
      } else {
        todobutton.classList.remove('show');
      }
    });
    todobutton.addEventListener('click', () => {
      if (description.value) {
        this.add(description.value);
        description.value = '';
        todobutton.classList.remove('show');
      }
    });

    description.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if (description.value) {
          this.add(description.value);
        }
        description.value = '';
        todobutton.classList.remove('show');
      }
    });

    deleteTodo.forEach((el) => el.addEventListener('click', (event) => {
      this.remove(event.target.dataset.position);
    }));

    editDescription.forEach((el) => el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if (event.target.value) {
          this.edit(event.target.value, event.target.dataset.position);
        }
      }
    }));

    selectedList.forEach((el) => {
      el.addEventListener('click', (event) => {
        selectedList.forEach((el) => {
          el.parentNode.parentNode.classList.remove('active');
          el.classList.remove('hide');
          el.nextElementSibling.classList.remove('show');
          el.parentNode.parentNode.children[1].children[0].classList.remove('show');
          el.parentNode.parentNode.children[1].children[1].classList.remove('hide');
        });
        event.target.classList.add('hide');
        event.target.nextElementSibling.classList.add('show');
        event.target.parentNode.parentNode.classList.add('active');
        event.target.parentNode.parentNode.children[1].children[0].classList.add('show');
        event.target.parentNode.parentNode.children[1].children[1].classList.add('hide');
      });
    });

    for (let i = 0; i < checkStatus.length; i += 1) {
      checkStatus[i].addEventListener('change', (event) => {
        updateCompleteStatus(this.todo_list, checkStatus[i].checked, event.target.dataset.position);
        const desc = checkStatus[i].parentNode.parentNode.children[1];
        if (checkStatus[i].checked) {
          desc.classList.add('line_thr');
          checkStatus[i].setAttribute('checked', 'checked');
        } else {
          desc.classList.remove('line_thr');
          checkStatus[i].removeAttribute('checked');
        }
        this.list();
        this.setupEventListeners();
      });
    }

    button.addEventListener('click', (e) => {
      e.preventDefault();
      deleteAllCompleted(this.todo_list);
      this.list();
      this.setupEventListeners();
    });
  }
}

export default TodoList;

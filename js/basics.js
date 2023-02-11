const list = [];
let aPintarList = list;

const listFromStorage = window.localStorage.getItem('todo-list');
if(listFromStorage != undefined) {
    aPintarList = JSON.parse(listFromStorage);
}

const addButton = document.querySelector('#addButton');
const textInput = document.querySelector('#textInput');
const todoContainer = document.querySelector('#todoContainer');

const pintarTodo = function (aPintarList) {
    window.localStorage.setItem('todo-list', JSON.stringify(list));
    todoContainer.innerHTML = '';
    let checked = '';
    aPintarList.forEach((item) => {
        if(item.status === 'completed') {
            checked = 'checked';
        } else {
            checked = '';
        }
        let template = `<div class="todo__item ${item.status}">
            <input class="todo__item__checkbox" type="checkbox" ${checked}>
            <label>${item.text}</label>
        </div>`;
        todoContainer.innerHTML += template;
    })
    addEvents();
}

const addEvents = function() {
    const todoItems = document.querySelectorAll('.todo__item__checkbox');
    todoItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if(list[index].status === 'ongoing') {
                list[index].status = 'completed';
            } else {
                list[index].status = 'ongoing';
            }
            pintarTodo(aPintarList);
        })
    })
}

const saveonList = function () {
    let newItem = {
        text: textInput.value,
        status: 'ongoing', //ongoing or completed
    };
    list.push(newItem);
    pintarTodo(aPintarList);
}

addButton.addEventListener('click', saveonList);

const allItems = document.querySelector('#allItems');
const activeItems = document.querySelector('#activeItems');
const completedItems = document.querySelector('#completedItems');

allItems.addEventListener('click', function () {
    allItems.classList.add('active');
    activeItems.classList.remove('active');
    completedItems.classList.remove('active');
    aPintarList = list;
    pintarTodo(aPintarList);
})
activeItems.addEventListener('click', function () {
    allItems.classList.remove('active');
    activeItems.classList.add('active');
    completedItems.classList.remove('active');
    const activeTasks = list.filter((elem) => elem.status == 'ongoing');
    aPintarList = activeTasks;
    pintarTodo(aPintarList);
})
completedItems.addEventListener('click', function () {
    allItems.classList.remove('active');
    activeItems.classList.remove('active');
    completedItems.classList.add('active');
    const completedTasks = list.filter((elem) => elem.status == 'completed');
    aPintarList = completedTasks;
    pintarTodo(aPintarList);
})

pintarTodo(aPintarList);

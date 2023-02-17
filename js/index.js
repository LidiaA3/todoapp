let list = [];
let aPintarList = list;

const listFromStorage = window.localStorage.getItem('todo-list');
if (listFromStorage != undefined) {
    list = JSON.parse(listFromStorage);
    aPintarList = [...list];
}

// Descomentar para limpiar lista en storage
//list = [];

const addButton = document.querySelector('#addButton');
const textInput = document.querySelector('#textInput');
const todoContainer = document.querySelector('#todoContainer');

addButton.addEventListener('click', saveonList);

const allItems = document.querySelector('#allItems');
const activeItems = document.querySelector('#activeItems');
const completedItems = document.querySelector('#completedItems');

allItems.addEventListener('click', () => {
    allItems.classList.add('active');
    activeItems.classList.remove('active');
    completedItems.classList.remove('active');
    aPintarList = [...list];
    pintarTodo(aPintarList);
})
activeItems.addEventListener('click', () => {
    allItems.classList.remove('active');
    activeItems.classList.add('active');
    completedItems.classList.remove('active');
    const activeTasks = list.filter((elem) => elem.status == 'ongoing');
    aPintarList = activeTasks;
    pintarTodo(aPintarList);
})
completedItems.addEventListener('click', () => {
    allItems.classList.remove('active');
    activeItems.classList.remove('active');
    completedItems.classList.add('active');
    const completedTasks = list.filter((elem) => elem.status == 'completed');
    aPintarList = completedTasks;
    pintarTodo(aPintarList);
})

pintarTodo(aPintarList);

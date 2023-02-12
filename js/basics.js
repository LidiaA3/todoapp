const list = [];
let aPintarList = list;

const listFromStorage = window.localStorage.getItem('todo-list');
if (listFromStorage != undefined) {
    aPintarList = JSON.parse(listFromStorage);
}

const addButton = document.querySelector('#addButton');
const textInput = document.querySelector('#textInput');
const todoContainer = document.querySelector('#todoContainer');

// nunca nunca nunca llames a un parametro igual que una variable global
// Aqui puedes acceder a aPintarList, pensando que es la lista que tienes arriba, pero siempre
// va a ser la que estás pasando.
const pintarTodo = function (aPintarList) {
    window.localStorage.setItem('todo-list', JSON.stringify(list));
    todoContainer.innerHTML = '';
    /* esto deberías meterlo en el bucle,
     ya que teniendolo global te "salvas" por que haces
     la asignacion tanto en el if como en el else,
     pero sigues manteniendo el estado de la anterior
     iteración del bucle
    */
    // let checked = '';
    aPintarList.forEach((item) => {
        // si lo metes aqui dentro, ya no te hace falta el else
        let checked = '';
        if(item.status === 'completed') {
            checked = 'checked';
        } else {
            checked = '';
        }
        // Podrias sacarte esto a una función para tener la generación
        // del template más separadita y que no te moleste al leer esta 
        // función
        // let template = `<div class="todo__item ${item.status}">
        //     <input class="todo__item__checkbox" type="checkbox" ${checked}>
        //     <label>${item.text}</label>
        // </div>`;
        const template = getItemTemplate(item);
        todoContainer.innerHTML += template;
    })
    addEvents();
}

const getItemTemplate = (item, checked) => {
    // Si usas BEM seria mas bien todo-item (bloque) y luego el hijo todo-item__checkbox
    return `<div class="todo__item ${item.status}">
        <input class="todo__item__checkbox" type="checkbox" ${checked}>
        <label>${item.text}</label>
    </div>`;
}

const addEvents = function() {
    const todoItems = document.querySelectorAll('.todo__item__checkbox');
    // genial esto 👌🏻
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

// Esto me lo llevaría a un archivo distinto, tener uno con las funciones
// y otro con lo que va a ejecutar
addButton.addEventListener('click', saveonList);

const allItems = document.querySelector('#allItems');
const activeItems = document.querySelector('#activeItems');
const completedItems = document.querySelector('#completedItems');

// Estas tres funciones son muy similares, seguramente puedas sacarte
// al menos la modificacion de clases a una función parametrizable
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

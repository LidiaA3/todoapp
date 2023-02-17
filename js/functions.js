const pintarTodo = (aPintarListParam) => {
    window.localStorage.setItem('todo-list', JSON.stringify(list));
    todoContainer.innerHTML = '';
    aPintarListParam.forEach((item) => {
        let checked = '';
        if (item.status === 'completed') {
            checked = 'checked';
        }
        const template = getItemTemplate(item, checked);
        todoContainer.innerHTML += template;
    })
    addEvents();
}

const getItemTemplate = (item, checked) => {
    return `<div class="todo-item ${item.status}">
        <input class="todo-item__checkbox" type="checkbox" ${checked}>
        <label>${item.text}</label>
    </div>`;
}

const addEvents = () => {
    const todoItems = document.querySelectorAll('.todo-item__checkbox');
    todoItems.forEach ((item, index) => {
        item.addEventListener('click', function() {
            if (aPintarList[index].status === 'ongoing') {
                aPintarList[index].status = 'completed';
            } else {
                aPintarList[index].status = 'ongoing';
            }
            pintarTodo(aPintarList);
        })
    })
}

const saveonList = () => {
    let newItem = {
        text: textInput.value,
        status: 'ongoing', //ongoing or completed
    };
    aPintarList.push(newItem);
    list.push(newItem);
    pintarTodo(aPintarList);
}
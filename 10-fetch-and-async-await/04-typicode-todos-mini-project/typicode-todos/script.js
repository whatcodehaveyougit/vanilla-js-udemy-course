const api = 'https://jsonplaceholder.typicode.com/todos'
const form = document.getElementById('todo-form')
const input = document.getElementById('title')
const toDoList = document.querySelector('#todo-list')
// fetch(api).then(res => console.log(res.json()))
console.log('helo')

const getToDos = () => {
    fetch(api + "?_limit=5")
    .then((res) =>res.json())
    .then((data) => data.forEach((item) => {
        console.log(item)
        addItemToDom(item)
    }))
}

function addItemToDom(toDo){
    const div = document.createElement('div');
    div.classList = "to-do"
    div.appendChild(document.createTextNode(toDo.title));
    div.setAttribute('data-id', toDo.id);
    if(toDo.completed){
        div.classList.add('done')
    }
    document.getElementById('todo-list').appendChild(div)
}

function addToDo(todo){
    addItemToDom(todo)
}

function createTodo(e){
    e.preventDefault();
    const todo = {
        title: e.target.firstElementChild.value,
        completed: true
    }
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then(data => addItemToDom(data))
    input.value = ''
}

function toDoListClick(e){
    console.log(e.target.dataset.id)
    if(e.target.classList.contains('to-do')){
        // Toggle = amazing little function!!!!!
        const isCompleted =  e.target.classList.contains('done')
        e.target.classList.toggle('done')
        const id = e.target.dataset.id;
        updateToDo(id, !isCompleted)
    }
}

function updateToDo(id, completed){
    console.log('single ')

    // Run Put request to mark toDo as completed, will need the ID. 
    // Look at documentation on how to do this

    // Strange that we do not need 'posts' in the url as that is what is on the documentation
    fetch(api + `/${id}`, {
        method: "PUT",
        body: JSON.stringify({completed}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function deleteToDo(e){
    fetch(api + `/posts${e.target.dataset.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => console.log(res.status))

}

function toDoListDoubleClick(e){
    console.log('double ')
    e.preventDefault();
    if(e.target.classList.contains('to-do')){
        deleteToDo(e)
    }
}


function init(){
    getToDos()
    document.addEventListener('DOMContentLoaded', init);
    form.addEventListener('submit', createTodo);
    toDoList.addEventListener('click', updateToDo)
    // Not working
    // toDoList.addEventListener('dblclick', toDoListDoubleClick)
}

init()

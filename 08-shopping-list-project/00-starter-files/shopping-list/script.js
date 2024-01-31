const toDoInput = document.getElementById('item-input')
const toDoList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const toDoForm = document.getElementById('item-form')
const filterInput = document.getElementById('filter')

toDoForm.addEventListener('submit', createToDo)
toDoList.addEventListener('click', toDoClicked)
clearBtn.addEventListener('click', clearToDos)
filterInput.addEventListener('keydown', filterToDos)

function filterToDos(){
    console.log(toDoList.children)
    const children = Array.from(toDoList.children)
    console.log(filterInput)
    children.forEach(item => {
        if (item.innerText.toLowerCase().includes(filterInput.value.toLowerCase())){
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    })
}

function clearToDos(){
    toDoList.innerHTML = '';
    localStorage.setItem('todos', '[]')
}

function toDoClicked(e){
    e.preventDefault();
    const parentElement = e.target.parentElement
    if(parentElement.className.includes('remove-item')){
        removeItemFromDom(e)
        removeItemFromLocalStorage(e)
    } else {
        console.log('yo man')
        // 
    }
}

function removeItemFromDom(e){
    e.target.parentElement.parentElement.remove()
}

function removeItemFromLocalStorage(e){
    const todo =  e.target.parentElement.parentElement.innerText
    const itemsFromStorage = JSON.parse(localStorage.getItem('todos'))
    const updatedItems = itemsFromStorage.filter(item => item != todo)
    localStorage.setItem('todos', JSON.stringify(updatedItems))
}

function addItemToDom(todo){
    let li = document.createElement('li');
    li.innerHTML = todo;
    const btn = document.createElement('button');
    btn.classList = 'remove-item btn-link text-red'
    const icon = document.createElement('icon')
    icon.classList = 'fa-solid fa-xmark'
    btn.appendChild(icon)
    li.appendChild(btn)
    toDoList.appendChild(li)
}

function addItemToLocalStorage(item){
    let itemsFromStorage;
    if(localStorage.getItem('todos') === null){
        itemsFromStorage = []
    } else {
        console.log('already here')
        itemsFromStorage = JSON.parse(localStorage.getItem('todos'))
    }
    itemsFromStorage.push(item);
    localStorage.setItem('todos', JSON.stringify(itemsFromStorage))
}

function createToDo(e){
    e.preventDefault()
    if(toDoInput.value.length === 0){
        alert('please input something')
        return;
    }
    addItemToDom(toDoInput.value)
    addItemToLocalStorage(toDoInput.value)
    toDoInput.value = ''
}

function init(){
    if(localStorage.getItem('todos') !== null){
        const itemsFromStorage = JSON.parse(localStorage.getItem('todos'))
        itemsFromStorage.forEach(item => addItemToDom(item))
    }
}

init()


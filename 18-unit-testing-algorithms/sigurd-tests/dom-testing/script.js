const addToDo = document.getElementById('add-to-do');
const input = document.getElementById('new-to-do')
const toDoList = document.getElementById('to-do-list')

// console.log(addToDo)
addToDo.addEventListener('click', () => handleAddToDo(input))

function handleAddToDo(input){
  const inputValue = input.value;
  input.value = ''
  const li = document.createElement('li');
  li.innerHTML = inputValue;
  toDoList.appendChild(li)
}

module.exports = { handleAddToDo }







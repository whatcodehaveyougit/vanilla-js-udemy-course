/**
 * @jest-environment jsdom
 */

describe('testing to do list', () => {
  let input;
  let toDoList;

  beforeEach(() => {
    document.body.innerHTML =
      `<input id="new-to-do" />
      <button id="add-to-do">Add todo</button>
      <ul id="to-do-list"></ul>`;

    input = document.getElementById('new-to-do');
    toDoList = document.getElementById('to-do-list');
  });

  it('should add a new item to the to-do list', () => {
    input.value = 'hello';
    const { handleAddToDo } = require('./script.js');
    handleAddToDo(input);
    expect(toDoList.innerHTML).toBe('<li>hello</li>');
  });
});

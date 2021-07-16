// todoItem.js will hold the single todo display.

function TodoItem({ todo, editTodoItem, deleteTodoItem,makePublic }) {
    return (
      <>
        <div className="todoItem">
          <div className="todoItemText">{todo.todoText}</div>
          <div className="todoItemControls">
            <i className="todoItemControlEdit">
              <button className="bg-default" onClick={() => editTodoItem(todo)}>
                Edit
              </button>
            </i>
            <i className="todoItemControlDelete">
              <button className="bg-danger" onClick={() => deleteTodoItem(todo)}>
                Del
              </button>
            </i>
          </div>
        </div>
      </>
    );
  }
  export default TodoItem;  
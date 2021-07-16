// todoList.js renders the todo list gotten from the Strapi backend.
import TodoItem from "../components/todoItem";
function TodoList({ todos, editTodoItem, deleteTodoItem}) {
  
  return (
    <div className="todoListContainer">
      <div className="todosText">Notes</div>
      {todos
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map((todo, i) => (
          <TodoItem
            todo={todo}
            key={i}
            deleteTodoItem={deleteTodoItem}
            editTodoItem={editTodoItem}
           
          />
        ))}
    </div>
  );
}
export default TodoList;
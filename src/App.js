import { useState, useEffect } from "react";
import EachCategory from "./components/EachCategory";
import { v4 } from "uuid";
import "./App.css";

let getDataFromStorage = () => {
  let Data = JSON.parse(localStorage.getItem("todoList"));
  return Data || [];
};

function App() {
  const [todoList, setTodoList] = useState(() => getDataFromStorage());
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  });

  const updateTodo = () => {
    if (todo !== "") {
      setTodoList([...todoList, { id: v4(), name: todo, itemList: [] }]);
    }
    setTodo("");
  };
  const handleCategoryListChange = (updatedCategoryList, id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, itemList: updatedCategoryList };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodoList);
  };
  const deleteTask = (id) => {
    let updatedTodoList = todoList.filter((each) => each.id !== id);
    setTodoList(updatedTodoList);
  };
  const filteredTodoList = todoList.filter((todoItem) =>
    todoItem.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='App'>
      <div className='todo-container'>
        <h1 className='main-heading'>Todo Application</h1>
        <div>
          <input
            type='text'
            placeholder='Add or search a Todo'
            className='input'
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
              setTodo(event.target.value);
            }}
          />
          <button className='btn btn-primary' onClick={updateTodo}>
            Add
          </button>
        </div>
        <div className='category-container'>
          {filteredTodoList.length === 0 ? (
            <h1 className='main-heading'>Nothing to Show</h1>
          ) : (
            filteredTodoList.map((each) => (
              <EachCategory
                key={each.id}
                todoItem={each}
                deleteTask={deleteTask}
                todoList={todoList}
                onCategoryListChange={handleCategoryListChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

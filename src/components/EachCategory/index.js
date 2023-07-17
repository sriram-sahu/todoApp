import { useState, useEffect } from "react";
import { MdOutlineDeleteOutline, MdTexture } from "react-icons/md";
import { v4 } from "uuid";

let getDataFromStorage = () => {
  let Data = JSON.parse(localStorage.getItem("todoList"));
  return Data.itemList || [];
};

const EachCategory = (props) => {
  const [display, setDisplay] = useState(false);
  const [listItem, setListItem] = useState("");
  const [categoryList, setCategoryList] = useState(props.todoItem.itemList);
  const [isAllCompleted, setAllCompleted] = useState(false);
  const [filter, setFilter] = useState("");
  const { deleteTask, todoItem, onCategoryListChange } = props;
  const { name, id } = todoItem;

  const displayList = () => {
    setDisplay(!display);
  };

  const updateCategoryList = () => {
    const updatedCategory = [
      ...categoryList,
      { id: v4(), name: listItem, isCompleted: false },
    ];
    setCategoryList(updatedCategory);
    onCategoryListChange(updatedCategory, id);
  };
  const onDeleteTodo = () => {
    deleteTask(id);
  };
  const onChangeCheckBox = (id) => {
    let updatedCategory = categoryList.map((each) => {
      if (each.id === id) {
        // console.log(each);
        return {
          ...each,
          isCompleted: !each.isCompleted,
        };
      }
      return each;
    });
    // console.log(updatedCategory);
    setCategoryList(updatedCategory);
    // onCategoryListChange(updatedCategory, id);
  };
  const filteredTodoList = categoryList.filter((todoItem) =>
    todoItem.name.toLowerCase().includes(filter.toLowerCase())
  );

  const onDeleteItem = (id) => {
    let updatedCategory = categoryList.filter((each) => each.id !== id);
    setCategoryList(updatedCategory);
  };
  useEffect(() => {
    if (categoryList.length !== 0) {
      let completedList = categoryList.every(
        (each) => each.isCompleted === true
      );
      setAllCompleted(completedList);
    }
    onCategoryListChange(categoryList, id);
  }, [categoryList]);
  return (
    <div className='each-todo-container'>
      <div className='displays'>
        <h1 onClick={displayList} className='heading'>
          {name}
        </h1>
        {isAllCompleted && categoryList.length !== 0 && (
          <button className='btn btn-primary' onClick={onDeleteTodo}>
            Completed
          </button>
        )}
      </div>
      {console.log(categoryList)}
      <div>
        {display && (
          <div>
            <div>
              <input
                type='text'
                className='input'
                value={listItem}
                onChange={(event) => {
                  setListItem(event.target.value);
                  setFilter(event.target.value);
                }}
              />
              <button className='btn btn-primary' onClick={updateCategoryList}>
                Add
              </button>
            </div>
            <ul>
              {filteredTodoList.map((each) => (
                <li className='each-item' key={each.id}>
                  <div className='display'>
                    <input
                      checked={each.isCompleted}
                      type='checkbox'
                      onChange={() => onChangeCheckBox(each.id)}
                    />
                    <p
                      className={
                        each.isCompleted ? "completed heading" : "heading"
                      }
                    >
                      {each.name}
                    </p>
                  </div>
                  <button
                    className='button'
                    onClick={() => onDeleteItem(each.id)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default EachCategory;

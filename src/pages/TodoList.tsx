import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoSelector, Categories } from "atoms/atoms";
import CreateTodo from "components/CreateTodo";
import Todo from "components/Todo";
import React from "react";

function TodoList() {
  const toDoData = useRecoilValue(toDoSelector);
  const setCategoryState = useSetRecoilState<Categories>(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const categoryVal = e.currentTarget.value as Categories;
    setCategoryState(categoryVal);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <select name="" id="" onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateTodo />
      <hr />
      {toDoData.map((e) => (
        <Todo key={e.id} {...e} />
      ))}
    </div>
  );
}

export default TodoList;

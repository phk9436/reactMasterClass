import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoSelector, IToDo, toDoState } from "atoms/atoms";
import CreateTodo from "components/CreateTodo";
import Todo from "components/Todo";
import React from "react";

function TodoList() {
  const toDos = useRecoilValue(toDoState);
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const setCategoryState = useSetRecoilState<IToDo["category"]>(categoryState)
  const onInput = (e:React.FormEvent<HTMLSelectElement>) => {
    const categoryVal = e.currentTarget.value as IToDo["category"];
    setCategoryState(categoryVal);
  }
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <select name="" id="" onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateTodo />
      <hr />
      
    </div>
  );
}

export default TodoList;

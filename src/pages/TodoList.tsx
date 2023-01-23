import { useRecoilValue } from "recoil";
import { toDoSelector } from "atoms/atoms";
import CreateTodo from "components/CreateTodo";
import Todo from "components/Todo";

function TodoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>To Dos</h1>
      <CreateTodo />
      <hr />
      <h2>Todo</h2>
      <ul>
        {toDo.map((e) => (
          <Todo {...e} key={e.id} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((e) => (
          <Todo {...e} key={e.id} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((e) => (
          <Todo {...e} key={e.id} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

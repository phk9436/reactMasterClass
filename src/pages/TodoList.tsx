import { useRecoilValue } from "recoil";
import { toDoState } from "atoms/atoms";
import CreateTodo from "components/CreateTodo";
import Todo from "components/Todo";

function TodoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Dos</h1>
      <CreateTodo />
      <ul>
        {toDos.map((e) => (
          <Todo {...e} key={e.id}/>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

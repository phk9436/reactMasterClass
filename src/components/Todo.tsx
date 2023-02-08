import { useSetRecoilState } from "recoil";
import { toDoState } from "atoms/atoms";
import { Categories, IToDo } from "atoms/atoms";

function Todo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const changeCat = (category: Categories) => {
    setToDos((state) =>
      state.map((e) => {
        if (e.id === id) {
          return { text, id, category };
        }
        return e;
      })
    );
  };

  return (
    <li>
      <span>{`${text}:${category}`}</span>
      {category !== Categories.TO_DO && (
        <button type="button" onClick={() => changeCat(Categories.TO_DO)}>
          Todo
        </button>
      )}
      {category !== Categories.DOING && (
        <button type="button" onClick={() => changeCat(Categories.DOING)}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button type="button" onClick={() => changeCat(Categories.DONE)}>
          Done
        </button>
      )}
    </li>
  );
}

export default Todo;

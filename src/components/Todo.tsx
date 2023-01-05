import { useSetRecoilState } from "recoil";
import { toDoState } from "atoms/atoms";

interface data {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

function Todo({ text, id, category }: data) {
  const setToDos = useSetRecoilState(toDoState);
  const changeCat = (category: data["category"]) => {
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
      {category !== "TO_DO" && (
        <button type="button" onClick={() => changeCat("TO_DO")}>
          Todo
        </button>
      )}
      {category !== "DOING" && (
        <button type="button" onClick={() => changeCat("DOING")}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button type="button" onClick={() => changeCat("DONE")}>
          Done
        </button>
      )}
    </li>
  );
}

export default Todo;

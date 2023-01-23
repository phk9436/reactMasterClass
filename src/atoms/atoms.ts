import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "keyToDo",
  default: [],
});

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "keyToDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((e) => e.category === "TO_DO"),
      toDos.filter((e) => e.category === "DOING"),
      toDos.filter((e) => e.category === "DONE"),
    ];
  },
});

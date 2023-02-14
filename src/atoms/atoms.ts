import { atom, selector } from "recoil";

export interface toDo {
  [key: string]: string[];
}

export const toDoState = atom<toDo>({
  key: "toDo",
  default: {
    TO_DO: ["a", "b", "c", "d", "e", "f"],
    DOING: [],
    DONE: [],
  },
});

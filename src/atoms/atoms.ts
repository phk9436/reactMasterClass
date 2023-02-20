import { atom, selector } from "recoil";

export interface ItoDo{
  id: number;
  text: string;
}

export interface ItoDoState {
  [key: string]: ItoDo[];
}

export const toDoState = atom<ItoDoState>({
  key: "toDo",
  default: {
    TO_DO: [],
    DOING: [],
    DONE: [],
  },
});

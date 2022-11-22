import { atom } from "recoil";

type theme = "light" | "dark";

export const themeState = atom<theme>({
  key: "themeState",
  default: "light",
});

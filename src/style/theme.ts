import { DefaultTheme } from "styled-components";

export interface Itheme extends DefaultTheme{
  bgColor: string;
  boardColor: string;
  cardColor: string;
}

export const darktheme: Itheme = {
  bgColor: "#3F8CF2",
  boardColor: "#DADFE9",
  cardColor: "#fff",
};

export const lighttheme: Itheme = {
  bgColor: "#3F8CF2",
  boardColor: "#DADFE9",
  cardColor: "#fff",
};

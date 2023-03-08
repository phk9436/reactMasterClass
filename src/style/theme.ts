import { DefaultTheme } from "styled-components";

export interface ITheme {
  red: string,
  black: {
    veryDark: string,
    darker: string,
    lighter: string,
  },
  white: {
    veryDark: "#141414",
    lighter: string,
    darker: string,
  },
}

export const theme: ITheme = {
  red: "#E51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    veryDark: "#141414",
    lighter: "#fff",
    darker: "#e5e5e5",
  },
};
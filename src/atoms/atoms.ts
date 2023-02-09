import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minute = get(minuteState);
    return Number((minute / 60).toFixed(1));
  },
  set: ({ set }, state) => {
    set(minuteState, Number(state) * 60);
  },
});

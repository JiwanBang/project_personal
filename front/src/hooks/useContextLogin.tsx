import { atom } from "recoil";

export const userState = atom<boolean | undefined>({
  key: "userData",
  default: undefined,
});

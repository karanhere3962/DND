import { atom } from "recoil";

export const canvasComponents = atom({
  key: `canvasComponentHolder`,
  default: {
    components: {},
  },
});

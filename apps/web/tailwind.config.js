import sharedConfig from "tailwind-config/tailwind.config.js";
import { plugins } from "./postcss.config";

export const presets = [sharedConfig];

export const theme = {
  extend: {
    colors: {
      "cus-grey": "#474545", // Define your custom color here
    },
  },
};
export const plugins = [
  // ...
  require("tailwind-scrollbar"),
];

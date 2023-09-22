import sharedConfig from "tailwind-config/tailwind.config.js";

export const presets = [sharedConfig];

export const theme = {
  extend: {
    colors: {
      "cus-grey": "#474545", // Define your custom color here
    },
  },
};

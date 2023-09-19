import sharedConfig from "tailwind-config/tailwind.config.js";

export const presets = [sharedConfig];

// eslint-disable-next-line no-undef
module.exports = {
  // ... other Tailwind CSS configurations ...

  extend: {
    fontFamily: {
      poppins: ["Poppins", "sans"],
    },
  },
};

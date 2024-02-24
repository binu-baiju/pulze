import sharedConfig from "tailwind-config/tailwind.config.js";

export const presets = [sharedConfig];

// eslint-disable-next-line no-undef
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        charcoal: "#474545",
        hex: "#F5F3FF",
      },
    },
  },
  variants: {},
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:   "#fcf8f1",
        sand:    "#f2ece2",
        wine: {
          DEFAULT: "#431616",
          deep:    "#190806",
          mid:     "#2d0e0e",
          light:   "#5c1e1e",
        },
        coral:   "#ff443a",
        "coral-2": "#ff5860",
        "coral-3": "#ff6e8f",
        "coral-4": "#ff9ae7",
        "coral-5": "#ff93a5",
        orange:  "#f6633c",
        "orange-2": "#ff8958",
        lime:    "rgb(108,194,0)",
        ink: {
          DEFAULT: "#241919",
          dark:    "#241919",
          earth:   "#3e352a",
          olive:   "#514a38",
          body:    "#454545",
          muted:   "#747474",
          dim:     "#454545",
        },
        stone: {
          dark:    "#241919",
          earth:   "#3e352a",
          olive:   "#514a38",
          body:    "#454545",
          muted:   "#747474",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:    ["'DM Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

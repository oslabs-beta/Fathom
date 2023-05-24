import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],

  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    themes: [{
      mytheme: {

        "primary": "#0c4a6e",

        "secondary": "#14532d",

        "accent": "#a16207",

        "neutral": "#19262E",

        "base-100": "#111827",

        "info": "#312e81",

        "success": "#65a30d",

        "warning": "#B5850D",

        "error": "#9a3412",
      },
    },
    ],
  },

} satisfies Config;

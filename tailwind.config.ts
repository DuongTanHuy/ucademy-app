import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#bc6c25",
        secondary: "#dda15e",
        grayDarkest: "#131316",
        grayDarker: "#212126",
        grayDark: "#9394a1",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        roboto: ["var(--font-roboto)"],
        sf_mono: ["var(--font-sf-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;

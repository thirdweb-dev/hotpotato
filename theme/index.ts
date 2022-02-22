import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const sizes = {
  container: {
    page: "1170px",
  },
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: `'Londrina Solid', cursive`,
  // body: `"Inter", -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif`,
  // mono: `'IBM Plex Mono', monospace`,
};

export const chakraTheme = extendTheme({ colors, config, sizes, fonts });
export default chakraTheme;

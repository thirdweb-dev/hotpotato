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

export const chakraTheme = extendTheme({ colors, config, sizes });
export default chakraTheme;

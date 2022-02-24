// e.g. src/Chakra.js
// a) import `ChakraProvider` component as well as the storageManagers
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import React from "react";
import { chakraTheme } from "../../theme";

export function ChakraManager({
  cookies,
  children,
}: React.PropsWithChildren<{ cookies?: string }>) {
  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider theme={chakraTheme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

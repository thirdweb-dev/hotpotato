import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export const ColorSchemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="ghost"
      onClick={toggleColorMode}
      aria-label="toggle color mode"
      icon={
        colorMode === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />
      }
    />
  );
};

import {
  Text,
  Container,
  Flex,
  Heading,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ColorSchemeToggle } from "../shared/color-toggle";
import { LinkButton } from "../shared/link-button";
import { IoGameControllerOutline } from "react-icons/io5";

export const Header: React.FC = () => {
  return (
    <Flex py={4} as="header" borderBottomWidth="1px">
      <Container
        maxW="container.page"
        as={Flex}
        justify="space-between"
        align="center"
      >
        <Heading as="h1" size="xl">
          🔥🥔
          <VisuallyHidden>Hot Potato</VisuallyHidden>
          <Text as="span" display={{ base: "none", md: "inline" }}>
            {" "}
            Game
          </Text>
        </Heading>
        <Flex gap={4} as="nav">
          <ColorSchemeToggle />
          <LinkButton
            colorScheme="purple"
            _hover={{ textDecor: "underline" }}
            href="/farm"
            variant="link"
          >
            Farm To web3
          </LinkButton>
          <LinkButton
            href="/"
            colorScheme="purple"
            rightIcon={<IoGameControllerOutline />}
          >
            Play
          </LinkButton>
        </Flex>
      </Container>
    </Flex>
  );
};

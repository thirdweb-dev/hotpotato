import {
  Text,
  Container,
  Flex,
  Heading,
  VisuallyHidden,
  Link,
} from "@chakra-ui/react";
import { ColorSchemeToggle } from "../shared/color-toggle";
import { LinkButton } from "../shared/link-button";
import { IoGameControllerOutline, IoLogoTwitter } from "react-icons/io5";
import { ConnectWallet } from "../shared/connect-wallet-button";

export const Header: React.FC = () => {
  return (
    <Flex py={4} as="header" borderBottomWidth="1px">
      <Container
        maxW="container.page"
        as={Flex}
        justify="space-between"
        align="center"
      >
        <Link href="/">
          <Heading as="h1" size="xl">
            🔥🥔
            <VisuallyHidden>Hot Potato</VisuallyHidden>
            <Text as="span" display={{ base: "none", md: "inline" }}>
              {" "}
              Game
            </Text>
          </Heading>
        </Link>

        <Flex gap={2} as="nav">
          <LinkButton
            colorScheme="purple"
            _hover={{ textDecor: "underline" }}
            href="https://twitter.com/@HotPotatoGG"
            variant="link"
          >
            <IoLogoTwitter />
          </LinkButton>
          <ColorSchemeToggle />
          <ConnectWallet size="md" />
        </Flex>
      </Container>
    </Flex>
  );
};

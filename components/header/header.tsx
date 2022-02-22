import { Container, Flex, Heading } from "@chakra-ui/react";
import { ColorSchemeToggle } from "../shared/color-toggle";
import { ConnectWallet } from "../shared/connect-wallet-button";

export const Header: React.FC = () => {
  return (
    <Flex py={4} as="header">
      <Container
        maxW="container.page"
        as={Flex}
        justify="space-between"
        align="center"
      >
        <Heading as="h1" size="xl">
          🥔☄️ Game
        </Heading>
        <Flex gap={2} as="nav">
          <ColorSchemeToggle />
          <ConnectWallet />
        </Flex>
      </Container>
    </Flex>
  );
};

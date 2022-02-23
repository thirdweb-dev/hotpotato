import { Container, Flex, Text, Link } from "@chakra-ui/react";
import { IoLogoTwitter } from "react-icons/io5";
import { LinkButton } from "../shared/link-button";

export const Footer: React.FC = () => {
  return (
    <Flex py={4} as="footer" borderTopWidth="1px">
      <Container
        maxW="container.page"
        as={Flex}
        justify="space-between"
        align="center"
      >
        <Text w="full" textAlign="center">
          Built with ❤️ for 🥔 during the{" "}
          <Link isExternal href="https://thirdweb.com">
            thirdweb
          </Link>{" "}
          hackweek, best enjoyed with 🔥.

        </Text>
      </Container>
    </Flex>
  );
};

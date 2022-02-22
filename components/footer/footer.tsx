import { Container, Flex } from "@chakra-ui/react";

export const Footer: React.FC = () => {
  return (
    <Flex py={4} as="footer">
      <Container
        maxW="container.page"
        as={Flex}
        justify="space-between"
        align="center"
      >
        foo bar footer stuff
      </Container>
    </Flex>
  );
};

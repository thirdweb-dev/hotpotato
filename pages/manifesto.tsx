import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import FAQ from "./faq";

export default function Manifesto() {
  return (
    <Container py={16} maxW="container.page">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 16, md: 24 }}>
        <Flex gap={4} direction="column">
          <Heading as="h2" size="2xl">
            Manifesto
          </Heading>
          <Text fontSize="xl">Meet hot potato. 🥔🔥</Text>
          <Text fontSize="xl">Hot potato LOVES being hot. 🔥</Text>
          <Text fontSize="xl">
            When hot potato cools down, it makes hot potato SAD. 😔
          </Text>
          <Text fontSize="xl">
            We need your help keeping hot potato happy! 😊
          </Text>
          <Text fontSize="xl">
            The more hot potato gets passed around, the hotter hot potato gets.
            🔥🔥
          </Text>
          <Text fontSize="xl">
            Let 24 hours pass and hot potato becomes a vegetable. A single, cold
            potato. Please don&apos;t do this to hot potato. There are only so
            many potatoes left on our planet.
          </Text>
          <Text fontSize="xl">
            In a world where everyone is hyper focused on themselves, we ask
            that you selflessly give in service of hot potato. Pass hot potato
            enough and hot potato may reach Fryhalla, a golden delicious potato
            heaven.
          </Text>
          <Text fontSize="xl">
            Give in service of hot potato and you shall be rewarded. Turn hot
            potato cold and you will bring shame on the great potato community.
          </Text>
          <Text fontSize="xl">
            So warm your fingers and prepare yourself for hot potato&apos;s
            enormous ambition - a journey to become the most transferred NFT on
            the planet.
          </Text>
          <Heading size="lg">This is the way.</Heading>
        </Flex>
        <FAQ />
      </SimpleGrid>
    </Container>
  );
}

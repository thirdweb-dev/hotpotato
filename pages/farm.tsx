import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { NFTRenderer } from "../components/nft/nft";
import { CONTRACT_ADDRESS, TOKEN_ID } from "../constants/game-config";

export default function Farm() {
  return (
    <Box position="relative">
      <Box
        display={{ base: "none", md: "block" }}
        position="absolute"
        top={0}
        left={0}
      >
        <Heading
          as="h2"
          size="4xl"
          transform="rotate(270deg) translate(-50%, -350%)"
        >
          Farm to web3
        </Heading>
      </Box>

      <Container py={4} maxW="container.page">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          alignItems="center"
          gap={{ base: 8, md: 16 }}
        >
          <Flex gap={4} direction="column">
            <Heading as="h2" size="2xl" display={{ base: "block", md: "none" }}>
              Farm to web3
            </Heading>
            <NFTRenderer
              display={{ base: "block", md: "none" }}
              contractAddress={CONTRACT_ADDRESS}
              tokenId={0}
            />
            <Text fontSize="xl">Meet hot potato. 🥔🔥</Text>
            <Text fontSize="xl">Hot potato LOVES being hot. 🔥</Text>
            <Text fontSize="xl">
              When hot potato cools down, it makes hot potato SAD. 😔
            </Text>
            <Text fontSize="xl">
              We need your help keeping hot potato happy! 😊
            </Text>
            <Text fontSize="xl">
              The more hot potato gets passed around, the hotter hot potato
              gets. 🔥🔥
            </Text>
            <Text fontSize="xl">
              Let 24 hours pass and hot potato becomes a vegetable. A single,
              cold potato. Please don&apos;t do this to hot potato. There are
              only so many potatoes left on our planet.
            </Text>
            <Text fontSize="xl">
              In a world where everyone is hyper focused on themselves, we ask
              that you selflessly give in service of hot potato. Pass hot potato
              enough and hot potato may reach Fryhalla, a golden delicious
              potato heaven.
            </Text>
            <Text fontSize="xl">
              Give in service of hot potato and you shall be rewarded. Turn hot
              potato cold and you will bring shame on the great potato
              community.
            </Text>
            <Text fontSize="xl">
              So warm your fingers and prepare yourself for hot potato&apos;s
              enormous ambition - a journey to become the most transferred NFT
              on the planet.
            </Text>
            <Heading size="lg">This is the way.</Heading>
          </Flex>
          <NFTRenderer
            display={{ base: "none", md: "block" }}
            contractAddress={CONTRACT_ADDRESS}
            tokenId={TOKEN_ID}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

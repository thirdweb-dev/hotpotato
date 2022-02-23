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
import FaqItem from "../components/faqs-item/faqItem";

export default function FAQ() {
  return (
    <Box position="relative">
      <Container py={4} maxW="container.page">
        <SimpleGrid columns={1} alignItems="center" gap={{ base: 8, md: 16 }}>
          <Flex gap={4} direction="column">
            <Heading as="h2" size="3xl">
              Frequently Asked Questions
            </Heading>
            <FaqItem
              question="What’s the goal of the game?"
              answer="The goal of the game is to transfer the potato NFT around to as many 
              wallets as possible. "
            />
            <FaqItem
              question="How do I win?"
              answer="When the potato reaches our targeted transfer milestone of 1000 passes, 
              a special thirdweb exclusive potato NFT will be airdropped to the wallets of all 
              the participants. Keep the game going by transferring the potato in under 24 hours 
              and encouraging everyone else to do so too."
            />
            <FaqItem
              question="Do I need crypto to play?"
              answer="Since this app is on Polygon Mainnet in order to play you will need some 
              $matic in your wallet. The estimated cost to transfer is less than a penny."
            />
            <FaqItem
              question="What happens if I kill the potato?"
              answer="If you hold onto the potato for more than 24 hours you lose and will have 
              ended the game for everyone. While the rest of the players may receive a prize, you 
              will not. The game will then start over. Don’t kill the potato!"
            />
            <FaqItem
              question="How do I pass the hot potato?"
              answer="When you receive the hot potato NFT you can transfer it using our web app 
              by connecting your wallet and following the prompts. If you run into any trouble 
              at this stage please email: samina@thirdweb.com"
            />
            <FaqItem
              question="How do I know where the potato is?"
              answer="Follow the hot potato twitter account @HotPotatoGG for updates."
            />
            <FaqItem
              question="What blockchain is the game being played on?"
              answer="The hot potato NFT game is on the Polygon blockchain."
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

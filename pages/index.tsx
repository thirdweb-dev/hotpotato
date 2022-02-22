import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NFTRenderer } from "../components/nft/nft";
import { useGameState } from "../hooks/useGameState";
import Countdown from "react-countdown";

// 24h round time
const ROUND_TIME = 1000 * 60 * 60 * 24;

export default function Home() {
  const gameState = useGameState();
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Container maxW="container.page">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 16 }}>
        <NFTRenderer
          contractAddress="0xE0Ed2e05589aacd9E7AAAc642B78fa4B6bEc43fD"
          tokenId={0}
        />
        <Flex direction="column" gap={8} justify="space-around" flexGrow={1}>
          <Heading as="h2" size={isMobile ? "xl" : "4xl"}>
            Join the Hot Potato NFT game!
          </Heading>
          <Flex as="form">
            <FormControl>
              <Flex gap={2}>
                <Input variant="filled" size="lg" placeholder="@elonmusk" />
                <Button size="lg" colorScheme="purple" type="submit">
                  Enter now
                </Button>
              </Flex>
              <FormHelperText fontStyle="italic">
                Drop your twitter handle to get notified when you get the hot
                potato NFT!
              </FormHelperText>
            </FormControl>
          </Flex>
          <StatGroup>
            <Stat>
              <StatLabel>Round</StatLabel>
              <Skeleton isLoaded={gameState.isSuccess}>
                <StatNumber>{gameState.data?.current_round}</StatNumber>
              </Skeleton>
            </Stat>

            <Stat>
              <StatLabel>Transfers</StatLabel>
              <Skeleton isLoaded={gameState.isSuccess}>
                <StatNumber>{gameState.data?.transfer_count}</StatNumber>
              </Skeleton>
            </Stat>

            <Stat>
              <StatLabel>Countdown</StatLabel>
              <Skeleton isLoaded={gameState.isSuccess}>
                <StatNumber>
                  <Countdown
                    autoStart
                    daysInHours
                    date={
                      new Date(
                        gameState.data?.last_transfer_time || 0,
                      ).getTime() + ROUND_TIME
                    }
                  >
                    <>Round over</>
                  </Countdown>
                </StatNumber>
              </Skeleton>
            </Stat>
          </StatGroup>
        </Flex>
      </SimpleGrid>
    </Container>
  );
}

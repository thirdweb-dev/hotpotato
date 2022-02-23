import {
  Container,
  Flex,
  Heading,
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
import { ActionArea } from "../components/actions/action-area";
import { CONTRACT_ADDRESS, TOKEN_ID } from "../constants/game-config";
// import { useGamePlayers } from "../hooks/usePlayers";
import { useWeb3 } from "../hooks/useWeb3";
import { useHasPlayed } from "../hooks/useHasPlayed";
import { useHasRegistered } from "../hooks/useHasRegistered";
// import { LinkButton } from "../components/shared/link-button";
// import { IoLogoTwitter } from "react-icons/io5";

// 24h round time
const ROUND_TIME = 1000 * 60 * 60 * 24;

export default function Home() {
  const gameState = useGameState();
  // const players = useGamePlayers();
  // console.log("*** players", players.data);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { address } = useWeb3();
  const hasPlayed = useHasPlayed(address);
  const hasRegistered = useHasRegistered(address);
  return (
    <Container py={4} maxW="container.page">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 16 }}>
        <NFTRenderer contractAddress={CONTRACT_ADDRESS} tokenId={TOKEN_ID} />
        <Flex direction="column" gap={8} justify="space-around" flexGrow={1}>
          <Heading as="h2" size={isMobile ? "xl" : "4xl"}>
            {hasPlayed.data
              ? "You Already Passed the Potato!"
              : hasRegistered.data
              ? "You're registered!"
              : "Join the Hot Potato NFT game!"}
          </Heading>

          <ActionArea contractAddress={CONTRACT_ADDRESS} tokenId={TOKEN_ID} />
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
            {/* <Stat>
              <StatLabel>Updates</StatLabel>
              <Skeleton isLoaded={true}>
                <LinkButton
                  href="https://twitter.com/@HotPotatoGG"
                  colorScheme="purple"
                  rightIcon={<IoLogoTwitter />}
                >
                  @HotPotatoGG
                </LinkButton>
              </Skeleton>
            </Stat> */}
          </StatGroup>
        </Flex>
      </SimpleGrid>
    </Container>
  );
}

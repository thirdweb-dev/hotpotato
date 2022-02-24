import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import {TableRow} from "../components/table/tableRow";
import { useGamePlayers } from "../hooks/usePlayers";


export default function LOG() {
  // const players = useGamePlayers();


  const player = useGamePlayers();
  let playerRows = player.data?.map((info) => {return <TableRow info = {info}></TableRow>});

  console.log(player.data);

  return (
    <Box position="relative">
      <Container py={4} maxW="container.page">
        <SimpleGrid columns={1} alignItems="center" gap={{ base: 8, md: 16 }}>
          <Flex gap={4} direction="column">
            <Heading as="h2" size="xl" textAlign='center'>
              Potato Pass Log
            </Heading>
            <Table variant="simple" size="lg">
              <TableCaption>Potato Pass Log</TableCaption>
              <Thead>
                <Tr>
                  <Th>Twitter</Th>
                  <Th>Address</Th>
                  <Th>Transfer Date</Th>
                  <Th>Transfer Time</Th>
                  <Th>Time Held</Th>
                </Tr>
                {playerRows}
              </Thead>
            </Table>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
function usePlayers() {
  throw new Error("Function not implemented.");
}


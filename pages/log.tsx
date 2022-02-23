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
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import TableRow from "../components/table/tableRow";

export default function LOG() {
  return (
    <Box position="relative">
      <Container py={4} maxW="container.page">
        <SimpleGrid columns={1} alignItems="center" gap={{ base: 8, md: 16 }}>
          <Flex gap={4} direction="column">
            <Heading as="h2" size="xl">
              Potato Pass Log
            </Heading>
            <Table variant="simple">
              <TableCaption>Potato Pass Log</TableCaption>
              <Thead>
                <Tr>
                  <Th>Player (ENS)</Th>
                  <Th>Address</Th>
                  <Th>Twitter</Th>
                  <Th>Time Held </Th>
                </Tr>
                <TableRow></TableRow>
              </Thead>
            </Table>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

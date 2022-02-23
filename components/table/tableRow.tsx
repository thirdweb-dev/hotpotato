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

export default function TableRow(props) {
  return (
    <Tr>
      <Td>{props.twitter}</Td>
      <Td>{props.address}</Td>
      <Td>{props.timeHeld}</Td>
    </Tr>
  );
}

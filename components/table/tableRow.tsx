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
import { PlayerInfo } from "../../hooks/usePlayers";

interface TableRowProps {
  info: PlayerInfo
}

export const TableRow: React.FC<TableRowProps> = ({info}) => {
  if (!info) {
    return null;
  }
  
  let date = new Date(info.transferedAt);
  
  return (
    <Tr>
      <Td>{info.twitterHandle}</Td>
      <Td>{info.address}</Td>
      <Td>{date.toLocaleString()}</Td>
      <Td>{info.timeSpent / (1000 * 60 * 60)}</Td>
    </Tr>
  );
}

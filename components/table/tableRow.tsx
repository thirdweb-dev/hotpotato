import { Tr, Td } from "@chakra-ui/react";
import { PlayerInfo } from "../../hooks/usePlayers";

interface TableRowProps {
  info: PlayerInfo;
}

// formatting for time spent
function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursString = hours < 10 ? `0${hours}` : hours;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${hoursString}:${minutesString}:${secondsString}`;
}

// formatting for address (responsive)
function truncateAddress(address) {
  return `${address.slice(0, 6)}"..."${address.slice(-4)}`;
}

export const TableRow: React.FC<TableRowProps> = ({ info }) => {
  if (!info) {
    return null;
  }

  // formatting for date
  const date = new Date(info.transferedAt);

  return (
    <Tr>
      <Td>{info.twitterHandle ? `@${info.twitterHandle}` : " "}</Td>
      <Td>{truncateAddress(info.address)}</Td>
      <Td>{date.toLocaleDateString()}</Td>
      <Td>{date.toLocaleTimeString()}</Td>
      <Td>{info.timeSpent !== 0 ? msToTime(info.timeSpent) : "-----"}</Td>
    </Tr>
  );
};

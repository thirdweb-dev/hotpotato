import { Tr, Td } from "@chakra-ui/react";
import { PlayerInfo } from "../../hooks/usePlayers";

interface TableRowProps {
  info: PlayerInfo;
}

//formatting for time spent
function msToTime(duration) {
  const milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursString = hours < 10 ? "0" + hours : hours;
  const minutesString = minutes < 10 ? "0" + minutes : minutes;
  const secondsString = seconds < 10 ? "0" + seconds : seconds;

  return hoursString + ":" + minutesString + ":" + secondsString;
}

export const TableRow: React.FC<TableRowProps> = ({ info }) => {
  if (!info) {
    return null;
  }

  //formatting for date
  const date = new Date(info.transferedAt);

  return (
    <Tr>
      <Td>{info.twitterHandle}</Td>
      <Td>{info.address}</Td>
      <Td>{date.toLocaleDateString()}</Td>
      <Td>{date.toLocaleTimeString()}</Td>
      <Td>{msToTime(info.timeSpent)}</Td>
    </Tr>
  );
};

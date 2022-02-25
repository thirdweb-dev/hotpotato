import { Tr, Td, Link } from "@chakra-ui/react";
import { PlayerInfo } from "../../hooks/usePlayers";

interface TableRowProps {
  info: PlayerInfo;
}

// formatting for time spent
function msToTime(duration: number) {
  const seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursString = hours < 10 ? `0${hours}` : hours;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${hoursString}:${minutesString}:${secondsString}`;
}

// formatting for address (responsive)
function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const TableRow: React.FC<TableRowProps> = ({ info }) => {
  if (!info) {
    return null;
  }

  // formatting for date
  const date = new Date(info.transferedAt);
  const twitter = info.twitterHandle;

  return (
    <Tr>
      <Td>
        {twitter ? (
          <Link href={"https://twitter.com/" + twitter} isExternal>
            @{info.twitterHandle}
          </Link>
        ) : (
          " "
        )}
      </Td>
      <Td>{truncateAddress(info.address)}</Td>
      <Td>{date.toLocaleDateString()}</Td>
      <Td>{date.toLocaleTimeString()}</Td>
      <Td>{info.timeSpent !== 0 ? msToTime(info.timeSpent) : "-----"}</Td>
    </Tr>
  );
};

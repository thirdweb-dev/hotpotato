import { useQuery } from "react-query";

export interface PlayerInfo {
  address: string;
  twitterHandle: string;
  transferedAt: number;
  timeSpent: number;
}

type GamePlayers = Array<PlayerInfo>;

export function useGamePlayers() {
  return useQuery<GamePlayers>(
    ["game-players"],
    async () => {
      const res = await fetch(
        "https://nftlabs-hotpotatoserver.zeet-nftlabs.zeet.app/players",
      );
      if (res.status !== 200) {
        throw new Error("request failed");
      }
      return res.json();
    },
    {
      refetchIntervalInBackground: false,
      refetchInterval: 1000 * 10,
    },
  );
}

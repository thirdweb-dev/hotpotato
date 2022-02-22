import { useQuery } from "react-query";

interface GameState {
  current_round: number;
  transfer_count: number;
  last_transfer_time: Date | number;
}

export function useGameState() {
  return useQuery<GameState>(
    ["game-state"],
    async () => {
      const res = await fetch(
        "https://nftlabs-hotpotatoserver.zeet-nftlabs.zeet.app/state",
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

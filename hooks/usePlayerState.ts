import { useQuery } from "react-query";

interface PlayerState {
  hasPlayed: boolean;
  isEligible: boolean;
  username: string;
  isRegistered: boolean;
  isOwner: boolean;
}

export function usePlayerState(address: string) {
  return useQuery<PlayerState>(
    [`player-state`, address],
    async () => {
      if (!address) {
        return false;
      }
      console.log("Fetching player state for", address);
      const res = await fetch(
        `https://nftlabs-hotpotatoserver.zeet-nftlabs.zeet.app/playerstate?address=${address}`,
      );
      if (res.status !== 200) {
        throw new Error("request failed");
      }
      const json = await res.json();
      console.log(json);
      return json.exists;
    },
    {
      refetchIntervalInBackground: false,
      refetchInterval: 1000 * 10,
    },
  );
}

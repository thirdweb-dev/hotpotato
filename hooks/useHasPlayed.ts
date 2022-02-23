import { useQuery } from "react-query";

export function useHasPlayed(address: string) {
  return useQuery<boolean>(
    [`has-played`, address],
    async () => {
      if (!address) {
        return false;
      }
      const res = await fetch(
        `https://nftlabs-hotpotatoserver.zeet-nftlabs.zeet.app/hasplayed?address=${address}`,
      );
      if (res.status !== 200) {
        throw new Error("request failed");
      }
      const json = await res.json();
      console.log(json);
      return json.played;
    },
    {
      refetchIntervalInBackground: false,
      refetchInterval: 1000 * 10,
    },
  );
}

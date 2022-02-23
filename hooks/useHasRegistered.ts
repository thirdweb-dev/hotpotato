import { useQuery } from "react-query";

export function useHasRegistered(address: string) {
  return useQuery<boolean>(
    [`has-registered`, address],
    async () => {
      if (!address) {
        return false;
      }
      const res = await fetch(
        `https://nftlabs-hotpotatoserver.zeet-nftlabs.zeet.app/exists?address=${address}`,
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

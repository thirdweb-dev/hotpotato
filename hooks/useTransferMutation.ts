import { useNFTCollection } from "@thirdweb-dev/react";
import { BigNumberish } from "ethers";
import { useMutation } from "react-query";
import invariant from "tiny-invariant";
import { queryClient } from "../components/provider/provider";

export function useTransferMutation(
  contractAddress: string,
  tokenId?: BigNumberish,
) {
  const nftCollection = useNFTCollection(contractAddress);
  return useMutation(
    async ({ to, toStranger }: { to: string; toStranger?: true }) => {
      invariant(nftCollection, "nftCollection is required");
      invariant(tokenId, "tokenId is required");

      if (toStranger) {
        const res = await fetch(
          "https://nftlabs-hotpotatoserver.zeet-nftlabs.zeet.app/randomwallet",
        );
        if (res.status !== 200) {
          throw new Error("request failed");
        }
        const json: { address: string } = await res.json();
        to = json.address;
      }

      return await nftCollection.transfer(to, tokenId);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([
          "nft-asset",
          contractAddress,
          tokenId,
        ]);
      },
    },
  );
}

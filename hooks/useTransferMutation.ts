import { useNFTCollection } from "@thirdweb-dev/react";
import { BigNumberish } from "ethers";
import { useMutation } from "react-query";
import invariant from "tiny-invariant";
import { queryClient } from "../components/provider/provider";

export function useTransferMutation(
  contractAddress: string,
  tokenId: BigNumberish,
) {
  const nftCollection = useNFTCollection(contractAddress);
  return useMutation(
    (to: string) => {
      invariant(nftCollection, "nftCollection is required");
      console.log("transfer", to);
      return nftCollection.transfer(to, tokenId);
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

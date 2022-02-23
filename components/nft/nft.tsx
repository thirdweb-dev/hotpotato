import { AspectRatio, Box, BoxProps, Image, Skeleton } from "@chakra-ui/react";
import { useNFTCollection } from "@thirdweb-dev/react";
import { BigNumberish } from "ethers";
import { useQuery } from "react-query";

export interface NFTRendererProps extends BoxProps {
  contractAddress: string;
  tokenId: BigNumberish;
}

export function useNFT(contractAddress: string, tokenId: BigNumberish) {
  const nftCollection = useNFTCollection(contractAddress);
  return useQuery(
    ["nft-asset", contractAddress, tokenId],
    () => {
      return nftCollection.get(tokenId);
    },
    {
      enabled: !!nftCollection && tokenId !== undefined,
    },
  );
}

const beforeStyle = {
  content: `""`,
  zIndex: "-1",
  position: "absolute",
  top: 0.5,
  left: 0.5,
  right: -0.5,
  bottom: -0.5,

  background: "inherit",
  borderRadius: "inherit",
  filter: "blur(15px)",
};

export const NFTRenderer: React.FC<NFTRendererProps> = ({
  contractAddress,
  tokenId,
  ...restBoxProps
}) => {
  const asset = useNFT(contractAddress, tokenId);
  return (
    <Box
      position="relative"
      background="linear-gradient(109.63deg, #F213A4 21.11%, #5204BF 77.64%)"
      p={8}
      borderRadius="3xl"
      _before={beforeStyle}
      {...restBoxProps}
    >
      <AspectRatio ratio={1} w="full">
        <Skeleton
          borderRadius="3xl"
          overflow="hidden"
          isLoaded={!!asset.data?.metadata?.image}
        >
          <Image
            w="full"
            h="full"
            objectFit="contain"
            src={asset.data?.metadata?.image}
            alt={asset.data?.metadata?.name || ""}
          />
        </Skeleton>
      </AspectRatio>
    </Box>
  );
};

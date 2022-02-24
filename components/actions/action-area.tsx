import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BigNumberish } from "ethers";
import { useTransferMutation } from "../../hooks/useTransferMutation";
import { useWeb3 } from "../../hooks/useWeb3";
import { useNFT } from "../nft/nft";
import { ConnectWallet } from "../shared/connect-wallet-button";
import { useForm } from "react-hook-form";
import { isAddress } from "ethers/lib/utils";
import { FiTwitter } from "react-icons/fi";
import { LinkButton } from "../shared/link-button";
import { PlayerStateType } from "../../hooks/usePlayerState";
import { useState } from "react";

interface ActionAreaProps {
  contractAddress: string;
  tokenId: BigNumberish;
  playerState: PlayerStateType;
}

interface TransferForm {
  to: string;
}

export const ActionArea: React.FC<ActionAreaProps> = ({
  contractAddress,
  tokenId,
  playerState,
}) => {
  const [fetchingStranger, setFetchingStranger] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  const stranger = async () => {
    setFetchingStranger(true);
    const res = await fetch(
      "https://nftlabs-hotpotatoserver.zeet-nftlabs.zeet.app/randomwallet",
    );
    const json = await res.json();
    setFetchingStranger(false);
    return json.address;
  };

  const sendToStranger = async () => {
    const strangerAddress = await stranger();
    setTransferAddress(strangerAddress);
  };
  const { address } = useWeb3();
  const asset = useNFT(contractAddress, tokenId);
  const { handleSubmit, register, formState, getFieldState } =
    useForm<TransferForm>({
      defaultValues: { to: "" },
    });
  const mutation = useTransferMutation(contractAddress, tokenId);

  const toast = useToast();

  if (asset.isLoading) {
    return (
      <Flex direction="column" gap={4}>
        <Skeleton>
          <Text fontWeight="500">Please connect your wallet to begin</Text>
        </Skeleton>
        <Skeleton>
          <ConnectWallet size="lg" />
        </Skeleton>
      </Flex>
    );
  }

  if (!address) {
    return (
      <Flex direction="column" gap={4}>
        <Text fontWeight="500">Please connect your wallet to begin</Text>
        <ConnectWallet size="lg" />
      </Flex>
    );
  }

  if (playerState.isOwner) {
    return (
      <Flex
        as="form"
        onSubmit={handleSubmit((d) =>
          mutation.mutate(d.to, {
            onSuccess: () => {
              toast({
                title: "Potato heating up! 🔥",
                description: "Potato got passed, heat level increased.",
                status: "success",
              });
            },
            onError: (err) => {
              console.error("failed to transfer", err);
              toast({
                title: "Potato dropped 🥶",
                description: "Something went wrong, you could try again!",
                status: "error",
              });
            },
          }),
        )}
        direction="column"
        gap={4}
      >
        <Text fontWeight="500">Transfer hot potato</Text>
        <FormControl isInvalid={getFieldState("to", formState).invalid}>
          <Flex gap={2}>
            <Input
              isDisabled={mutation.isLoading}
              size="lg"
              value={transferAddress}
              variant="filled"
              {...register("to", {
                validate: (d) => isAddress(d) || "Not a valid address.",
              })}
            />
            <Button
              isLoading={mutation.isLoading}
              loadingText="transferring..."
              type="submit"
              size="lg"
              variant="outline"
            >
              Transfer
            </Button>
            <Button
              isLoading={fetchingStranger}
              loadingText="fetching..."
              type="button"
              size="lg"
              variant="outline"
              onClick={sendToStranger}
            >
              Random
            </Button>
          </Flex>
          <FormErrorMessage>
            {getFieldState("to", formState).error?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
    );
  }

  if (playerState.hasPlayed) {
    return (
      <Flex direction="column" gap={4}>
        <Text fontWeight="500">
          You helped what could potentially be the world record of the most
          transferred NFT!
        </Text>
        <Heading as="h5">You&apos;ve made history!</Heading>
      </Flex>
    );
  }

  if (playerState.isRegistered) {
    return (
      <Flex direction="column" gap={4}>
        <Text fontWeight="500">
          You&apos;re registered to receive the Hot potato!
        </Text>
        <Heading as="h5">
          Keep an eye on your twitter feed for notifications!
        </Heading>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={4}>
      <Text fontWeight="500">
        Hot potato is not in your wallet, tweet us to add your wallet to the
        players list and get notified when you receive the Hot Potato!
      </Text>
      <LinkButton
        isExternal
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${address} ❤️ potatoes`,
        )}&in_reply_to=1496239806589902855&related=hotpotatogg,thirdweb_`}
        colorScheme="twitter"
        leftIcon={<FiTwitter />}
      >
        Tweet @ potato
      </LinkButton>
    </Flex>
  );
};

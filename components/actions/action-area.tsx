import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Skeleton,
  Text,
  useBreakpointValue,
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
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { address } = useWeb3();
  const asset = useNFT(contractAddress, tokenId);
  const { handleSubmit, register, formState, getFieldState } =
    useForm<TransferForm>({
      defaultValues: { to: "" },
    });
  const mutation = useTransferMutation(contractAddress, tokenId);

  const toast = useToast();

  const doMutation = async (values: TransferForm, toStranger?: true) => {
    const d = { ...values, toStranger };
    mutation.mutate(d, {
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
          description: "Something went wrong, please try again!",
          status: "error",
        });
      },
    });
  };

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
        onSubmit={handleSubmit((d) => doMutation(d))}
        direction="column"
        gap={4}
      >
        <Text fontSize="2xl" fontWeight="bold">
          Pass the potato to a friend!
        </Text>
        <FormControl isInvalid={getFieldState("to", formState).invalid}>
          <Flex gap={2}>
            <Input
              isDisabled={mutation.isLoading}
              size="lg"
              placeholder="0x...."
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
              Send
            </Button>
          </Flex>
          <FormErrorMessage>
            {getFieldState("to", formState).error?.message}
          </FormErrorMessage>
        </FormControl>
        <Center>
          <Text fontSize="1xl" fontWeight="bold">
            OR
          </Text>
        </Center>
        <Button
          isLoading={mutation.isLoading}
          loadingText="transferring..."
          type="button"
          size="lg"
          variant="outline"
          onClick={() => doMutation({ to: "" }, true)}
        >
          Pass it to a stranger
        </Button>
      </Flex>
    );
  }
  if (playerState.hasPlayed) {
    return (
      <Flex direction="column" gap={4}>
        <Text fontSize={isMobile ? "xl" : "3xl"} fontWeight="bold">
          You&apos;ve made history!
        </Text>
        <Text fontSize="md" fontWeight="bold">
          Help break the world record of the most transferred NFT by tweeting
          others to join too!
        </Text>
        <Link href="https://twitter.com/hotpotatogg">
          <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight="bold">
            <FiTwitter style={{ display: "inline", paddingTop: 6 }} />
            &nbsp;@HotPotatoGG
          </Text>
        </Link>
      </Flex>
    );
  }

  if (playerState.isRegistered) {
    return (
      <Flex direction="column" gap={4}>
        <Heading as="h5">
          Keep an eye on your twitter feed for potato notifications!
        </Heading>
        <Link href="https://twitter.com/hotpotatogg">
          <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight="bold">
            <FiTwitter style={{ display: "inline", paddingTop: 6 }} />
            &nbsp;@HotPotatoGG
          </Text>
        </Link>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={4}>
      <Heading as="h5">Wanna Join?</Heading>
      <Text fontSize="lg" fontWeight="bold">
        Tweet us your wallet address
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

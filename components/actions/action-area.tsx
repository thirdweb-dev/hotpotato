import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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

interface ActionAreaProps {
  contractAddress: string;
  tokenId: BigNumberish;
}

interface TransferForm {
  to: string;
}

export const ActionArea: React.FC<ActionAreaProps> = ({
  contractAddress,
  tokenId,
}) => {
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

  if (asset.data?.owner?.toLowerCase() === address?.toLowerCase()) {
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
          </Flex>
          <FormErrorMessage>
            {getFieldState("to", formState).error?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={4}>
      <Text fontWeight="500">
        Hot potato is not in your wallet, tweet to add your wallet to the
        players list.
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

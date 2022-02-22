import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { BigNumberish } from "ethers";
import { useTransferMutation } from "../../hooks/useTransferMutation";
import { useWeb3 } from "../../hooks/useWeb3";
import { useNFT } from "../nft/nft";
import { ConnectWallet } from "../shared/connect-wallet-button";
import { useForm } from "react-hook-form";
import { isAddress } from "ethers/lib/utils";

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
        onSubmit={handleSubmit((d) => mutation.mutate(d.to))}
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
      <Heading size="lg">You&apos;re not it.</Heading>
      <Text fontWeight="500">
        Hot potato is not in your wallet, maybe it will be soon?
      </Text>
    </Flex>
  );
};

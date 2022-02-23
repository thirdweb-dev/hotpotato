import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { useDisconnect, useNetwork } from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useWeb3 } from "../../hooks/useWeb3";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { ChainId } from "@thirdweb-dev/sdk";

interface NetworkSwitcherProps {
  requiredChainId: number;
}

export const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({
  requiredChainId,
}) => {
  const { chainId, address } = useWeb3();
  const [timedOut, setTimedOut] = useState(false);
  const [, switchNetwork] = useNetwork();
  const disconnect = useDisconnect();
  const initialRef = useRef();

  useEffect(() => {
    const t = setTimeout(() => {
      setTimedOut(true);
    }, 1000);
    return () => {
      clearTimeout(t);
      setTimedOut(false);
    };
  }, [address]);

  if (!address || requiredChainId === chainId || !timedOut) {
    return null;
  }
  if (requiredChainId !== chainId) {
    return (
      <Drawer
        closeOnEsc={false}
        closeOnOverlayClick={false}
        placement="bottom"
        isOpen={true}
        onClose={() => undefined}
        initialFocusRef={initialRef}
      >
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent borderTopRadius={{ base: "2xl", md: "none" }}>
          <DrawerHeader>Not connected to Polygon network</DrawerHeader>
          <DrawerBody>
            {switchNetwork
              ? `Please switch your network to "Polygon" or try again by disconnecting your wallet.`
              : `Your connected wallet does not auto-switching networks. Please switch your network manually to "Polygon". Alternatively you can try again by disconnecting your wallet.`}
          </DrawerBody>
          <DrawerFooter>
            <Flex w="100%" gap={4} direction={{ base: "column", md: "row" }}>
              <Button
                colorScheme="red"
                onClick={disconnect}
                variant="outline"
                leftIcon={<AiOutlineDisconnect />}
              >
                Disconnect Wallet
              </Button>
              <Button
                ref={initialRef}
                colorScheme="purple"
                isDisabled={!switchNetwork}
                leftIcon={<HiOutlineSwitchHorizontal />}
                onClick={() => switchNetwork(ChainId.Polygon)}
              >
                Switch Network
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return null;
};

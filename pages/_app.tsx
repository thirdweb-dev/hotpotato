import { Flex, Center } from "@chakra-ui/react";
import { ChakraManager } from "../components/chakra/manager";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { Providers } from "../components/provider/provider";
import { ChainId } from "../utils/network";

function PotatoApp({ Component, pageProps }) {
  return (
    <Providers chainId={ChainId.Mumbai}>
      <ChakraManager cookies={pageProps.cookies}>
        <Flex justify="space-around" flexDir="column" minH="100vh">
          <Header />
          <Center flexGrow={1} as="main">
            <Component {...pageProps} />
          </Center>
          <Footer />
        </Flex>
      </ChakraManager>
    </Providers>
  );
}

export default PotatoApp;

export { getServerSideProps } from "../components/chakra/manager";

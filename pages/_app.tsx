import { ChakraManager } from "../components/chakra/manager";
import { Header } from "../components/header/header";
import { Providers } from "../components/provider/provider";

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <ChakraManager cookies={pageProps.cookies}>
        <Header />
        <Component {...pageProps} />
      </ChakraManager>
    </Providers>
  );
}

export default MyApp;

export { getServerSideProps } from "../components/chakra/manager";

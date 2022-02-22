import { Flex, Center } from "@chakra-ui/react";
import { ChakraManager } from "../components/chakra/manager";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { Providers } from "../components/provider/provider";
import { ChainId } from "../utils/network";
import { DefaultSeo } from "next-seo";
import { NetworkSwitcher } from "../components/network-switcher/network-switcher";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

function PotatoApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        defaultTitle="🔥🥔 Game"
        titleTemplate="%s | 🔥🥔 Game"
        description="Help hot potato stay hot buy passing it from your wallet to the next!"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
        openGraph={{
          title: "🔥🥔 Game",
          type: "website",
          locale: "en_US",
          url: BASE_URL,
          site_name: "thirdweb",
          images: [
            {
              url: `${BASE_URL}/og-image.png`,
              width: 1200,
              height: 650,
              alt: "🔥🥔 Game",
            },
          ],
        }}
        twitter={{
          handle: "@thirdweb_",
          site: "@thirdweb_",
          cardType: "summary_large_image",
        }}
      />
      <Providers chainId={ChainId.Polygon}>
        <ChakraManager cookies={pageProps.cookies}>
          <Flex justify="space-around" flexDir="column" minH="100vh">
            <Header />
            <Center flexGrow={1} as="main">
              <Component {...pageProps} />
            </Center>
            <Footer />
            <NetworkSwitcher requiredChainId={ChainId.Polygon} />
          </Flex>
        </ChakraManager>
      </Providers>
    </>
  );
}

export default PotatoApp;

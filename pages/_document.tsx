import Document, { Head, Html, Main, NextScript } from "next/document";

class PotatoDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@300;400;900&display=swap"
            rel="stylesheet"
          />
          <script>global = globalThis;</script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default PotatoDocument;

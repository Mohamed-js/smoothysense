import { Head, Html, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <title>
          SmoothySense: Natural Hair Care Products for Healthier, Beautiful
          Hair.
        </title>
        <link rel="shortcut icon" href="/logoo2.png" type="image/x-icon" />
        <meta
          name="description"
          content="Discover the power of nature's finest ingredients with SmoothySense. Our luxurious hair care products will make your hair shine with radiant vitality."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXXM49JZ"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

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
          content="Discover SmoothySense's range of natural hair care products, including lotions, creams, serums, and hair masks. Experience effective and safe solutions for your hair care needs. Shop now!"
        />
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

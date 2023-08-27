import { Head, Html, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="The premiere natural hair care products."
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

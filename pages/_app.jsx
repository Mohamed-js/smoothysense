import "../styles/globals.css";
import Footer from "../components/Footer";
import Head from "next/head";
import { store } from "../store";
import { Provider } from "react-redux";
import { Readex_Pro } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";

const changa = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TXXM49JZ');`,
          }}
        ></Script>
        <title>SMOOTHYSENSE</title>
        <link rel="shortcut icon" href="/logoo2.png" type="image/x-icon" />
      </Head>
      <main className={`${changa.className}`}>
        <Component {...pageProps} />
        <Footer />
      </main>
    </Provider>
  );
}

export default appWithTranslation(MyApp);

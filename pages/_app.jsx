import "../styles/globals.css";
import Footer from "../components/Footer";
import Head from "next/head";
import { store } from "../store";
import { Provider } from "react-redux";
import { Readex_Pro } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

const readex = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-TXXM49JZ" });
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>SMOOTHYSENSE</title>
        <link rel="shortcut icon" href="/logoo2.png" type="image/x-icon" />
      </Head>
      <main className={`${readex.className}`}>
        <Component {...pageProps} />
        <Footer />
      </main>
    </Provider>
  );
}

export default appWithTranslation(MyApp);

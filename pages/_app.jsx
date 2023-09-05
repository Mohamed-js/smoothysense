import "../styles/globals.css";
import Footer from "../components/Footer";
import Head from "next/head";
import { store } from "../store";
import { Provider } from "react-redux";
import { Readex_Pro } from "next/font/google";
import { appWithTranslation, useTranslation } from "next-i18next";
import TagManager from "react-gtm-module";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getToken } from "../auth";
import { Analytics } from "@vercel/analytics/react";

const readex = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(false);
  const { t } = useTranslation();
  const getUser = async () => {
    const token = await getToken();
    if (token) {
      setToken(token);
    }
  };
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-TXXM49JZ" });
    getUser();
  }, []);

  return (
    <Provider store={store}>
      <main className={`${readex.className}`}>
        <Navbar t={t} loggedIn={token} />
        <Component {...pageProps} />
        <Footer />
      </main>
      <Analytics />
    </Provider>
  );
}

export default appWithTranslation(MyApp);

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

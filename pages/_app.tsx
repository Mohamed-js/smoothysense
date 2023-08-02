import "../styles/globals.css";
import Footer from "../components/Footer";
import Head from "next/head";
import { store } from "../store";
import { Provider } from "react-redux";
import { Readex_Pro } from "next/font/google";
import { appWithTranslation } from "next-i18next";

const changa = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>SmoothySense</title>
        <link rel="shortcut icon" href="/logo-2.png" type="image/x-icon" />
      </Head>
      <main className={`${changa.className}`}>
        <Component {...pageProps} />
        <Footer />
      </main>
    </Provider>
  );
}

export default appWithTranslation(MyApp);

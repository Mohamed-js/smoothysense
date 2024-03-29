import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import HomeProductCard from "../components/HomeProductCard";
import LeftHandedCard from "../components/LeftHandedCard";
import RightHandedCard from "../components/RightHandedCard";
import goal from "../public/goal.png";
import natural from "../public/natural-icon.png";
import experience from "../public/experience-icon.png";
import { useRouter } from "next/router";
import { getCartItems, getProducts } from "../helpers";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getToken } from "../auth";
import { getItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import Head from "next/head";

export default function HomePage({ products }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const { t } = useTranslation();
  const [token, setToken] = useState();

  const getCart = async () => {
    const token = await getToken();
    setLoggedIn(token);
    if (token) {
      getProducts(token);
      setToken(token);
      const res = await getCartItems(token);
      dispatch(getItems(res));
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  let productsRef = useRef();

  const scrollHandler = (e) => {
    e.preventDefault();

    if (router.pathname === "/") {
      // @ts-ignore
      return productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    router.push("/#products");
  };
  const metaTitle = `SmoothySense | Natural Hair Care Products for Healthier, Beautiful Hair.`;

  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <Header scrollHandler={scrollHandler} t={t} loggedIn={loggedIn} />
      <div
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        ref={productsRef}
        id="products"
      >
        <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              {t("our_loved_products")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-5 lg:gap-10">
          {products &&
            products.map((product) => (
              <HomeProductCard
                product={product}
                key={product.id}
                t={t}
                loggedIn={loggedIn}
                token={token}
                locale={router.locale}
              />
            ))}
        </div>
        <br />
        <br />
        <hr />
        <div className="text-center" id="whyus">
          <p className="mt-1 text-4xl font-extrabold uppercase text-gray-900 sm:text-5xl sm:tracking-tight py-28 pb-4">
            {t("why_choose")}{" "}
            <span className="block text-green-500 sm:text-6xl">
              {t("smoothysense")}
            </span>
          </p>
        </div>
        <LeftHandedCard
          image={goal}
          title={t("our_goal")}
          description={t("our_goal_description")}
        />

        <RightHandedCard
          image={natural}
          title={t("natural_ingredients")}
          description={t("natural_ingredients_description")}
        />

        <LeftHandedCard
          image={experience}
          title={t("experience")}
          description={t("experience_description")}
        />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const products = await getProducts();

  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      products: products,
    },
  };
}

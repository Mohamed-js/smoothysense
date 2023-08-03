import { useRef } from "react";
import Header from "../components/Header";
import HomeProductCard from "../components/HomeProductCard";
import LeftHandedCard from "../components/LeftHandedCard";
import RightHandedCard from "../components/RightHandedCard";
import goal from "../public/goal.png";
import natural from "../public/natural-icon.png";
import experience from "../public/experience-icon.png";
import { useRouter } from "next/router";
import { getProducts } from "../helpers";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Gallery({ products }) {
  const router = useRouter();
  const { t } = useTranslation();
  let productsRef = useRef<HTMLDivElement>();
  let whyUsRef = useRef<HTMLDivElement>();

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

  const whyUsScroll = (e) => {
    e.preventDefault();
    if (router.pathname === "/") {
      // @ts-ignore
      return whyUsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    router.push("/#whyus");
  };
  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Header scrollHandler={scrollHandler} whyUs={whyUsScroll} t={t} />
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
        {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => (
              <HomeProductCard product={product} key={product._id} />
            ))}
        </div> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-5 lg:gap-10">
          {products &&
            products.map((product) => (
              <HomeProductCard product={product} key={product._id} t={t} />
            ))}
        </div>
        <br />
        <br />
        <hr />
        <div className="text-center" ref={whyUsRef} id="whyus">
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

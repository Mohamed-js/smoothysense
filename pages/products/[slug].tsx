import Image from "next/image";
import Navbar from "../../components/Navbar";
import CartDialog from "../../components/CartDialog";
import { getProducts, getProduct } from "../../helpers";
import { useState, useEffect } from "react";
import { getToken } from "../../auth";
import NotifyDialog from "../../components/NotifyDialog";
// import AddToCartBtn from "../../components/AddToCartBtn";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Product({ product }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [dialogOpened, setDialogOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifyDialogOpened, setNotifyDialogOpened] = useState(false);
  useEffect(() => {
    checktoken();
  }, []);

  async function checktoken() {
    setLoggedIn(await getToken());
  }
  const handleClick = () => {
    if (loggedIn) {
      return setDialogOpened(true);
    }
    setNotifyDialogOpened(true);
  };

  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Navbar t={t} />
      <div className="flex mt-16 flex-col justify-between">
        <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mx-auto flex flex-col sm:flex-row">
            <Image
              alt={product.slug}
              className="rounded-lg object-contain sm:w-[50%]"
              src={product.image}
              width={1000}
              height={1000}
            />
            <div className="mt-10 flex flex-col sm:mt-0 sm:mx-10">
              <h1
                className="mt-1 text-xl font-semibold uppercase text-gray-600 sm:text-2xl sm:tracking-tight lg:text-3xl"
                dir="ltr"
              >
                {product.title}
              </h1>
              <h1 className="mt-3 text-xl font-bold sm:text-2xl sm:tracking-tight lg:text-2xl">
                {product.price} {t("egp")}
              </h1>
              <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
                {t("description")}
              </div>
              <p className="max-w-xl">
                {router.locale === "ar"
                  ? product.ar_description
                  : product.description}
              </p>
              <button
                className="text-white bg-green-400 rounded p-2 mt-8 relative w-fit font-bold"
                onClick={handleClick}
              >
                {t("add_to_cart")}
              </button>
              {/* <AddToCartBtn handleClick={handleClick} /> */}
              {dialogOpened && (
                <CartDialog
                  product={product}
                  setDialogOpened={setDialogOpened}
                  t={t}
                />
              )}
              {notifyDialogOpened && (
                <NotifyDialog setDialogOpened={setNotifyDialogOpened} t={t} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params, locale }) {
  const product = await getProduct(params.slug);

  return {
    props: { product: product, ...(await serverSideTranslations(locale)) },
  };
}

export async function getStaticPaths({ locales }) {
  const products = await getProducts();
  const paths = [];
  locales.forEach((locale) => {
    products.forEach((product) => {
      paths.push({
        params: {
          slug: product.slug,
        },
        locale,
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

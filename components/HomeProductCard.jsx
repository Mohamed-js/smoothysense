import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CartDialog from "./CartDialog";
import NotifyDialog from "./NotifyDialog";
import { getToken } from "../auth";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeProductCard({
  product,
  t,
  loggedIn,
  token,
  locale,
}) {
  const [isLoading, setLoading] = useState(true);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [notifyDialogOpened, setNotifyDialogOpened] = useState(false);

  const handleClick = () => {
    if (loggedIn) {
      return setDialogOpened(true);
    }
    setNotifyDialogOpened(true);
  };

  return (
    <div className="group max-w-2xl mx-auto home-card w-full rounded-md overflow-hidden relative flex flex-col">
      <div className="aspect-w-9 aspect-h-10 w-full overflow-hidden bg-gray-200 max-h-[200px] mb-2">
        <Link href={`/products/${product.slug}`} className="img-link">
          <Image
            alt="product image"
            src={product.image}
            fill
            className={cn(
              "object-cover duration-700 ease-in-out group-hover:opacity-75",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </Link>
      </div>

      <div className="info flex flex-col justify-between flex-1">
        <div className="text-base font-semibold text-gray-900">
          <h3
            className="capitalize text-sm font-thin text-gray-600 leading-5"
            dir="ltr"
          >
            {product.title}
          </h3>
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            className="bg-green-400 text-white rounded p-1 px-3 text-sm sm:text-base"
            id={product.slug}
            locale={locale}
            data-logged-in={loggedIn ? true : false}
            onClick={handleClick}
          >
            {t("add_to_cart")}
          </button>
          <p className="text-sm sm:text-base">
            {product.price} {t("egp")}
          </p>
        </div>
      </div>

      {dialogOpened && (
        <CartDialog
          product={product}
          setDialogOpened={setDialogOpened}
          t={t}
          token={token}
        />
      )}

      {notifyDialogOpened && (
        <NotifyDialog setDialogOpened={setNotifyDialogOpened} t={t} />
      )}
    </div>
  );
}

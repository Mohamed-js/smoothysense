import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CartDialog from "./CartDialog";
import NotifyDialog from "./NotifyDialog";
import { getToken } from "../auth";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeProductCard({ product, t }) {
  const [isLoading, setLoading] = useState(true);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [notifyDialogOpened, setNotifyDialogOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
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
    <div className="group grid grid-cols-1 max-w-2xl mx-auto gap-2 home-card w-full rounded-md overflow-hidden">
      <Link href={`/products/${product.slug}`} className="img-link">
        <div className="aspect-w-9 aspect-h-10 w-full overflow-hidden bg-gray-200">
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
        </div>
      </Link>
      <div className="info">
        <div className="text-base font-semibold text-gray-900">
          <h3
            className="capitalize font-thin text-gray-600 leading-5 mt-1"
            dir="ltr"
          >
            {product.title}
          </h3>
        </div>
        {/* <p className="mt-1 text-md italic text-gray-500 line-clamp-5">
          {product.description}
        </p> */}
        <div className="flex justify-between items-center mt-2">
          <button
            className="bg-green-400 text-white rounded p-1 px-3 text-sm sm:text-base"
            onClick={handleClick}
          >
            {t("add_to_cart")}
          </button>
          <p dir="ltr" className="text-sm sm:text-base">
            {product.price} EGP
          </p>
        </div>
      </div>

      {dialogOpened && (
        <CartDialog product={product} setDialogOpened={setDialogOpened} t={t} />
      )}
      {notifyDialogOpened && (
        <NotifyDialog setDialogOpened={setNotifyDialogOpened} t={t} />
      )}
    </div>
  );
}

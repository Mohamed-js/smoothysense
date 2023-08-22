import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CartDialog from "./CartDialog";
import NotifyDialog from "./NotifyDialog";
import { getToken } from "../auth";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductCard({ product, t }) {
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
    <div className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt="product image"
            src={product.image}
            fill
            className={cn(
              "object-cover duration-700 ease-in-out group-hover:opacity-75	",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
          <h3 className="capitalize font-bold text-xl">{product.title}</h3>
          <p>{product.price} EGP</p>
        </div>
        <p className="mt-1 text-sm italic text-gray-500 line-clamp-3">
          {product.description}
        </p>
      </Link>
      <button
        className="bg-green-400 text-white rounded p-2 px-4 mt-2"
        onClick={handleClick}
      >
        ADD TO CART
      </button>

      {dialogOpened && (
        <CartDialog
          product={product}
          setDialogOpened={setDialogOpened}
          t={t}
          token={loggedIn}
        />
      )}
      {/* {notifyDialogOpened && (
        <NotifyDialog setDialogOpened={setNotifyDialogOpened} t={t} />
      )} */}
    </div>
  );
}

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../public/logoo2.png";
import Link from "next/link";
import { FaBars, FaShoppingBag } from "react-icons/fa";
import { getToken } from "../auth";
import { getCartItems } from "../helpers";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../slices/cartSlice";
import NotifyDialog from "./OrderNotifyDialog";
import { useRouter } from "next/router";

const Navbar = ({ t }) => {
  const router = useRouter();
  const [menuOpened, setMenuOpened] = useState(false);
  const [notifyDialogOpened, setNotifyDialogOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const cartItems = useSelector((state) => state.cart_items.value);
  const dispatch = useDispatch();

  const getCart = async () => {
    setLoggedIn(await getToken());
    const res = await getCartItems();
    dispatch(getItems(res));
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleClick = () => {
    setMenuOpened((prev) => !prev);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setCartOpened(true);
  };

  return (
    <>
      {/* Notification */}
      {notifyDialogOpened && (
        <NotifyDialog setDialogOpened={setNotifyDialogOpened} t={t} />
      )}
      {/* CART */}
      {cartOpened && (
        <Cart
          closeCart={() => setCartOpened(false)}
          cartItems={cartItems}
          openNotification={() => setNotifyDialogOpened(true)}
          t={t}
        />
      )}
      {menuOpened && (
        <div className="flex flex-col items-center pt-20 top-20 left-0 h-screen w-full bg-[#ffffffe3]  text-2xl font-bold z-20 sm:hidden fixed">
          {!loggedIn && (
            <Link
              href="/login"
              className="my-5 outline outline-green-500 text-green-500 rounded p-1 px-4"
            >
              {t("login")}
            </Link>
          )}
          <Link href="/" className="my-5 cursor-pointer">
            {t("home")}
          </Link>
          <Link href="/#products" className="my-5 cursor-pointer">
            {t("our_products")}
          </Link>
          {/* <Link href="/blogs" className="my-5">
            Blog
          </Link> */}
          <Link href="/#whyus" className="my-5 cursor-pointer">
            {t("why_us")}
          </Link>
        </div>
      )}
      <div className="flex justify-between p-4 w-full z-10 fixed top-0 left-0 bg-white items-center sm:shadow-md">
        <div className="flex items-center flex-1">
          <span className="h-16 relative">
            <Link href="/" className="my-5 cursor-pointer">
              <Image
                priority
                height={500}
                className="h-full w-full object-contain"
                src={logo}
                placeholder="blur"
                alt="SmoothySense"
              />
            </Link>
          </span>
        </div>
        <div className="hidden sm:flex items-center flex-row flex-1 text-base whitespace-nowrap font-semibold ">
          <Link href="/" className="mx-2 cursor-pointer">
            {t("home")}
          </Link>
          <Link href="/#products" className="mx-2 cursor-pointer">
            {t("our_products")}
          </Link>
          {/* <Link href="/blogs" className="mr-2">
            Blog
          </Link> */}
          <Link href="/#whyus" className="mr-2 cursor-pointer">
            {t("why_us")}
          </Link>
        </div>
        <div className="sm:hidden items-center text-green-500 flex">
          {loggedIn && (
            <Link
              href="/cart"
              onClick={handleCartClick}
              className="mr-4 mb-1 text-green-500 relative"
            >
              {cartItems.length > 0 && (
                <span className="rounded-full bg-red-600 text-white flex items-center justify-center absolute top-[-5px] left-[5px] w-5 h-5">
                  {cartItems.length}
                </span>
              )}
              <FaShoppingBag size={24} />
            </Link>
          )}
          <FaBars size={20} onClick={handleClick} />
        </div>
        <div className="hidden sm:flex items-end">
          {loggedIn ? (
            <div className="flex relative">
              <Link
                href="/cart"
                onClick={handleCartClick}
                className="mx-4 mb-1 text-green-500"
              >
                {cartItems && cartItems.length > 0 && (
                  <span className="rounded-full bg-red-600 text-white flex items-center justify-center absolute top-[-5px] left-[5px] w-5 h-5">
                    {cartItems.length}
                  </span>
                )}
                <FaShoppingBag size={24} />
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="mr-2 outline outline-green-500 text-green-500 rounded p-1 px-4"
            >
              {t("login")}
            </Link>
          )}
          <Link
            href={router.asPath}
            locale={t("lang_to")}
            className="mx-2 outline outline-green-500 text-green-500 rounded p-1 px-4"
          >
            {t("lang")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

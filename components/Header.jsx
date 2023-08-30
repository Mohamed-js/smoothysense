import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import img from "../public/hero.jpg";
import logo from "../public/logoo2.png";
import bghero from "../public/bghero-trans.png";
// import bgvid from "../public/vid.mp4";
import Link from "next/link";
import { FaBars, FaShoppingBag } from "react-icons/fa";
import { getToken } from "../auth";
import { getCartItems } from "../helpers";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../slices/cartSlice";
import NotifyDialog from "./OrderNotifyDialog";
import ReactPlayer from "react-player";

export default function Header({ scrollHandler, whyUs, t, loggedIn }) {
  const cartItems = useSelector((state) => state.cart_items.value);
  const [notifyDialogOpened, setNotifyDialogOpened] = useState(false);

  const [menuOpened, setMenuOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);

  const handleClick = () => {
    setMenuOpened((prev) => !prev);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setCartOpened(true);
  };

  return (
    <header className="relative">
      <div className="mx-auto h-full pt-20 sm:pt-28">
        <div className="relative sm:overflow-hidden h-full flex items-end">
          <div className="absolute inset-0 h-full">
            {/* <Image
              priority
              fill
              className="h-full w-full object-cover"
              src={img}
              placeholder="blur"
              alt="SmoothySense"
            /> */}
            {/* https://i.vimeocdn.com/video/810735117-9223db8da9dbc147c4873551cf481af6632c12877d7323e7f87a16d7390d8d79-d?mw=1300&mh=731&q=70 */}
            {/* <video
              ref={videoRef}
              loop
              muted
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                maxWidth: "none",
                position: "relative",
              }}
            >
              <source src={"/vid.mp4"}></source>
            </video> */}
            {/* <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" /> */}
          </div>
          <div className="flex justify-center w-full h-full py-10 flex-col sm:flex-row text-center">
            <div className="relative px-4 sm:px-6 lg:px-8 sm:mb-10">
              <h1 className="mt-1 font-bold text-gray-900 text-4xl xs:text-6xl sm:tracking-tight sm:text-7xl md:text-8xl">
                <span className="block text-green-500">SmoothySense</span>
                <p className="relative left-0 right-0 max-w-2xl text-lg sm:text-2xl font-thin uppercase tracking-wide mt-2">
                  {t("header")}
                </p>
              </h1>
              <div className="mt-5 max-w-xs flex sm:max-w-none justify-center">
                <button
                  className="flex items-center justify-center rounded-md border border-transparent bg-transparent px-4 py-3 text-base font-medium text-green-500 outline outline-green-500 shadow-sm hover:bg-green-400 hover:text-white sm:px-8 transition"
                  onClick={scrollHandler}
                >
                  {t("shop_now")}
                </button>
              </div>
            </div>
            {/* <div className="relative h-full w-full">
              <Image
                priority
                fill
                className="h-full w-full object-contain object-left-top opacity-70"
                src={bghero}
                placeholder="blur"
                alt="SmoothySense"
                style={{
                  transform: "rotate(180deg)",
                }}
              />
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { addToCart, minusFromCart, removeFromCart } from "../helpers";
import { useDispatch } from "react-redux";
import { getItems } from "../slices/cartSlice";
import Checkout from "./Checkout";

const Cart = ({
  closeCart,
  cartItems,
  openNotification,
  t,
  loggedIn,
  token,
}) => {
  const [checkoutOpened, setCheckoutOpened] = useState(false);

  return (
    <div className="h-full w-full fixed top-0 left-0 flex justify-center items-center z-50 bg-[#17171771]">
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-full box-border outline-2 outline outline-transparent outline-offset-2">
        <div className="absolute top-0 right-0 bottom-0 left-0 ">
          <div
            className={`
              overflow-auto relative overflow-x-hidden top-0 bg-white z-[5000] h-full w-full translate-x-0 lg:w-2/4 px-4 
               ${t("lang_to") !== "en" ? " ml-auto" : " mr-auto"} `}
          >
            <header className="sticky top-0 bg-white mb-4 flex justify-between items-center py-4">
              <button
                aria-label="Close"
                className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none mr-6"
              >
                <div
                  className="flex justify-center items-center"
                  onClick={() => closeCart()}
                >
                  <span className="flex justify-center items-center text-2xl ease-in-out duration-500  w-10 h-10 border hover:border-gray-300">
                    ×
                  </span>
                  <span className="mx-2 text-accent-7 text-sm">
                    {t("close")}
                  </span>
                </div>
              </button>
              <div className="flex">
                <svg
                  onClick={() => closeCart()}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>
              </div>
            </header>

            {!checkoutOpened && (
              <>
                {cartItems.length > 0 &&
                  cartItems.map((item, i) => {
                    return (
                      <CartCard
                        index={i}
                        item={item}
                        key={item.id + item.title}
                        cartItems={cartItems}
                        t={t}
                        loggedIn={loggedIn}
                        token={token}
                      />
                    );
                  })}

                {cartItems.length > 0 && (
                  <div className="sticky bottom-0 bg-white flex-shrink-0 px-3 py-3 sm:px-3 w-full right-0 left-0 bg-accent-0 border-t text-sm">
                    <ul className="pb-2">
                      <li className="flex justify-between py-1">
                        <span>{t("subtotal")}</span>

                        <span
                          className={`flex gap-1 ${
                            t("lang_to") === "en" && " flex-row-reverse"
                          }`}
                        >
                          <span>{t("egp")} </span>
                          <span>
                            {" "}
                            {cartItems.reduce(
                              (accumulator, item) =>
                                accumulator +
                                item.user_product.quantity * item.price,
                              0
                            )}
                          </span>
                        </span>
                      </li>
                      <li className="flex justify-between py-1">
                        <span>{t("shipping")}</span>
                        <span className="font-semibold">{t("free")}</span>
                      </li>
                      <li className="flex justify-between py-1"></li>
                    </ul>
                    <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
                      <span className="text-lg">{t("total")}</span>
                      <span
                        className={`flex gap-1 ${
                          t("lang_to") === "en" && " flex-row-reverse"
                        }`}
                      >
                        <span>{t("egp")} </span>
                        <span>
                          {" "}
                          {cartItems.reduce(
                            (accumulator, item) =>
                              accumulator +
                              item.user_product.quantity * item.price,
                            0
                          )}
                        </span>
                      </span>
                    </div>
                    <div>
                      <button
                        className="text-lg w-full bg-black text-white pt-4 pb-4 text-center "
                        onClick={() => setCheckoutOpened(true)}
                        data-variant="flat"
                      >
                        {t("proceed_checkout")}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {checkoutOpened && (
              <Checkout
                t={t}
                closeCart={closeCart}
                openNotification={openNotification}
                loggedIn={loggedIn}
                token={token}
              />
            )}

            {cartItems.length === 0 && (
              <div className="h-96 flex items-center justify-center uppercase flex-col">
                <h2 className="text-lg">{t("cart_is_empty")}</h2>
                <Link href="/" onClick={() => closeCart()}>
                  <button className="rounded-md border border-transparent outline outline-green-500 px-4 py-3 text-base font-medium shadow-sm hover:bg-green-400 text-green-500 hover:text-white sm:px-8 mt-5 transition duration-500 ">
                    {t("shop_now")}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export const CartCard = ({ item, t, loggedIn, token }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const DeleteProduct = async () => {
    setLoading(true);
    let res;
    if (token) {
      res = await removeFromCart(item.user_product.id, token);
    } else {
      res = await removeFromCart(item.user_product.id, loggedIn);
    }

    if ((res.message = "Successfully Removed")) {
      dispatch(getItems(res.cart_items));
      setLoading(false);
    }
  };

  const increaseProduct = async () => {
    setLoading(true);
    let res;
    if (token) {
      res = await addToCart(item.user_product.id, 1, token);
    } else {
      res = await addToCart(item.user_product.id, 1, loggedIn);
    }

    if ((res.message = "Successfully Added")) {
      dispatch(getItems(res.cart_items));
      setLoading(false);
    }
  };

  const decreaseProduct = async () => {
    setLoading(true);
    let res;
    if (token) {
      res = await minusFromCart(item.user_product.id, token);
    } else {
      res = await minusFromCart(item.user_product.id, loggedIn);
    }

    if ((res.message = "Successfully Minused")) {
      dispatch(getItems(res.cart_items));
      setLoading(false);
    }
  };

  return (
    <>
      <div key={item.id} className="pt-2">
        <div className="flex justify-between items-start py-3">
          <div className="flex gap-4">
            <div className="img-parent min-w-[100px]">
              <Image
                src={item.image}
                width={80}
                height={80}
                alt={item.title}
                className="rounded-md"
              />
            </div>
            <div>
              <h3 className="text-sm font-thin sm:text-xl capitalize text-gray-600">
                {item.title}
              </h3>
              <h3 className="text-normal font-semibold sm:text-xl capitalize">
                {item.price}{" "}
                <span className="text-sm">
                  {t("egp")}/{t("unit")}
                </span>
              </h3>
            </div>
          </div>
          <div>{/* <span>${product.price * product.quantity}</span> */}</div>
        </div>
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => DeleteProduct(item.product)}
            className={`ease-in-out duration-500 w-12 h-12 border hover:border-gray-300 text-xl ${
              loading && "bg-gray-200 text-black cursor-wait"
            }`}
            disabled={loading}
          >
            ×
          </button>

          <input
            className="w-full ease-in-out duration-500 p-3 outline-none hover:border-gray-300 border h-12"
            type="number"
            value={item.user_product.quantity}
            readOnly
          />

          <button
            className={`ease-in-out duration-500 w-12 h-12 border hover:border-gray-300 text-xl ${
              loading && "bg-gray-200 text-black cursor-wait"
            }`}
            style={{
              cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              if (item.quantity <= 1) {
                return;
              } else {
                decreaseProduct();
              }
            }}
            disabled={loading}
          >
            -
          </button>
          <button
            className={`ease-in-out duration-500 w-12 h-12 border hover:border-gray-300 text-xl ${
              loading && "bg-gray-200 text-black cursor-wait"
            }`}
            style={{
              cursor: item.quantity >= 20 ? "not-allowed" : "pointer",
            }}
            onClick={() => increaseProduct()}
            disabled={loading}
          >
            +
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

import { useState } from "react";
import { getItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { placeOrder } from "../helpers";
import { useRouter } from "next/router";

const Checkout = ({ closeCart, openNotification, t, loggedIn, token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    var formData = Object.fromEntries(new FormData(e.target));
    let res;
    if (token) {
      res = await placeOrder(formData, token);
    } else {
      res = await placeOrder(formData, loggedIn);
    }

    if ((res.message = "Successfully Placed Order")) {
      // openNotification();
      closeCart();
      dispatch(getItems([]));
      router.push("/success");
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">{t("checkout")}</h1>
      <br />
      <form onSubmit={handleSubmit}>
        {/* <div className="flex justify-between">
          <input
            type="text"
            name="first_name"
            placeholder={t("first_name")}
            className="p-2 border rounded w-1/2 focus:outline mt-3 mx-3"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder={t("last_name")}
            className="p-2 border rounded w-1/2 focus:outline mt-3"
            required
          />
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            name="country"
            placeholder={t("country")}
            className="p-2 border rounded w-1/2 focus:outline mt-3 mx-3"
            required
          />
          <input
            type="text"
            name="city"
            placeholder={t("city")}
            className="p-2 border rounded w-1/2 focus:outline mt-3"
            required
          />
        </div> */}
        <input
          type="text"
          name="first_name"
          placeholder={t("first_name")}
          className="p-2 border rounded w-[97%] focus:outline mt-3 mx-3"
          required
        />
        <input
          type="text"
          name="city"
          placeholder={t("city")}
          className="p-2 border rounded w-[97%] focus:outline mt-3 mx-3"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder={t("phone")}
          className="p-2 border rounded w-[97%] focus:outline mt-3 mx-3"
          required
        />
        <textarea
          type="text"
          name="address"
          placeholder={t("address")}
          className="p-2 border rounded w-[97%] focus:outline mt-3 mb-1 mx-3"
          required
        ></textarea>

        <button
          className="text-lg w-full bg-black text-white pt-4 pb-4 text-center"
          data-variant="flat"
        >
          {t("confirm_order")}
        </button>
      </form>
    </div>
  );
};

export default Checkout;

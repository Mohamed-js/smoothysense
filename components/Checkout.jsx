import { useState } from "react";
import { getItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { placeOrder } from "../helpers";
import { useRouter } from "next/router";

const Checkout = ({ closeCart, openNotification, t, loggedIn, token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [withPromoCode, setWithPromoCode] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var formData = Object.fromEntries(new FormData(e.target));
    let res;
    if (token) {
      res = await placeOrder(formData, token);
    } else {
      res = await placeOrder(formData, loggedIn);
    }

    if (res && res.message && res.message === "Successfully Placed Order") {
      // openNotification();
      closeCart();
      dispatch(getItems([]));
      return router.push("/success");
    }

    if (res && res.error && res.error === "invalid promocode") {
      return setError(t("invalid_promocode"));
    }
    if (res && res.error && res.error === "outdated promocode") {
      return setError(t("outdated_promocode"));
    }
    if (res && res.error && res.error === "consumed promocode") {
      return setError(t("consumed_promocode"));
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
        <br />
        {!withPromoCode && (
          <p
            onClick={() => setWithPromoCode(true)}
            className="text-sm underline mb-2 mt-3 mx-3 cursor-pointer"
          >
            {t("i_have_promo_code")}
          </p>
        )}
        {withPromoCode && (
          <>
            <input
              type="text"
              name="promo_code"
              placeholder={t("promo_code")}
              className="p-2 border rounded w-[97%] focus:outline mt-3 mx-3 mb-3"
            />
            {error && (
              <p className="text-sm underline mb-2 mt-3 mx-3 text-red-500">
                {error}
              </p>
            )}
          </>
        )}

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

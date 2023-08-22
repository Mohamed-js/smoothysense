import { useState } from "react";
import { addToCart } from "../helpers";
import { getItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const CartDialog = ({ product, setDialogOpened, t, token }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    var formData = Object.fromEntries(new FormData(e.target));
    const res = await addToCart(
      formData.product_id,
      Number(formData.quantity),
      token
    );

    console.log(res);
    if (res.message === "Successfully Added") {
      dispatch(getItems(res.cart_items));
      setLoading(false);
      setDialogOpened(false);
    }
  };
  return (
    <div className="fixed w-screen h-screen bg-gray-300/50 flex items-center justify-center top-0 left-0 z-50">
      <div className="w-64 rounded-lg bg-white p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="capitalize font-semibold">{product.title}</h4>
          <span
            onClick={() => setDialogOpened(false)}
            className="cursor-pointer text-lg font-semibold"
          >
            ×
          </span>
        </div>

        <hr />
        <br />
        <form onSubmit={handleSubmit} className="flex flex-col justify-between">
          <label htmlFor="quantity">{t("how_many_pieces")}</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min={1}
            className="border border-gray-100 rounded p-2"
            defaultValue={1}
          />
          <input
            type="hidden"
            name="product_id"
            id="product_id"
            value={product.id}
          />
          <br />
          <button
            className={`${
              loading
                ? "bg-gray-200 text-black cursor-wait"
                : "bg-green-400 text-white"
            } rounded p-2 px-4 mt-2 justify-self-end`}
            disabled={loading}
          >
            {t("add")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartDialog;

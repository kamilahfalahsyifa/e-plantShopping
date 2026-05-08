import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeItem,
} from "../features/cart/CartSlice";
import { Link } from "react-router-dom";

export default function CartItem() {
  const dispatch = useDispatch();

  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const cartItems = Object.values(items);

  const increaseQuantity = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10">
          Shopping Cart
        </h1>

        {/* Summary */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-8 flex justify-between items-center">
          <p className="text-lg font-medium">
            Total Cart Items:
            <span className="font-bold ml-2">
              {totalQuantity}
            </span>
          </p>

          <p className="text-lg font-medium">
            Total Amount:
            <span className="font-bold text-green-700 ml-2">
              ${totalPrice}
            </span>
          </p>
        </div>

        {/* Cart Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              Your cart is empty
            </p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white rounded-2xl shadow-md p-5"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-contain rounded-lg"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-green-700 font-semibold">
                  Unit Price: ${item.price}
                </p>

                <p className="font-medium">
                  Total Cost:
                  ${item.price * item.quantity}
                </p>

                <p>Quantity: {item.quantity}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => increaseQuantity(item)}
                  className="px-4 py-2 rounded bg-green-600 text-white"
                >
                  Increase
                </button>

                <button
                  onClick={() => decreaseQuantity(item)}
                  className="px-4 py-2 rounded bg-gray-300"
                >
                  Decrease
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="text-red-500 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        {cartItems.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10 flex flex-col sm:flex-row gap-4 justify-between">
            <button className="px-6 py-3 rounded-full bg-gray-500 text-white font-semibold">
              Checkout
            </button>

            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-green-600 text-white font-semibold text-center"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

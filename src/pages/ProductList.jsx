import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/CartSlice";
import { plants } from "../../data/plants";

export default function ProductList() {
  const dispatch = useDispatch();

  const categories = [...new Set(plants.map((p) => p.category))];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Navbar */}
      <nav className="flex gap-6 mb-10 text-lg font-semibold">
        <Link to="/">Home</Link>
        <Link to="/products">Plants</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-green-800 mb-12">
        Our Plants Collection
      </h1>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat} className="mb-14">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            {cat}
          </h2>

          {/* Plant Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plants
              .filter((plant) => plant.category === cat)
              .map((plant) => (
                <div
                  key={plant.id}
                  className="bg-white rounded-xl shadow-md p-4"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-52 object-cover rounded-lg mb-4"
                  />

                  <h3 className="text-xl font-bold mb-2">
                    {plant.name}
                  </h3>

                  <p className="text-gray-600 mb-2">
                    ${plant.price}
                  </p>

                  <button
                    onClick={() => handleAddToCart(plant)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

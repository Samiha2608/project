import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden mb-4">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
                <button
                  onClick={() => handleRemove(item)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClearCart}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-4 transition duration-300"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

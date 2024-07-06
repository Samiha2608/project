import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const cartItemCount = useSelector((state) => state.cart.items.length);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-tight hover:text-gray-300">
          E-Commerce
        </Link>
        <div className="flex-grow flex justify-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-lg hover:text-gray-300">Makeup</Link>
            <Link to="/shopping2" className="text-lg hover:text-gray-300">Men T-shirts</Link>
            <Link to="/shopping3" className="text-lg hover:text-gray-300">Jewelery</Link>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/admin" className="text-lg hover:text-gray-300">Admin</Link>
          <div className="relative">
            <Link to="/cart" className="flex items-center justify-center text-xl hover:text-gray-300">
              <FaShoppingCart className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

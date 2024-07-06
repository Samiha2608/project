import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const getProductImage = (product) => {
    if (product.category === 'shopping1') {
      return product.thumbnail || 'https://via.placeholder.com/150';
    } else if (product.category === 'shopping2') {
      return product.image || 'https://via.placeholder.com/150';
    } else if (product.category === 'shopping3') {
      return product.image || 'https://via.placeholder.com/150';
    }
    return 'https://via.placeholder.com/150';
  };

  return (
    <div className="border p-4 transition duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1 hover:scale-105">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={getProductImage(product)}
          alt={product.title}
          className="w-full h-48 object-cover mb-4"
        />
        <h2 className="text-xl font-bold">{product.title}</h2>
        <p>{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

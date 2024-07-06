import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addItem } from '../redux/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const product = products.find((product) => product.id === Number(id));

  useEffect(() => {
    // Optional: Fetch product details if needed
    // Example: dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      navigate('/cart'); // Redirect to cart page or handle as needed
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addItem(product));
      navigate('/checkout'); // Redirect to checkout page or handle as needed
    }
  };

  if (!product) {
    return <div className="container mx-auto">Product not found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center">
        <div className="w-1/2">
          <img src={product.image || product.images?.[0]} alt={product.title} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="w-1/2 ml-8">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-500 mb-4">${product.price}</p>
          <div className="flex">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white px-6 py-3 ml-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../redux/slices/productsSlice';

const ProductList = ({ api, category }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items.filter(product => product.category === category));
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts(api));
  }, [dispatch, api]);

  if (productStatus === 'loading') {
    return (
      <div className="container mx-auto text-center mt-8">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (productStatus === 'failed') {
    return (
      <div className="container mx-auto text-center mt-8">
        <p className="text-2xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products && products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

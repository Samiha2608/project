import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from '../redux/slices/productsSlice';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleSaveProduct = (product) => {
    if (currentProduct) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    setCurrentProduct(null);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <ProductForm
        currentProduct={currentProduct}
        onSave={handleSaveProduct}
      />
      <h2 className="text-2xl font-bold mt-8">Product List</h2>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Price</th>
            <th className="py-2">Category</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2">{product.title}</td>
              <td className="py-2">${product.price}</td>
              <td className="py-2">{product.category}</td>
              <td className="py-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProductForm = ({ currentProduct, onSave }) => {
  const [title, setTitle] = useState(currentProduct ? currentProduct.title : '');
  const [description, setDescription] = useState(currentProduct ? currentProduct.description : '');
  const [price, setPrice] = useState(currentProduct ? currentProduct.price : '');
  const [image, setImage] = useState(currentProduct ? currentProduct.image : '');
  const [category, setCategory] = useState(currentProduct ? currentProduct.category : 'shopping1');

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: currentProduct ? currentProduct.id : Date.now(),
      title,
      description,
      price,
      image,
      category,
    };
    onSave(product);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{currentProduct ? 'Edit Product' : 'Add Product'}</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
          rows="4"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
        <input
          type="number"
          id="price"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          id="image"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="shopping1">Shopping 1</option>
          <option value="shopping2">Shopping 2</option>
          <option value="shopping3">Shopping 3</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {currentProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ManageProducts;

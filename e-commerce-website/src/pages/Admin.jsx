import React, { useState } from 'react';
import ManageProducts from './ManageProducts';
import ManageUsers from './ManageUsers';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`ml-2 px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Users
        </button>
      </div>
      {activeTab === 'products' ? <ManageProducts /> : <ManageUsers />}
    </div>
  );
};

export default Admin;

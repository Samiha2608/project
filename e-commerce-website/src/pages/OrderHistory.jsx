import React from 'react';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const orders = useSelector((state) => state.orders.items);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center">Order History</h1>
      <div className="max-w-lg mx-auto">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No past orders found.</p>
        ) : (
          <div>
            {orders.map((order, index) => (
              <div key={index} className="bg-white shadow-md rounded p-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Order {index + 1}</h2>
                <div className="mb-4">
                  <p className="text-gray-700"><span className="font-bold">Name:</span> {order.name}</p>
                  <p className="text-gray-700"><span className="font-bold">Address:</span> {order.address}</p>
                  <p className="text-gray-700"><span className="font-bold">Email:</span> {order.email}</p>
                  <p className="text-gray-700"><span className="font-bold">Date:</span> {new Date(order.date).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Items:</h3>
                  {order.items.map((item) => (
                    <div key={item.id} className="bg-gray-100 rounded p-2 mb-2">
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-gray-700">${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

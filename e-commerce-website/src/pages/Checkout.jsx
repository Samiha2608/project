import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { addOrder } from '../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const order = {
        ...formData,
        items: cartItems,
        date: new Date().toISOString(),
      };
      dispatch(addOrder(order));
      dispatch(clearCart());
      navigate('/order-history');
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8 text-center">Checkout</h1>
      <div className="max-w-lg mx-auto">
        {step === 1 && (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="paymentMethod">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="p-2 border-2 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>
            <p className="mb-2">
              <span className="font-bold">Name:</span> {formData.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Address:</span> {formData.address}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span> {formData.email}
            </p>
            <p className="mb-4">
              <span className="font-bold">Payment Method:</span>{' '}
              {formData.paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}
            </p>

            {formData.paymentMethod === 'credit-card' && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded mb-2 focus:outline-none focus:border-blue-500"
                  required
                />
                <div className="flex">
                  <div className="w-1/2 mr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiration">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expiration"
                      name="expiration"
                      value={formData.expiration}
                      onChange={handleChange}
                      className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="w-1/2 ml-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex mt-8">
              <button onClick={handleBack} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-4 hover:bg-gray-400 transition duration-300">
                Back
              </button>
              <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Complete Order
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.length > 0 && (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <p alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p>${item.price}</p>
                  </div>
                </div>
                <p className="text-gray-600">{item.quantity}x</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

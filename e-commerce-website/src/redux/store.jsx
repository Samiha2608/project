// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    users: usersReducer,
  },
});

export default store;

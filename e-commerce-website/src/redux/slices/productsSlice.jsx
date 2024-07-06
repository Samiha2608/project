import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (api) => {
    const response = await fetch(api);
    const data = await response.json();

    if (api.includes('dummyjson')) {
      return data.products.map(product => ({ ...product, category: 'shopping1' }));
    } else if (api.includes('fakestoreapi') && api.includes('category/jewelery')) {
      return data.map(product => ({ ...product, category: 'shopping3' }));
    } else if (api.includes('fakestoreapi')) {
      return data.map(product => ({ ...product, category: 'shopping2' }));
    }
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;

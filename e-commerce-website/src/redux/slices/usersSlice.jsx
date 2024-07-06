import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.items.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.items = state.items.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.items.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;

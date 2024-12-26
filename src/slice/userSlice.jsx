import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const { index, userData } = action.payload;
      state.users[index] = userData;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

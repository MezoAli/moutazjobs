import { createSlice } from "@reduxjs/toolkit";

interface User {
  createdAt: String;
  email: String;
  employmentType: String;
  isAdmin: Boolean;
  name: String;
  updatedAt: String;
  _id: String;
}
const initialState = {
  user: {} as User,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { getCurrentUser } = userSlice.actions;

export default userSlice.reducer;

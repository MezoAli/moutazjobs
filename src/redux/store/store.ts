import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import loadingReducer from "@/redux/slices/loadingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

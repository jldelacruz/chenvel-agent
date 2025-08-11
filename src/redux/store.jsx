import { configureStore } from "@reduxjs/toolkit";
import { chenvelApi } from "./chenvel";
import userSliceReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    [chenvelApi.reducerPath]: chenvelApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(chenvelApi.middleware),
});

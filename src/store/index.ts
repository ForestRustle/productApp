import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

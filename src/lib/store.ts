// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/authSlice';
import tokenMiddleware from './middleware/middleware';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tokenMiddleware),
});

// Infer the type of the store
export type AppStore = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

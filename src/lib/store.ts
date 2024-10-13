// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/authSlice'; // Adjust the import according to your folder structure
import tokenMiddleware from './middleware/middleware'; // Adjust the import according to your folder structure

export const store = configureStore({
    reducer: {
        auth: authReducer, // Add your auth reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tokenMiddleware), // Add your custom middleware
});

// Infer the type of the store
export type AppStore = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

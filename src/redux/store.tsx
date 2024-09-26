import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

// Create the Redux store with the root reducer
export const store = configureStore({
  reducer: rootReducer, // Use the rootReducer here
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

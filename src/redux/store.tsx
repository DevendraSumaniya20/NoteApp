// store.ts
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

// Create the Redux store with the root reducer
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {notes: NoteState, ...} // Assuming you have other reducers
export type AppDispatch = typeof store.dispatch;

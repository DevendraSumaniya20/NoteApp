import {combineReducers} from '@reduxjs/toolkit';
import noteReducer from '../slices/noteSlice';
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
  notes: noteReducer,
  auth: authReducer,
  // You can add more slices here when needed
});

export default rootReducer;

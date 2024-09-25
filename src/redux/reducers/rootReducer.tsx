import noteReducer from '../slices/noteSlice';

import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  notes: noteReducer, // Note that we are naming this 'notes'
  // Add other reducers here as needed
});

export default rootReducer;

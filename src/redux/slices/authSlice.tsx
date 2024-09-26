import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import ApiService from '../../config/ApiService';

// Define an interface for the Auth state
interface AuthState {
  user: {id: string; name: string; email: string} | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userData: {name: string; email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await ApiService.register(userData);
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: {email: string; password: string}, {rejectWithValue}) => {
    try {
      const response = await ApiService.login(userData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Handle register action
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Set error message
    });

    // Handle login action
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Set error message
    });
  },
});

// Export the reducer and actions
export const {logout} = authSlice.actions;
export default authSlice.reducer;

// Selector to get auth state
export const selectAuth = (state: RootState) => state.auth;

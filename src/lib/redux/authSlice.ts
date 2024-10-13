import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, signupApi, fetchUserApi } from '@/lib/api/auth'


interface AuthState {
  currentUser: { token: string } | null;
  token: any,
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

// Check if there's a token in localStorage and set the initial state accordingly
const token = localStorage.getItem('token');
if (token) {
  initialState.currentUser = { token }; // Adjust this according to your user object structure
}

// Async thunks
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);
    // Save the token to localStorage
    localStorage.setItem('token', response.token);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue((error as any).response.data);
    }
    return rejectWithValue(error);
  }
});

export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await signupApi(userData);
    // Save the token to localStorage
    localStorage.setItem('token', response.token);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue((error as any).response.data);
    }
    return rejectWithValue(error);
  }
});

// New thunk to load user from localStorage
export const loadUserFromLocalStorage = createAsyncThunk('auth/loadUserFromLocalStorage', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return rejectWithValue('No token found');
  }

  try {
    // Assuming you have a function to fetch user data using the token
    return await fetchUserApi();
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue((error as any).response.data);
    }
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUserFromLocalStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserFromLocalStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loadUserFromLocalStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

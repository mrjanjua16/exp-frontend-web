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

let token: string | null = null;

// Check if there's a token in localStorage and set the initial state accordingly
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}
if (token) {
  initialState.currentUser = { token }; // Adjust this according to your user object structure
}

// Async thunks
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);
    console.log('Login Response:', response); // Debugging step
    if (response && response.token) {
      localStorage.setItem('token', response.token.token); // Ensure token exists before storing
    } else {
      throw new Error('Token not found in response');
    }
    return response;
  } catch (error) {
    console.error('Login error:', error); // Log the full error
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await signupApi(userData);
    if (response && response.token) {
      localStorage.setItem('token', response.token.token); // Ensure token exists before storing
    } else {
      throw new Error('Token not found in response');
    }
    return response;
  } catch (error) {
    console.error('Signup error:', error); // Log the full error
    return rejectWithValue(error.response?.data || error.message);
  }
});


export const loadUserFromLocalStorage = createAsyncThunk('auth/loadUserFromLocalStorage', async () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      throw new Error('No token found');
    }
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

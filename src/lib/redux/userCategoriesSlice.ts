export const fetchUserCategories = createAsyncThunk('userCategories/fetch', async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/user-cat/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  
  const userCategoriesSlice = createSlice({
    name: 'userCategories',
    initialState: {
      list: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserCategories.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.list = action.payload;
        })
        .addCase(fetchUserCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default userCategoriesSlice.reducer;
  
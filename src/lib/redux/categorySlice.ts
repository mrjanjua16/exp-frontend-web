import { fetchCategoriesApi, createCategoryApi, updateCategoryApi, deleteCategoryApi } from "@/app/api/category";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetch', async (_, { rejectWithValue }) => {
    try {
      return await fetchCategoriesApi();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const createCategory = createAsyncThunk('categories/create', async (categoryData, { rejectWithValue }) => {
    try {
      return await createCategoryApi(categoryData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const updateCategory = createAsyncThunk('categories/update', async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      return await updateCategoryApi(id, categoryData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) => {
    try {
      return await deleteCategoryApi(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
      list: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Synchronous actions, e.g., reset state
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.list = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(createCategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.list.push(action.payload);
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateCategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.list.findIndex(category => category.id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        })
        .addCase(updateCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(deleteCategory.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.list = state.list.filter(category => category.id !== action.payload.id);
        })
        .addCase(deleteCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default categorySlice.reducer;

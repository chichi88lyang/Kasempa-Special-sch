import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Login
export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const { data } = await API.post("/auth/login", formData);
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Login failed");
  }
});

// Register
export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const { data } = await API.post("/auth/register", formData);
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Registration failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

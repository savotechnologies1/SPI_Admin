import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../pages/settings/https/profileApi";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await getProfile();
    return response.data;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;

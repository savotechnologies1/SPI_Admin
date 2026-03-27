import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProfile } from "../pages/settings/https/profileApi";

interface ProfileData {
  [key: string]: unknown;
}

interface ProfileState {
  data: ProfileData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await getProfile();
    return response as ProfileData;
  },
);

const initialState: ProfileState = {
  data: null,
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileData>) => {
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
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {}
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export const getProfile = (state) => state.profile.profile;

export const { setProfile, } = profileSlice.actions;
export default profileSlice.reducer;

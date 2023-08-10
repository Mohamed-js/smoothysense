import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { storeToken } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { User } from "posts/postsSlice";
import data from "data/data.json";

const initialState = data.currentUser;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// export selector
export const selectCurrentUser = (state: { user: User }) => state.user;

// export reducer
export default userSlice.reducer;

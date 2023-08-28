import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "posts/postsSlice";
import userReducer from "user/userSlice";
import modalReducer from "modal/modalSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

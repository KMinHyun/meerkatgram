import { configureStore } from "@reduxjs/toolkit";
import postIndexReducer from './slices/postIndexSlice.js'
import authReducer from './slices/authSlice.js';
import postShowReducer from './slices/postShowSlice.js';

export default configureStore({
  reducer: {
    postIndex: postIndexReducer,
    auth: authReducer,
    postShow: postShowReducer,
  }
});
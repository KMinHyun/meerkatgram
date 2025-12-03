import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postImageUploadThunk = createAsyncThunk(
  'postCreate/postImageUploadThunk', // Thunk 고유명
  async (file, { rejectWithValue }) => {
    try {
      const url = `/api/files/posts`;

      // Multipart Formdata로 보내주기 위한 헤더 설정
      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      // Formdata 생성
      const formdata = new FormData();
      formdata.append('image', file);

      const response = await axiosInstance.post(url, formdata, { headers });

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const postStoreThunk = createAsyncThunk(
  'postCreate/postStoreThunk', // Thunk 고유명
  async (data, { rejectWithValue }) => {
    try {
      const url = `/api/posts`;

      const response = await axiosInstance.post(url, data);

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);
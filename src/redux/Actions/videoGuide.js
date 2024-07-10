import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "lib/api";

const getVideoGuide = createAsyncThunk(
  'get-video-guide',
  async () => {
    try {
      const response = await api.get(`get-video-guide`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      })
        .then((value) => {
          return { status: 200, data: value.data };
        })
        .catch((err) => {
          return { status: 400, data: err.response.data };
        });
      return response;
    } catch (err) {
      return {
        status: 400,
        error: err.message
      };
    }
  }
)

export {
  getVideoGuide,
};
import { createSlice } from "@reduxjs/toolkit";
import {getVideoGuide} from "redux/Actions/videoGuide";

const VideoGuideSlice = createSlice({
  name: "VideoGuide",
  initialState: {
    isLoading: false,
    isSuccess: false,
    error: {},
    videoGuideList: {},
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
      state.error = {};
    }
  },
  extraReducers: (builder) => {

    /* get VideGuide */
    builder.addCase(getVideoGuide.fulfilled, (state, action) => {
      state.isLoading = false;
      state.videoGuideList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getVideoGuide.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVideoGuide.rejected, (state) => {
      state.isLoading = false;
    });
   
  }
});

export const { setInitialState } = VideoGuideSlice.actions;
export default VideoGuideSlice.reducer
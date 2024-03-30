import { createSlice } from "@reduxjs/toolkit";
import {
  getExhibitionBanner,
  getExhibition,  
  addExhibition,
  getExhibitionList,
  getExhibitionListID,
  getTeamMembers,
  attendExhibition,
  cancelAttendedExhibition,
  sendExhibitionChat,
  getExhibitionChat,
  markAsReadConnctMssage
} from "redux/Actions/EventExhibition";

const EventExhibitionSlice = createSlice({
  name: "EventExhibition",
  initialState: {
    isLoading: false,
    isSuccess: false,    
    isError: false,
    isSend: false,    
    bannerList: {},
    exhibitionDetails: {},
    exhibitionList: {},
    exhibitionListid: {},
    teamMember: {},
    validation: {},
    tokenExp: {},
    exhibitionChat: {}
  },
  reducers: {
    setInitialState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isSend = false;
      state.validation = {};
    },
    setValidation: (state) => {
      state.validation = {};
    }
  },
  extraReducers: (builder) => {

    /* Get Get Exhibition Banner */
    builder.addCase(getExhibitionBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bannerList = action.payload.status === 200 ? action.payload.data : false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getExhibitionBanner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExhibitionBanner.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get Get Exhibition */
    builder.addCase(getExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exhibitionDetails = action.payload.status === 200 ? action.payload.data : false;
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExhibition.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Add Add Exhibition */
    builder.addCase(addExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
      state.validation = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(addExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addExhibition.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Get Exhibition List List */
    builder.addCase(getExhibitionList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exhibitionList = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getExhibitionList.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getExhibitionList.rejected, (state) => {
      state.isLoading = false;
    });

    
    /* Get Get Exhibition List List */
    builder.addCase(getExhibitionListID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exhibitionListid = action.payload.status === 200 ? action.payload.data : {};
    });
    builder.addCase(getExhibitionListID.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getExhibitionListID.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get TeamMembers List */
    builder.addCase(getTeamMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teamMember = action.payload.status === 200 ? action.payload.data : {};
      state.tokenExp = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(getTeamMembers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTeamMembers.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Attend Exhibition List */
    builder.addCase(attendExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
      state.validation = action.payload.status !== 200 ? action.payload.data : {};
    });
    builder.addCase(attendExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(attendExhibition.rejected, (state) => {
      state.isLoading = false;
    });
    
    /* Get Cancel Attended Exhibition List */
    builder.addCase(cancelAttendedExhibition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload.status === 200 ? action.payload.data : false;
      state.isError = action.payload.status !== 200 ? action.payload.data : false;
    });
    builder.addCase(cancelAttendedExhibition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelAttendedExhibition.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get Exhibition Chat */
    builder.addCase(getExhibitionChat.fulfilled, (state, action) => {
      state.exhibitionChat = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(getExhibitionChat.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getExhibitionChat.rejected, (state) => {
      state.isLoading = false;
    });

    /* Get Exhibition Chat */
    builder.addCase(sendExhibitionChat.fulfilled, (state, action) => {
      state.isSend = action.payload.status === 200 ? action.payload.data : false;
    });
    builder.addCase(sendExhibitionChat.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendExhibitionChat.rejected, (state) => {
      state.isLoading = false;
    });

     /* Get Exhibition Chat */
    builder.addCase(markAsReadConnctMssage.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(markAsReadConnctMssage.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(markAsReadConnctMssage.rejected, (state) => {
      state.isLoading = false;
    });
    
  }
});


export const {
  setInitialState,
  setValidation
} = EventExhibitionSlice.actions

export default EventExhibitionSlice.reducer
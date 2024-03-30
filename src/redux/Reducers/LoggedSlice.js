import { createSlice } from "@reduxjs/toolkit";

const LoggedIn = createSlice({
    name: "loggedIn",
    initialState: {
        isLoggedin: false,
        userData: false,
        exteraRoute: false,
        loggedinUserId: 0,
        companyId: 0,
        clickedMember: false,
    },
    reducers: {
        setIsLoggedin: (state, action) => {

            if (Object.keys(action.payload).length > 0 &&
                action.payload.access_token !== '') {
                state.isLoggedin = true;
                localStorage.setItem("token", action.payload.access_token);
            }
        },
        setLogout: (state) => {            
            state.isLoggedin = false;
            localStorage.removeItem("token");
            localStorage.removeItem("SelectedMenuItem");
        },
        setExteraRoute:(state,action) => {
            state.exteraRoute = action.payload;
        },
        setClickedMember:(state,action) => {
            state.clickedMember = action.payload;
        },
        setLoggedInUser:(state,action) => {
            state.loggedinUserId = action.payload;
        },
        setCompanyId:(state,action) => {
            state.companyId = action.payload;
        }
    },
    extraReducers: (builder) => {

    }
});


export const {
    setIsLoggedin,
    setLogout,
    setExteraRoute,
    setClickedMember,
    setLoggedInUser,
    setCompanyId
} = LoggedIn.actions

export default LoggedIn.reducer
import { createSlice } from '@reduxjs/toolkit'
// Slice
const userToken = localStorage.getItem('authToken')
    // ? JSON.parse(localStorage.getItem('user'))
    ? localStorage.getItem('authToken')
    : null
const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        userToken,
        logout: {},
        message: {},
        countries: [],
        annualRevenue: [],
        hereAbout: []
    },
    reducers: {
        registerSuccess: (state, action) => {
            // debugger
            state.user = action.payload;
            state.userToken = action.payload.data.data.auth_token;
            localStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        registerFail: (state, action) => {
            // debugger
            state.message = action.payload.response.data.message
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.message = action.payload.data.message
            state.userToken = action.payload.data.data.auth_token;
            localStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        logoutSuccess: (state, action) => {
            localStorage.removeItem('authToken')
            // state.logout = action.payload;
            state.userToken = null
        },
        forgotpasswordSuccess: (state, action) => {
            state.user = action.payload;
            state.message = action.payload.data.message

        },
        createOrganizationSuccess: (state, action) => {
            state.user = action.payload;
        },

        getCountryList: (state, action) => {
            state.countries = action.payload;
        },

        getAnnualRevenueList: (state, action) => {
            state.annualRevenue = action.payload;
        },

        getHearAboutList: (state, action) => {
            state.hereAbout = action.payload;
        },
        // logoutSuccess: (state, action) =>  {
        //   state.user = null;
        // },
    },
});

export const authReducer = authSlice.reducer

export const {
    registerSuccess,
    createOrganizationSuccess,
    getCountryList,
    getAnnualRevenueList,
    getHearAboutList,
    loginSuccess,
    forgotpasswordSuccess,
    logoutSuccess, registerFail
} = authSlice.actions;
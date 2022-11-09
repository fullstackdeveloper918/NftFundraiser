import { createSlice } from '@reduxjs/toolkit'
// Slice
const userToken = sessionStorage.getItem('authToken')
    // ? JSON.parse(localStorage.getItem('user'))
    ? sessionStorage.getItem('authToken')
    : null

const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        userdetail: [],
        userToken,
        logout: {},
        message: {},
        countries: [],
        annualRevenue: [],
        hereAbout: [],
        organization: false
    },
    reducers: {
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.userToken = action.payload.data.data.auth_token;
            sessionStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        registerFail: (state, action) => {
            // 
            state.message = action.payload.response.data.message
        },
        userDetail: (state, action) => {
            // debugger
            state.userdetail = action.payload.data.data
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.message = action.payload.data.message
            state.userToken = action.payload.data.data.auth_token;
            sessionStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        logoutSuccess: (state) => {
            sessionStorage.removeItem('authToken')
            state.userToken = null
        },
        forgotpasswordSuccess: (state, action) => {
            state.user = action.payload;
            state.message = action.payload.data.message

        },
        createOrganizationSuccess: (state, action) => {
            state.user = action.payload;
            state.organization = true
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
    logoutSuccess, registerFail,
    userDetail
} = authSlice.actions;
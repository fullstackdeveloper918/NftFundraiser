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
        userdetail: [],
        userToken,
        role:null,
        // wallToken,
        logout: {},
        message: {},
        countries: [],
        annualRevenue: [],
        hereAbout: [],
        updpro: [],
        wallesign: [],
        organization: false
    },
    reducers: {
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.userToken = action.payload.data.data.auth_token;
            state.role = action.payload.data.data.role;
            localStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        registerFail: (state, action) => {
            // 
            state.message = action.payload.response.data.message
        },
        updateprofile: (state, action) => {
            // 
            state.updpro = action?.payload?.data?.data;
        },
        userDetail: (state, action) => {
            // 
            state.userdetail = action.payload.data.data
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.role = action.payload.data.data.role;
            state.message = action.payload.data.message
            state.userToken = action.payload.data.data.auth_token;
            localStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        logoutSuccess: (state) => {
            localStorage.removeItem('authToken')
            state.user.role = null
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
        wallsignin: (state, action) => {
            state.wallesign = action.payload?.data?.data;
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
    logoutSuccess,
     registerFail,
    userDetail,
    wallsignin,
    updateprofile
} = authSlice.actions;
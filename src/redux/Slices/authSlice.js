import { createSlice } from '@reduxjs/toolkit'
// Slice
const userToken = sessionStorage.getItem('authToken')
    // ? JSON.parse(sessionStorage.getItem('user'))
    ? sessionStorage.getItem('authToken')
    : null

const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        userdetail: [],
        userToken,
        role: null,
        // wallToken,
        logout: {},
        message: {},
        countries: [],
        states: [],
        city: [],
        noti: [],
        annualRevenue: [],
        hereAbout: [],
        updpro: [],
        wallesign: [],
        auctionnoti: [],
        organization: false
    },
    reducers: {
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.userToken = action.payload.data.data.auth_token;
            state.role = action.payload.data.data.role;
            sessionStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        registerFail: (state, action) => {
            // 
            state.message = action.payload.response.data.message
        },
        allnotification: (state, action) => {

            state.noti = action.payload.data.data
        },
        updateprofile: (state, action) => {
            // 
            state.updpro = action?.payload?.data?.data;
        },
        userDetail: (state, action) => {
            // 
            state.userdetail = action.payload.data.data
        },
        userAuction: (state, action) => {
            // 
            state.auctionnoti = action.payload.data.data
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.role = action.payload?.data?.data?.role;
            state.message = action.payload?.data?.message
            state.userToken = action.payload?.data?.data?.auth_token;
            sessionStorage.setItem('authToken', action.payload?.data?.data?.auth_token)
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
        getStateList: (state, action) => {
            state.states = action.payload;
        },
        getCityList: (state, action) => {
            state.city = action.payload;
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
    allnotification,
    registerSuccess,
    createOrganizationSuccess,
    getCountryList,
    getStateList,
    getCityList,
    getAnnualRevenueList,
    getHearAboutList,
    loginSuccess,
    userAuction,
    forgotpasswordSuccess,
    logoutSuccess,
    registerFail,
    userDetail,
    wallsignin,
    updateprofile
} = authSlice.actions;
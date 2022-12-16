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
            sessionStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        registerFail: (state, action) => {
            // 
            state.message = action.payload.response.data.message
        },
        updateprofile: (state, action) => {
            // debugger
            state.updpro = action?.payload?.data?.data;
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
            // sessionStorage.removeItem('authToken')
            localStorage.removeItem('auth_token')
            // setAddress = null

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
            // debugger
            state.wallesign = action.payload?.data?.data;
            // state.userToken = action.payload.data.data.auth_token;
            // localStorage.setItem('authToken', action.payload.data.data.auth_token)
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
    userDetail,
    wallsignin,
    updateprofile
} = authSlice.actions;
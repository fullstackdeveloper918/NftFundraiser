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
        countries: [],
        message: {},
        annualRevenue: [],
        hereAbout: []
    },
    reducers: {
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.userToken = action.payload.data.data.auth_token;
            localStorage.setItem('authToken', action.payload.data.data.auth_token)
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.userToken = action.payload.data.data.auth_token;
            localStorage.setItem('authToken', action.payload.data.data.auth_token)
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
    forgotpasswordSuccess
} = authSlice.actions;
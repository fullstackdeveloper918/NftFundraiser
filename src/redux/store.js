import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../redux/Slices/authSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { projectReducer } from './Slices/projectSlice'
import { footerReducer } from './Slices/footerSlice'
import { fundraiserReducer } from './Slices/fundraiserSlice'

const reducer = combineReducers({
    user: authReducer,
    countries: authReducer,
    annualRevenue: authReducer,
    hereAbout: authReducer,
    login: authReducer,
    forgotpassword: authReducer,
    errmessage: authReducer,
    createproject: projectReducer,
    // getproject: projectReducer,
    projectdetails: projectReducer,
    latestprojects: projectReducer,
    fundraiser: fundraiserReducer,
    footer: footerReducer
})

const store = configureStore({
    reducer,
})

export default store
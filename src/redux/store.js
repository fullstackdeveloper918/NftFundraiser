import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../redux/Slices/authSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { projectReducer } from './Slices/projectSlice'
import { footerReducer } from './Slices/footerSlice'
import { fundraiserReducer } from './Slices/fundraiserSlice'
import { collectionReducer } from './Slices/popularCollectionSlice'
import { contactReducer } from './Slices/contactSlice';
import { resellReducer } from './Slices/resellNftSlice'

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
    footer: footerReducer,
    collection: collectionReducer,
    getcollections: collectionReducer,
    getcollectiondetails: collectionReducer,
    getSocialmediaIcons: projectReducer,
    contact: contactReducer,
    resell: resellReducer
    // userDetail: authReducer,

    // Nftlist: projectReducer
})

const store = configureStore({
    reducer,
})

export default store
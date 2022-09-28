import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../redux/Slices/authSlice'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
    user: authReducer,
})

const store = configureStore({
    reducer,
})

export default store
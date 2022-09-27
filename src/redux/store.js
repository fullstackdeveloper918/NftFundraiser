import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
const store = configureStore({
    reducer: {
        user: authSlice
    }
})
export default store
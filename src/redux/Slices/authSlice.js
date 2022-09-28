import { createSlice } from '@reduxjs/toolkit'
// Slice
const initialUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: initialUser,
    },
    reducers: {
        registerSuccess: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        createOrganizationSuccess: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        // logoutSuccess: (state, action) =>  {
        //   state.user = null;
        // },
    },
});

export const authReducer = authSlice.reducer

export const {
    registerSuccess,
    createOrganizationSuccess
} = authSlice.actions;
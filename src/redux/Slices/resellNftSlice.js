import { createSlice } from '@reduxjs/toolkit'

const resellSlice = createSlice({
    name: 'resell',

    initialState: {
        resell: [],
        reselldetails: [],
    },
    reducers: {
        getResell: (state, action) => {
            state.resell = action.payload?.data?.data;
        },
        getReselldetails: (state, action) => {
            state.reselldetails = action.payload?.data?.data;
        },
    },
});

export const resellReducer = resellSlice.reducer
export const {
    getResell,
    getReselldetails
} = resellSlice.actions;
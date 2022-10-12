import { createSlice } from '@reduxjs/toolkit'
// Slice

const fundraiserSlice = createSlice({
    name: 'fundraiser',

    initialState: {
        fundraiser: [],
    },
    reducers: {
        getTopFundraiser: (state, action) => {
            // debugger
            state.fundraiser = action.payload;
        },

    },
});

export const fundraiserReducer = fundraiserSlice.reducer

export const {
    getTopFundraiser
} = fundraiserSlice.actions;
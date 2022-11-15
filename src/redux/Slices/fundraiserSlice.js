import { createSlice } from '@reduxjs/toolkit'
// Slice

const fundraiserSlice = createSlice({
    name: 'fundraiser',

    initialState: {
        fundraiser: [],
        fundraiserdetail: [],
    },
    reducers: {
        getTopFundraiser: (state, action) => {
            // debugger
            state.fundraiser = action.payload;

        },
        getTopFundraiserDetail: (state, action) => {
            // debugger
            state.fundraiserdetail = action?.payload?.data?.data;
        },
    },
});

export const fundraiserReducer = fundraiserSlice.reducer

export const {
    getTopFundraiser,
    getTopFundraiserDetail
} = fundraiserSlice.actions;
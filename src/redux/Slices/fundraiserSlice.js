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
            // 
            state.fundraiser = action.payload;

        },
        getTopFundraiserDetail: (state, action) => {
            // 
            state.fundraiserdetail = action?.payload?.data?.data;
        },
    },
});

export const fundraiserReducer = fundraiserSlice.reducer

export const {
    getTopFundraiser,
    getTopFundraiserDetail
} = fundraiserSlice.actions;
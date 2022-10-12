import { createSlice } from '@reduxjs/toolkit'
// Slice

const footerSlice = createSlice({
    name: 'footer',

    initialState: {
        footer: [],

    },
    reducers: {

        getfooter: (state, action) => {
            state.footer = action.payload;
        },

    },
});

export const footerReducer = footerSlice.reducer

export const {
    getfooter
} = footerSlice.actions;
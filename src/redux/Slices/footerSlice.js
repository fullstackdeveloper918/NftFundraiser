import { createSlice } from '@reduxjs/toolkit'
// Slice

const footerSlice = createSlice({
    name: 'footer',

    initialState: {
        footer: [],
        aboutus: []

    },
    reducers: {

        getfooter: (state, action) => {
            state.footer = action.payload;
        },
        getabout: (state, action) => {
            state.aboutus = action.payload;
        },

    },
});

export const footerReducer = footerSlice.reducer

export const {
    getfooter,
    getabout,
} = footerSlice.actions;
import { createSlice } from '@reduxjs/toolkit'
// Slice

const contactSlice = createSlice({
    name: 'contact',

    initialState: {
        contact: [],


    },
    reducers: {

        postContact: (state, action) => {
            state.contact = action.payload?.data?.data;
        },


    },
});

export const contactReducer = contactSlice.reducer

export const {
    postContact
} = contactSlice.actions;
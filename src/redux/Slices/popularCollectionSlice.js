import { createSlice } from '@reduxjs/toolkit'
// Slice

const collectionSlice = createSlice({
    name: 'collection',

    initialState: {
        collection: [],
    },
    reducers: {
        getPopularCollection: (state, action) => {
            // debugger
            state.collection = action.payload;
        },


    },
});

export const collectionReducer = collectionSlice.reducer

export const {
    getPopularCollection,
} = collectionSlice.actions;
import { createSlice } from '@reduxjs/toolkit'
// Slice

const collectionSlice = createSlice({
    name: 'collection',

    initialState: {
        collection: [],
        collectiondetail: [],
    },
    reducers: {
        getPopularCollection: (state, action) => {
            // 
            state.collection = action.payload;
        },
        getPopularCollectiondetails: (state, action) => {
            // 
            state.collectiondetail = action.payload?.data?.data;
        },


    },
});

export const collectionReducer = collectionSlice.reducer

export const {
    getPopularCollection,
    getPopularCollectiondetails
} = collectionSlice.actions;
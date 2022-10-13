import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPopularCollection } from "../Slices/popularCollectionSlice";

export const PopularCollectionAction = createAsyncThunk(
    "auth/collection",
    async ({ }, thunkAPI) => {
        // debugger
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getPopularConnection`, config)
            console.log(res, 'resddd')
            thunkAPI.dispatch(getPopularCollection(res?.data?.data));

        } catch (e) {
            // debugger
            return console.error(e.message);
        }
    })
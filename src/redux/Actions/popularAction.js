import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPopularCollection, getPopularCollectiondetails } from "../Slices/popularCollectionSlice";
import swal from "sweetalert";
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
            if (e?.response?.data.message) {
                swal('error', e.response.data.message, 'error')
            }
        }
    })
export const PopularCollectionActionDetails = createAsyncThunk(
    "auth/collection",
    async ({ id }, thunkAPI) => {
        // debugger
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getPopularConnectionByIdx/${id}`, config)
            // console.log(res, 'resddd')
            thunkAPI.dispatch(getPopularCollectiondetails(res));

        } catch (e) {
            // debugger
            if (e?.response?.data.message) {
                swal('error', e.response.data.message, 'error')
            }
        }
    })

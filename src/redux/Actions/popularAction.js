import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPopularCollection, getPopularCollectiondetails } from "../Slices/popularCollectionSlice";
import swal from "sweetalert";
import { LogsAction } from "./logsAction";

export const PopularCollectionAction = createAsyncThunk(
    "auth/collection",
    async (params , thunkAPI) => {
        // 
        

        if(params?.location?.pathname === '/allcollections'){
            params.setLoading(true)
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getPopularConnection?page=${params.count}&search_keyword=`, config)
            console.log(res, 'resddd')
            thunkAPI.dispatch(getPopularCollection(res?.data?.data));
            if(params?.location?.pathname === '/allcollections'){
                params.setLoading(false)
            }

        } catch (e) {
            if(params?.location?.pathname=== '/allcollections'){
                params.setLoading(false)
            }
            thunkAPI.dispatch(LogsAction(e))
            // 
            if (e?.response?.data.message) {
                swal('error', e.response.data.message, 'error')
            }
        }
    })
export const PopularCollectionActionDetails = createAsyncThunk(
    "auth/collection",
    async ({ slug }, thunkAPI) => {
        // 
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getPopularConnectionByIdx/${slug}`, config)
            // console.log(res, 'resddd')
            thunkAPI.dispatch(getPopularCollectiondetails(res));

        } catch (e) {
            thunkAPI.dispatch(LogsAction(e))
            // 
            if (e?.response?.data.message) {
                swal('error', e.response.data.message, 'error')
            }
        }
    })

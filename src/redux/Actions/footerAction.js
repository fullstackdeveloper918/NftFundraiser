import axios from "axios";

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getabout, getfooter } from "../Slices/footerSlice";
export const getFooter = createAsyncThunk(
    "auth/footer",
    async (params, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/term-condition`, config)
            thunkAPI.dispatch(getfooter(res?.data?.data));
            console.log(res, "res")

        } catch (e) {
            if (e?.response?.data) {
                thunkAPI.dispatch()
            }
        }
    })
export const AboutUsAction = createAsyncThunk(
    "auth/about",
    async (params, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getAbouts`, config)
            thunkAPI.dispatch(getabout(res?.data?.data));
            console.log(res, "res")

        } catch (e) {
            if (e?.response?.data) {
                thunkAPI.dispatch()
            }
        }
    })
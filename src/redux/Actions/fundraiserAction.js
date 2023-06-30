import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTopFundraiser, getTopFundraiserDetail } from "../Slices/fundraiserSlice";
import swal from "sweetalert";
import { LogsAction } from "./logsAction";


export const TopFundraiserAction = createAsyncThunk(
    "auth/topfundraiser",
    async ( thunkAPI) => {
        // 
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            // 
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getTopFundraisers`, config)
            // console.log(res, 'fund res')
            thunkAPI.dispatch(getTopFundraiser(res?.data?.data));

        } catch (e) {
            thunkAPI.dispatch(LogsAction(e))
            if (e?.response?.data.message) {
                swal('error', e.response.data.message, 'error')
            }
        }
    })

export const TopFundraiserDetail = (user_id) => async dispatch => {
    // 
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        // 
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getTopFundraisers/${user_id}`,
            config)

        // console.log(res, 'ressssss')
        dispatch(getTopFundraiserDetail(res));
    } catch (e) {
        dispatch(LogsAction(e))
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
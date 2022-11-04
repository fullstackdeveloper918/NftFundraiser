import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTopFundraiser } from "../Slices/fundraiserSlice";
import swal from "sweetalert";
export const TopFundraiserAction = createAsyncThunk(
    "auth/topfundraiser",
    async ({ }, thunkAPI) => {
        // debugger
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getTopFundraisers`, config)

            thunkAPI.dispatch(getTopFundraiser(res?.data?.data));

        } catch (e) {
            if (e?.response?.data.message) {
                swal('error', e.response.data.message, 'error')
            }
        }
    })
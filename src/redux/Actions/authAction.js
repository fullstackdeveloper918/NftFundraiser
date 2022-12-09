import axios from "axios";
import { createOrganizationSuccess, forgotpasswordSuccess, getAnnualRevenueList, getCountryList, getHearAboutList, loginSuccess, registerFail, registerSuccess, userDetail, } from "../Slices/authSlice";
import swal from "sweetalert";
// import { useNavigate } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit'

export const Register = createAsyncThunk(
    "auth/register",
    async (params, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('authToken')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                transformRequest: formData => formData
            }
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/signup`,
                params, config)

            thunkAPI.dispatch(registerSuccess(res));
            if (res.status === 200) {
                swal("success", res.data.message, 'success').then(function () {
                    window.location = "/";
                });

            }

        } catch (e) {
            if (e?.response?.data) {
                if (e?.response?.data.message) {

                    swal('error', e?.response?.data?.message, 'error')
                }
            }
        }
    })

export const LoginAction = (params, history) => async dispatch => {
    try {
        const token = sessionStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/organization_signin`,
            params, config)
        dispatch(loginSuccess(res));

        // if (res.status === 200) {
        //     swal("success", res.data.message, 'success')
        //         .then(function () {
        //             window.location = "/projectlist";
        //         });

        // }

    } catch (e) {

        if (e?.response?.data.message) {

            swal('error', e?.response?.data?.message, 'error')
        }
    }
}

export const ForgotPasswordAction = (params) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/forgot_pssword`,
            params, config)
        if (res.status === 200) {
            swal("success", res.data.message, 'success').then(function () {
                window.location = "/login";
            });

        }

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const GetUserAction = () => async dispatch => {
    // debugger
    // debugger
    // localStorage.setItem('authToken', JSON.stringify(action.payload.dat
    const token = sessionStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getUserDetails`,
            config)
        // console.log('userres', res)
        dispatch(userDetail(res));
    } catch (e) {
        // debugger
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const CreateOrganizationAction = (params) => async dispatch => {
    // debugger
    // localStorage.setItem('authToken', JSON.stringify(action.payload.dat
    try {
        const token = sessionStorage.getItem('authToken')
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/createOrganizationDetails`,
            params, config)

        dispatch(createOrganizationSuccess(res));
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const CountryList = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getCountryList`,
            config)
        dispatch(getCountryList(res));
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const AnnualRevenueList = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getAnnualRevenueList`,
            config)
        dispatch(getAnnualRevenueList(res));
    } catch (e) {
        return console.error(e.message);
    }
}

export const HearAboutList = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getHearAboutList`,
            config)
        dispatch(getHearAboutList(res));
    } catch (e) {
        return console.error(e.message);
    }
}
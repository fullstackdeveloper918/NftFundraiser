import axios from "axios";
import { createOrganizationSuccess, getAnnualRevenueList, getCountryList, getHearAboutList, loginSuccess, registerFail, registerSuccess, updateprofile, userDetail, wallsignin, } from "../Slices/authSlice";
import swal from "sweetalert";
// import { useNavigate } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit'
import {creatorWalletUpdate } from "../../components/Wallet/interact";

export const Register = createAsyncThunk(
    "auth/register",
    async (params, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                transformRequest: formData => formData
            }
            
            //create oraginization creator login
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/signup`,
                params, config)

            await creatorWalletUpdate(res?.data?.data?.auth_token)

            thunkAPI.dispatch(loginSuccess(res));

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
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/organization_signin`,
            params, config)
            
        dispatch(loginSuccess(res));

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
    const token = localStorage.getItem('authToken')

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
        // 
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const CreateOrganizationAction = (params) => async dispatch => {
    // 
    // localStorage.setItem('auth_token', JSON.stringify(action.payload.dat
    try {
        const token = localStorage.getItem('authToken')
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

export const walletSignin = (params, history) => async dispatch => {

    // 
    const formData = new FormData();

    formData.append('wallet_id', params);
    // 
    // localStorage.setItem('auth_token', JSON.stringify(action.payload.dat
    try {
        // const token = localStorage.getItem('authToken')
        // const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                // Authorization: `Bearer ${token}`
            },

            // transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/sign_in`,
            formData, config)
        console.log(res, 'signres')
        dispatch(wallsignin(res));
        if (res.status == 200) {
            localStorage.setItem('auth_token', res.data.data.auth_token)

            if (res.data.data.role == 3) {
                history.push('/projectlist')
            } else {
                if (res.data.data.role == 2) {
                    history.push('/profile')

                }
            }
        }
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const UpdateProfileAction = (formData) => async dispatch => {
    
    // 
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/profileUpdate`,
            formData, config)
        // 
        console.log(res, 'update rres')
        await dispatch(updateprofile(res));

        if (res.status === 200) {
            swal("success", "updated", 'success')
            // .then(function () {
            // dispatch(ProjectDetail(params))
            // window.location = "/projectlist";
            // });

        }
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
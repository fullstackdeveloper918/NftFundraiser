import axios from "axios";
import { allnotification, createOrganizationSuccess, getAnnualRevenueList, getCityList, getCountryList, getHearAboutList, getStateList, loginSuccess, updateprofile, userAuction, userDetail } from "../Slices/authSlice";
import swal from "sweetalert";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { creatorWalletUpdate } from "../../components/Wallet/interact";
import Swal from "sweetalert2";
import { LogsAction } from "./logsAction";

export const Register = createAsyncThunk(
    "auth/register",
    async (params, thunkAPI, dispatch) => {
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
                    window.location = "/create";
                });
            }

        } catch (e) {
            dispatch(LogsAction(e))
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
        dispatch(LogsAction(e))
        if (e?.response?.data.message) {

            swal('error', e?.response?.data?.message, 'error')
        }
    }
}

export const ForgotPasswordAction = (params, dispatch) => async dispatch => {
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
        await dispatch(LogsAction(e))
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
        await dispatch(LogsAction(e))
        if (e?.response?.data.message) {
            
            // swal('error', e.response.data.message, 'error')
        }
    }
}
export const GetauctionNoti = () => async dispatch => {
    const token = localStorage.getItem('authToken')

    try {
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getLatestNotification`,
            config)
        // console.log('userres', res)
        dispatch(userAuction(res));


    } catch (e) {
        await dispatch(LogsAction(e))
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
        debugger
        await dispatch(LogsAction(e))
        if (e) {
            swal('error', e.response.data.message, 'error').then(function () {
                // dispatch(ProjectDetail(params))
                window.location = "/projectlist";
            });

        }
    }
}
export const CreateOrganizationAfterRoleChange = createAsyncThunk(
    "auth/register",
    async (params, thunkAPI, dispatch) => {
        // debugger
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
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/createOrganizationDetails`,
                params, config)

            // await creatorWalletUpdate(res?.data?.data?.auth_token)

            // thunkAPI.dispatch(loginSuccess(res));

            if (res.status === 200) {

                thunkAPI.dispatch(GetUserAction())
                swal("success", res.data.message, 'success').then(function () {
                    window.location = "/create";
                });
            }

        } catch (e) {
            if (e) {
                
                    
                    swal('error', e?.response?.data?.message, 'error')
                
            }
        }
        //  dispatch(LogsAction(e))
    })

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
        await dispatch(LogsAction(e))
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const StateList = (formData) => async dispatch => {
    // debugger
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/getStateById`,
            formData, config)
        // debugger
        dispatch(getStateList(res));
    } catch (e) {
        await dispatch(LogsAction(e))
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const CityList = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/getCityById`,
            formData, config)
        dispatch(getCityList(res));
    } catch (e) {
        await dispatch(LogsAction(e))
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
        await dispatch(LogsAction(e))
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
        await dispatch(LogsAction(e))
        return console.error(e.message);
    }
}

export const UpdateProfileAction = (formData, props) => async dispatch => {

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

            Swal.fire({
                icon: 'success',
                html:
                    'User information saved',
                showCloseButton: false,
                showConfirmButton: false,
                focusConfirm: false,
                timer: 1000
            })
            dispatch(GetUserAction())
            props.onHide(false)
            // swal("success", "updated", 'success')
            // .then(function () {
            // dispatch(ProjectDetail(params))
            // window.location = "/projectlist";
            // });

        }
    } catch (e) {
        await dispatch(LogsAction(e))
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const CountSet = () => async dispatch => {
    // debugger
    // 
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            },

        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/notification/update`,
            {}, config)
        // 
        console.log(res, 'update rres')
        // await dispatch(res);

        if (res.status === 200) {
            // debugger
            await dispatch(GetUserAction())


        }
    } catch (e) {
        await dispatch(LogsAction(e))
        if (e?.response?.data?.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const AllNoti = () => async dispatch => {


    const token = localStorage.getItem('authToken')

    try {
        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            },

        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getAllNotification`,
            config)
        // 
        console.log(res, 'allnoti rres')
        await dispatch(allnotification(res));


    } catch (e) {
        await dispatch(LogsAction(e))
        if (e?.response?.data?.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const NotiDelete = (id) => async dispatch => {
    // 
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {

                Authorization: `Bearer ${token}`
            },

        }
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}api/notification/delete/${id}`,
            config)
        // 
        console.log(res, 'delete rres')
        // await dispatch(res);

        if (res.status === 200) {
            // debugger
            await dispatch(GetUserAction())
            await dispatch(AllNoti())


        }
    } catch (e) {
        await dispatch(LogsAction(e))
        if (e?.response?.data?.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const ChangeUserRole = (history) => async dispatch => {
    // debugger
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },

        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/change_user_roles`, "",
            config)
        // 
        console.log(res, 'user role')
        // await dispatch(res);

        if (res.status === 200) {
            // debugger
            await dispatch(GetUserAction())
            if (res?.data?.data?.organization === false) {
                history.push('/create/organization')
            } else {
                history.push("/")
            }
        }
    } catch (e) {
        await dispatch(LogsAction(e))
        if (e?.response?.data?.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
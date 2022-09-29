import axios from "axios";
import { createOrganizationSuccess, forgotpasswordSuccess, getAnnualRevenueList, getCountryList, getHearAboutList, loginSuccess, registerSuccess, } from "../Slices/authSlice";
import swal from "sweetalert";

export const Register = (params) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/signup`,
            params, config)
        dispatch(registerSuccess(res));
    } catch (e) {
        return console.error(e.message);
    }
}

export const LoginAction = (params) => async dispatch => {
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
        // debugger
        // console.log(res?.status)
        if (res?.status === 200) {

            dispatch(loginSuccess(res));
        }

    } catch (e) {
        return console.error(e.message);
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
        dispatch(forgotpasswordSuccess(res));
        swal("Mail sent!", "Check your email!", "success");

    } catch (e) {
        return console.error(e.message);
    }
}

export const CreateOrganizationAction = (params) => async dispatch => {
    // localStorage.setItem('authToken', JSON.stringify(action.payload.dat
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
        swal("Registered!", "You have been registered!", "success");
    } catch (e) {
        return console.error(e.message);
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
        return console.error(e.message);
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
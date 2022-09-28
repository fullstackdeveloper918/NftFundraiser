import axios from "axios";
import { createOrganizationSuccess, getAnnualRevenueList, getCountryList, getHearAboutList, registerSuccess, } from "../Slices/authSlice";

const userToken = localStorage.getItem('authToken')
export const Register = (params) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.post(`https://karmatic.inspiring-swirles.95-179-206-77.plesk.page/api/signup`,
            params, config)
        dispatch(registerSuccess(res));
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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`https://karmatic.inspiring-swirles.95-179-206-77.plesk.page/api/createOrganizationDetails`,
            params, config)
        dispatch(createOrganizationSuccess(res));
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
        const res = await axios.get(`https://karmatic.inspiring-swirles.95-179-206-77.plesk.page/api/getCountryList`,
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
        const res = await axios.get(`https://karmatic.inspiring-swirles.95-179-206-77.plesk.page/api/getAnnualRevenueList`,
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
        const res = await axios.get(`https://karmatic.inspiring-swirles.95-179-206-77.plesk.page/api/getHearAboutList`,
            config)
        dispatch(getHearAboutList(res));
    } catch (e) {
        return console.error(e.message);
    }
}
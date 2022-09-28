import axios from "axios";
import { createOrganizationSuccess, registerSuccess, } from "../Slices/authSlice";

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
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.post(`https://karmatic.inspiring-swirles.95-179-206-77.plesk.page/api/organizationDetails`,
            params, config)
        dispatch(createOrganizationSuccess(res));
    } catch (e) {
        return console.error(e.message);
    }
}
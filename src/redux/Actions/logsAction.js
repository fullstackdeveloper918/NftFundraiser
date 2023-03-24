import axios from "axios";
import { useDispatch } from "react-redux";


export const LogsAction = (params) => async dispatch => {
    // debugger
    try {
        const formData = new FormData()
        formData.append('content', params.message)

        // 
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data'
                'Content-Type': 'application/json',
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/create_application_logs`,
            formData, config)
        await (dispatch(res()))

        console.log("logres", res)

    } catch (e) {
        console.log(e)
        // if (e?.response?.data.message) {
        //     // swal('error', e.response.data.message, 'error')
        // }
    }
}
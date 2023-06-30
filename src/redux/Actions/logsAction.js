import axios from "axios";


export const LogsAction = (params) => async dispatch => {
    // 
    try {
        const formData = new FormData()
        formData.append('content', params.message)

        // 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/create_application_logs`,
            formData, config)
        await (dispatch(res()))


    } catch (e) {
        console.log(e)
        
    }
}
import axios from "axios";
export const ContactAction = (params, setLoading) => async dispatch => {
    // sessionStorage.setItem('authToken', JSON.stringify(action.payload.dat
    // const [loading, setLoading] = useState(false)
    // setLoading(true)
    try {
        // debugger
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/contact-us/store`,
            params, config)
        // console.log("resproj", res)
        dispatch(createProjectSuccess(res));
        if (res.status === 200) {
            setLoading(false)
            swal("success", res.data.message, 'success')
                .then(function () {
                    window.location = "/";
                });

        }

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
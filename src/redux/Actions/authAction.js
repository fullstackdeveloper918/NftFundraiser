import axios from "axios";
import {
  allnotification,
  createOrganizationSuccess,
  getAnnualRevenueList,
  getCityList,
  getCountryList,
  getHearAboutList,
  getStateList,
  loginSuccess,
  updateprofile,
  userAuction,
  userDetail,
} from "../Slices/authSlice";
import swal from "sweetalert";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { creatorWalletUpdate } from "../../components/Wallet/interact";
import Swal from "sweetalert2";
import { LogsAction } from "./logsAction";
import { TopFundraiserDetail } from "./fundraiserAction";
import { GetfundraiserProject } from "./projectAction";

export const Register = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI, dispatch,history) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        transformRequest: (formData) => formData,
      };

      //create oraginization creator login
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/signup`,
        params,
        config
      );

      await creatorWalletUpdate(res?.data?.data?.auth_token,history);

      thunkAPI.dispatch(loginSuccess(res));

      if (res.status === 200) {
        swal("success", res.data.message, "success").then(function () {
          window.location = "/create";
        });
      }
    } catch (e) {
      dispatch(LogsAction(e));
      if (e?.response?.data) {
        if (e?.response?.data.message) {
          swal("error", e?.response?.data?.message, "error");
        }
      }
    }
  }
);

export const LoginAction = (params, history) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/organization_signin`,
      params,
      config
    );

    dispatch(loginSuccess(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e?.response?.data?.message, "error");
    }
  }
};

export const ForgotPasswordAction = (params, dispatch) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/forgot_pssword`,
      params,
      config
    );
    if (res.status === 200) {
      swal("success", res.data.message, "success").then(function () {
        window.location = "/wallet-connect";
      });
    }
  } catch (e) {
    await dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const GetUserAction = (history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getUserDetails`,
      config
    );

    dispatch(userDetail(res));
  } catch (e) {
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal('error', e.response.data.message, 'error')
    }
  }
};
export const GetauctionNoti = (history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getLatestNotification`,
      config
    );
    // console.log('userres', res)
    dispatch(userAuction(res));
  } catch (e) {
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const CreateOrganizationAction = (params,history) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (formData) => formData,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/createOrganizationDetails`,
      params,
      config
    );

    dispatch(createOrganizationSuccess(res));
  } catch (e) {
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(e));
    if (e && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error").then(function () {
        window.location = "/projectlist";
      });
    }
  }
};

export const UpdateOrganizationAction =
  (formData, id, props, userid,history) => async (dispatch) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const config = {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        transformRequest: (formData) => formData,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/updateOrganizationDetails/${id}`,
        formData,
        config
      );

      if (res.status === 200) {
        swal({
          title: "success",
          text: "organization details updated",
          icon: "success",
          buttons: false,
          timer: 1500,
        });

        await dispatch(GetUserAction());
        dispatch(TopFundraiserDetail(userid));
        dispatch(GetfundraiserProject(userid));
        props.onHide(false);
      }

      // dispatch(createOrganizationSuccess(res));
    } catch (e) {
      if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
        sessionStorage.removeItem("authToken");
        history.push("/wallet-connect");
      }
      await dispatch(LogsAction(e));
      if (e && e?.response?.data?.statusCode != 401) {
        swal("error", e.response.data.message, "error").then(function () {});
      }
    }
  };

export const CreateOrganizationAfterRoleChange = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI,history) => {
    // setLoading(true)
    
    try {
      const token = sessionStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        transformRequest: (formData) => formData,
      };

      //create oraginization creator login
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/createOrganizationDetails`,
        params,
        config
      );

      if (res.status === 200) {
        thunkAPI.dispatch(GetUserAction());
        // setLoading(false)
        swal("success", res.data.message, "success").then(function () {
          window.location = "/create";
        });
      }
    } catch (e) {
      console.log('erooorrr', e)
      
      // setLoading(false)
      if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401 ) {
        sessionStorage.removeItem("authToken");
        history.push("/wallet-connect");
      }
      
    }
    //  dispatch(LogsAction(e))
  }
);

export const CountryList = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getCountryList`,
      config
    );
    dispatch(getCountryList(res));
  } catch (e) {
    await dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const StateList = (formData) => async (dispatch) => {
  //
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/getStateById`,
      formData,
      config
    );
    //
    dispatch(getStateList(res));
  } catch (e) {
    await dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const CityList = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/getCityById`,
      formData,
      config
    );
    dispatch(getCityList(res));
  } catch (e) {
    await dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const AnnualRevenueList = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getAnnualRevenueList`,
      config
    );
    dispatch(getAnnualRevenueList(res));
  } catch (e) {
    await dispatch(LogsAction(e));
    return console.error(e.message);
  }
};

export const HearAboutList = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getHearAboutList`,
      config
    );
    dispatch(getHearAboutList(res));
  } catch (e) {
    await dispatch(LogsAction(e));
    return console.error(e.message);
  }
};

export const UpdateProfileAction = (formData, props,history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (formData) => formData,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/profileUpdate`,
      formData,
      config
    );
    //
    await dispatch(updateprofile(res));

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        html: "User information saved",
        showCloseButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        timer: 1000,
      });
      dispatch(GetUserAction());
      props.onHide(false);
      
    }
  } catch (e) {
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }

    await dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const CountSet = (history) => async (dispatch) => {
  
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/notification/update`,
      {},
      config
    );
    

    if (res.status === 200) {
      
      await dispatch(GetUserAction());
    }
  } catch (e) {
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(e));
    if (e?.response?.data?.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const AllNoti = (history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getAllNotification`,
      config
    );
    //
    await dispatch(allnotification(res));
  } catch (e) {
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(e));
    if (e?.response?.data?.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const NotiDelete = (id,history) => async (dispatch) => {
  
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}api/notification/delete/${id}`,
      config
    );
   

    if (res.status === 200) {
      //
      await dispatch(GetUserAction());
      await dispatch(AllNoti(history));
    }
  } catch (e) {
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(e));
    if (e?.response?.data?.message &&  e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const ChangeUserRole = (history, setLoading) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  setLoading(true);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/change_user_roles`,
      "",
      config
    );
    if (res.status === 200) {
      //
      await dispatch(GetUserAction());
      setLoading(false);
      if (res?.data?.data?.organization === false) {
        history.push("/create/organization");
      } else {
        history.push("/");
      }
    }
  } catch (e) {
    setLoading(false);
    if (e?.code?.includes("ERR_NETWORK") || e?.response?.data?.statusCode == 401)  {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    await dispatch(LogsAction(e));
    if (e?.response?.data?.message &&  e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

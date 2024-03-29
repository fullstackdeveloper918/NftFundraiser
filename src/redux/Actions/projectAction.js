import axios from "axios";
import {
  createProjectSuccess,
  getProjectDetail,
  getProjectList,
  createFail,
  publicLiveProjects,
  getLatestProjectDetail,
  getCategoriesList,
  createCollectionSuccess,
  getCollections,
  getCollectionDetails,
  getSocialmediaIcons,
  getNftList,
  getSettings,
  getNftwolDetails,
  getfundprojdetails,
  updatebanner,
  nftUpd,
  nftAdd,
  getMatic,
  getmostprojactivity,
  getbuyednftdetails,
  getTitelResponse,
} from "../Slices/projectSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import swal from "sweetalert";
import { LogsAction } from "./logsAction";
import Swal from "sweetalert2";

export const CreateProjectAction =
  (params, setLoading, history) => async (dispatch) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: `Bearer ${token}`,
        },
        transformRequest: (formData) => formData,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/projects/store`,
        params,
        config
      );
      dispatch(createProjectSuccess(res));

      if (res.status === 200) {
        setLoading(false);

        swal({
          title: "success",
          text: res.data.message,
          icon: "success",
          buttons: false,
          timer: 1500,
        }).then(() => {
          history.push("/projectlist");
        });
      }
    } catch (e) {
      if (
        e?.code?.includes("ERR_NETWORK") ||
        e?.response?.data?.statusCode == 401
      ) {
        sessionStorage.removeItem("authToken");
        history.push("/wallet-connect");
      }
      if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
        setLoading(false);
        dispatch(LogsAction(e));
        swal("error", e.response.data.message, "error");
        dispatch(createFail(e));
      }
    }
  };

export const ProjectDetail = (slug, history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/project/details/${slug}`,
      config
    );

    dispatch(getProjectDetail(res));
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const LatestProjectDetail = (slug) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getLatestProjectDetails/${slug}`,
      config
    );
    // console.log(res, 'ressssss')
    dispatch(getLatestProjectDetail(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const ProjectList = (params) => async (dispatch) => {
  const { history } = params;
  const token = sessionStorage.getItem("authToken");
  if (params?.location?.pathname === "/projectlist") {
    params.setLoading(true);
  }
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/project/list?page=${
        params.count
      }&search_keyword=${
        params.searchQuery !== undefined ? params.searchQuery : ""
      }&category_id=&type`,
      config
    );

    // console.log(res, 'proj')
    if (params.location.pathname === "/projectlist") {
      params.setCount(params.count);
    }
    await dispatch(getProjectList(res));
    params.setLoading(false);
    // setLoading(false)
    return res?.data?.data;
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (params?.location?.pathname === "/projectlist") {
      params.setLoading(false);
    }
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const NftList = (slug, setLoading, history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  // setLoading(true)
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getNftDetailByIdx/${slug}`,
      config
    );

    // console.log(res, 'proj')
    await dispatch(getNftList(res));
    // setLoading(false);
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
      // setLoading(false);
    }
  }
};
export const uploadNFT = async (nft, dispatch, setLoading, history) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      // transformRequest: formData.append('image', params)
    };
    const formData = new FormData();

    for (let i = 0; i < nft.length; i++) {
      formData.append("image[]", nft[i]);
    }

    return axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}api/ipfsHash/Nfft`,
        formData,
        config
      )
      .then(
        function (response) {
          // console.log(response, 'resss')
          return {
            success: true,
            data: response.data,
          };
        }
        // setLoading(false)
      );
  } catch (error) {
    // setLoading(false)
    if (
      error?.code?.includes("ERR_NETWORK") ||
      error?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(error));
    if (error?.response?.data?.statusCode != 401) {
      swal("error", error, "error");
    }
  }
};

export const getPublicLiveProjects = createAsyncThunk(
  "auth/liveProjects",

  async (params, thunkAPI) => {
    try {
      const { projectType, count, setLoading, location, searchQuery } = params;
      if (location.pathname === "/all/LatestProjects") {
        setLoading(true);
      }
      const latitude = sessionStorage.getItem("latitude");
      const longitude = sessionStorage.getItem("longitude");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_API
        }api/getLatestProjects?page=${count}&latitude=${latitude}&longitude=${longitude}&search_keyword=${
          searchQuery !== undefined ? searchQuery : ""
        }&category_id=&type`,
        config
      );
      thunkAPI.dispatch(
        publicLiveProjects({
          res: res,
          type: projectType,
        })
      );

      setLoading && setLoading(false);

      return res?.data?.data;
    } catch (e) {
      params.setLoading(false);
      thunkAPI.dispatch(LogsAction(e));
      //
      if (e?.response?.data.message) {
      }
      throw e; // Throw the error to be captured by the rejected action
    }
  }
);

export const UpdateProject = (props, params, history) => async (dispatch) => {
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
      `${process.env.REACT_APP_BACKEND_API}api/projects/update/${props.id}`,
      params,
      config
    );
    //
    // console.log(res, 'proj')
    await dispatch(getProjectDetail(res));
    if (res.status === 200) {
      swal({
        title: "success",
        text: res.data.message,
        icon: "success",
        buttons: false,
        timer: 1500,
      });
      dispatch(ProjectDetail(props.id, history));
    }
    props.onHide(false);
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const DeleteProject = (id, history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}api/projects/destroy/${id}`,
      config
    );

    if (res.status === 200) {
    }
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const CategoriesAction = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getCategories`,
      config
    );

    dispatch(getCategoriesList(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const GetCollectionsAction = (history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getCollection`,
      config
    );
    await dispatch(getCollections(res));
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const CreateCollectionAction =
  ({ dat, imageBanner, props, setLoading, history }) =>
  async (dispatch) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", dat.title);
      formData.append("description", dat.description);
      formData.append("short_url", dat.short_url);
      formData.append("symbol", dat.symbol);
      formData.append("image", imageBanner);
      const token = sessionStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        transformRequest: (formData) => formData,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/createCollection`,
        formData,
        config
      );
      await dispatch(createCollectionSuccess(res));
      if (res?.status === 200) {
        await dispatch(GetCollectionsAction(history));
        setLoading(false);
        props.onHide(false);
      }
    } catch (e) {
      setLoading(false);
      if (
        e?.code?.includes("ERR_NETWORK") ||
        e?.response?.data?.statusCode == 401
      ) {
        sessionStorage.removeItem("authToken");
        history.push("/wallet-connect");
      }
      dispatch(LogsAction(e));
      if (e?.response?.data?.statusCode != 401 && e?.response?.data.message) {
        swal("error", e.response.data.message, "error");
        dispatch(createFail(e));
      }
    }
  };

export const GetCollectionDetails = (id, history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getCollectionById/${id}`,
      config
    );

    await dispatch(getCollectionDetails(res));
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const GetSocialMediaIcons = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getSocialMediaIcon`,
      config
    );
    // console.log('social', res)
    await dispatch(getSocialmediaIcons(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const UpdateCollection = (id, params, history) => async (dispatch) => {
  //
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
      `${process.env.REACT_APP_BACKEND_API}api/updateContract/${id}`,
      params,
      config
    );
    //
    // console.log(res, 'coll rres')
    await dispatch(getLatestProjectDetail(res));
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const GetSettings = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getSettings`,
      config
    );

    await dispatch(getSettings(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const GetNftwol =
  ({ slug }, refid) =>
  async (dispatch) => {
    try {
      let refId = refid ? refid : "null";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        transformRequest: (formData) => formData,
      };

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}api/getNftDetailByIdxWithoutLogin/${slug}/${refId}`,
        config
      );

      await dispatch(getNftwolDetails(res));
    } catch (e) {
      dispatch(LogsAction(e));
      if (e?.response?.data.message) {
        swal("error", e.response.data.message, "error");
      }
    }
  };

export const GetfundraiserProject = (slug) => async (dispatch) => {
  //
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getProjectByfundraiserIdx/${slug}`,
      config
    );

    await dispatch(getfundprojdetails(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const UpdateBanner = (formData, props, history) => async (dispatch) => {
  //
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
      `${process.env.REACT_APP_BACKEND_API}api/projects/image_update/${props.id}`,
      formData,
      config
    );
    //
    // console.log(res, 'coll rres')
    await dispatch(updatebanner(res));

    if (res.status === 200) {
      swal({
        title: "success",
        text: "Project details updated",
        icon: "success",
        buttons: false,
        timer: 1500,
      }).then(function () {
        dispatch(ProjectDetail(props.id, history));
        dispatch(LatestProjectDetail(props.id));

        // window.location = "/projectlist";
      });
      props.onHide(false);
    }
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const UpdateNft =
  (formData, props, setLoading, history) => async (dispatch) => {
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
        `${process.env.REACT_APP_BACKEND_API}api/nft/update/${props.id}/${props.nft_id?.id}`,
        formData,
        config
      );
      //
      // console.log(res, 'coll rres')
      await dispatch(nftUpd(res));

      if (res.status === 200) {
        swal({
          title: "success",
          text: "NFT details updated",
          icon: "success",
          buttons: false,
          timer: 1500,
        });
        setLoading(false);
        dispatch(NftList(props.nft_id?.id, null, history));
        dispatch(ProjectDetail(props.id, history));
        props.onHide(false);
      }
    } catch (e) {
      if (
        e?.code?.includes("ERR_NETWORK") ||
        e?.response?.data?.statusCode == 401
      ) {
        sessionStorage.removeItem("authToken");
        history.push("/wallet-connect");
      }
      dispatch(LogsAction(e));
      if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
        setLoading(false);
        swal("error", e.response.data.message, "error");
      }
    }
  };
export const AddNftAction =
  (formData, projid, slug, setLoading, history) => async (dispatch) => {
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
        `${process.env.REACT_APP_BACKEND_API}api/nft/create/${projid}`,
        formData,
        config
      );
      //
      // console.log(res, 'coll rres')
      await dispatch(nftAdd(res));

      if (res.status === 200) {
        setLoading(false);
        swal({
          title: "success",
          text: "NFT added ",
          icon: "success",
          buttons: false,
          timer: 1500,
        });
        history.push(`/projnftdetails/${slug.id}`);
      }
    } catch (e) {
      if (
        e?.code?.includes("ERR_NETWORK") ||
        e?.response?.data?.statusCode == 401
      ) {
        sessionStorage.removeItem("authToken");
        history.push("/wallet-connect");
      }
      dispatch(LogsAction(e));
      if (e?.response?.data?.statusCode != 401 && e?.response?.data.message) {
        setLoading(false);
        swal("error", e.response.data.message, "error");
      }
    }
  };

export const GetMatic = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=cad`,
      config
    );
    await dispatch(getMatic(res));
  } catch (error) {
    dispatch(LogsAction(error));
    // console.log("error");
  }
};

export const getBid = (id, history) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/getBidsDetailByIdx/${id}}`,
      config
    );
    await dispatch(res);
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    // console.log("error");
  }
};
export const UpdateBId =
  ({ id, status, setLoading, slug, history }) =>
  async (dispatch) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/change_bids_status/${id}}`,
        { status: status },
        config
      );
      if (res.status === 200) {
        setLoading(false);
        await dispatch(NftList(slug, null, history));
        swal({
          title: "success",
          text: "success",
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      }
    } catch (e) {
      if (
        e?.code?.includes("ERR_NETWORK") ||
        e?.response?.data?.statusCode == 401
      ) {
        sessionStorage.removeItem("authToken");
        history.push("/wallet-connect");
      }
      if (e?.response?.data?.statusCode != 401) {
        swal("error", e?.response?.data?.message, "error");
      }
      setLoading(false);
      dispatch(LogsAction(e));
      // console.log("error");
    }
  };

export const GetMostactivityProject = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getMostActivityProject`,
      config
    );

    await dispatch(getmostprojactivity(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const GetbuyedNftDetails = (slug, history) => async (dispatch) => {
  const token = sessionStorage.getItem("authToken");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}api/getPurchaseNftDetailByIdx/${slug?.slug}`,
      config
    );

    await dispatch(getbuyednftdetails(res));
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data.message && e?.response?.data?.statusCode != 401) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const ResellNft = (params, props, history) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}api/create_resale_nft`,
      params,
      config
    );
    if (res?.status === 200) {
      await dispatch(GetbuyedNftDetails(props.slug, history));

      swal({
        title: "success",
        text: "Your NFT has been sent to resell",
        icon: "success",
        buttons: false,
        timer: 1500,
      });
      props.onHide(false);
    }
  } catch (e) {
    if (
      e?.code?.includes("ERR_NETWORK") ||
      e?.response?.data?.statusCode == 401
    ) {
      sessionStorage.removeItem("authToken");
      history.push("/wallet-connect");
    }
    dispatch(LogsAction(e));
    if (e?.response?.data?.statusCode != 401 && e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const checkIsProjectExists =
  (params, setLoading, setStatus) => async (dispatch) => {
    // ;
    try {
      const formData = new FormData();

      formData.append("title", params);
      const token = sessionStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: `Bearer ${token}`,
        },
        transformRequest: (formData) => formData,
      };
      // ;
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/getProjectName`,
        formData,
        config
      );
      await (dispatch (getTitelResponse(res)));
      if (res.status === 200) {
        setLoading(false);
        setStatus(res?.data?.data?.status);
      }
      // dispatch(createProjectSuccess(res));
      ;
    } catch (e) {
      ;
      // if (e?.response?.status == 422) {
      //   console.log("truueee");
      // } // setLoading(false);
      dispatch(LogsAction(e));
      setLoading(false);
      // swal("error", e?.response?.data?.message, "error");
    }
  };

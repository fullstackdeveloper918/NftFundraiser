import axios from "axios";
import {
  createProjectSuccess,
  getProjectDetail,
  getProjectList,
  createFail,
  publicLiveProjects,
  deleteProject,
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
  publicLiveProjectspagination,
} from "../Slices/projectSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import swal from "sweetalert";
import { LogsAction } from "./logsAction";

export const CreateProjectAction =
  (params, setLoading, history) => async (dispatch) => {
    //
    // sessionStorage.setItem('auth_token', JSON.stringify(action.payload.dat
    // const [loading, setLoading] = useState(false)
    // setLoading(true)
    try {
      const token = sessionStorage.getItem("authToken");
      //
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        transformRequest: (formData) => formData,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}api/projects/store`,
        params,
        config
      );
      // console.log("resproj", res)
      dispatch(createProjectSuccess(res));

      if (res.status === 200) {
        // if (res.data.id == 1) { }
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
      if (e?.response?.data.message) {
        setLoading(false);
        dispatch(LogsAction(e));
        swal("error", e.response.data.message, "error");
        dispatch(createFail(e));
      }
    }
  };

export const ProjectDetail = (slug) => async (dispatch) => {
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
    // console.log(res?.data?.data[0]?.image, 'proj')
    // console.log('details', res)
    dispatch(getProjectDetail(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const LatestProjectDetail = (slug) => async (dispatch) => {
  //
  //
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
    dispatch(LogsAction(e));
    if (params?.location?.pathname === "/projectlist") {
      params.setLoading(false);
    }
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const NftList = (slug, setLoading) => async (dispatch) => {
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
    setLoading(false);
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
      setLoading(false);
    }
  }
};
export const uploadNFT = async (nft, dispatch, setLoading) => {
  try {
    // const [loading, setLoading] = useState()
    // setLoading(true)
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
    dispatch(LogsAction(error));
    swal("error", error, "error");
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
      console.log(e, "error");
      params.setLoading(false);
      thunkAPI.dispatch(LogsAction(e));
      //
      if (e?.response?.data.message) {
      }
      throw e; // Throw the error to be captured by the rejected action
    }
  }
);

export const UpdateProject = (props, params) => async (dispatch) => {
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
      dispatch(ProjectDetail(props.id));
      // .then(function () {
      // window.location = `/ projnftdetails / ${ props }`;
      // });
    }
    props.onHide(false);
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
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
    //
    // console.log(res.status, 'proj')
    // await dispatch(deleteProject(res));
    if (res.status == 200) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this project!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your project has been deleted!", {
            icon: "success",
          }).then(function () {
            window.location = "/projectlist";
          });
        } else {
          swal("Your project is safe!");
        }
      });
      // history.push('/projectlist')

      // swal("success", res.data.message, 'success').then(function () {
      //     window.location = "/projectlist";
      // });
    }
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
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
    // console.log(res, 'catres')
    dispatch(getCategoriesList(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

export const GetCollectionsAction = () => async (dispatch) => {
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
    // console.log('colres', res)
    await dispatch(getCollections(res));
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const CreateCollectionAction =
  ({ dat, imageBanner, props, setLoading }) =>
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
      // dispatch(GetCollectionsAction)
      await dispatch(createCollectionSuccess(res));
      if (res?.status === 200) {
        await dispatch(GetCollectionsAction());
        setLoading(false);
        props.onHide(false);
        // swal("success", 'Collection Created', 'success')
        // .then(function () {
        //     onClick={() => props.onHide()}
        // });
      }
    } catch (e) {
      setLoading(false);
      dispatch(LogsAction(e));
      if (e?.response?.data.message) {
        swal("error", e.response.data.message, "error");
        dispatch(createFail(e));
      }
    }
  };
export const GetCollectionDetails = (id) => async (dispatch) => {
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
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
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

export const UpdateCollection = (id, params) => async (dispatch) => {
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
    // if (res.status === 200) {
    //     swal("success", res.data.message, 'success').then(function () {
    //         window.location = "/projectlist";
    //     });

    // }
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
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
    //
    // console.log(res, 'sett rres')
    await dispatch(getSettings(res));

    // if (res.status === 200) {
    //     swal("success", res.data.message, 'success').then(function () {
    //         window.location = "/projectlist";
    //     });

    // }
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
      // const formData = new FormData()
      // formData.append('ref_id', refid?refid:'')
      // if(slug.reffid){

      //     const reff = slug.reffid
      // }
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

export const UpdateBanner = (formData, props) => async (dispatch) => {
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
        dispatch(ProjectDetail(props.id));
        dispatch(LatestProjectDetail(props.id));

        // window.location = "/projectlist";
      });
      props.onHide(false);
    }
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};
export const UpdateNft = (formData, props, setLoading) => async (dispatch) => {
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
      dispatch(NftList(props.nft_id?.id));
      dispatch(ProjectDetail(props.id));
      props.onHide(false);
      // .then(function () {
      //     window.location = `/ nft / details / ${ props.nft_id?.id } ? project = ${ props.id }`;

      // });
    }
  } catch (e) {
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
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
        // .then(function () {
        // dispatch(ProjectDetail(props.id))
        // dispatch(LatestProjectDetail(params))
        // window.location = `/ projnftdetails / ${ slug.id }`;
        // });
      }
    } catch (e) {
      dispatch(LogsAction(e));
      if (e?.response?.data.message) {
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
    console.log("res", res);
  } catch (error) {
    dispatch(LogsAction(error));
    // console.log("error");
  }
};
export const getBid = (id) => async (dispatch) => {
  //
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

    console.log("res bid", res);
  } catch (e) {
    dispatch(LogsAction(e));
    // console.log("error");
  }
};
export const UpdateBId =
  ({ id, status, setLoading, slug }) =>
  async (dispatch) => {
    //
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
      // await dispatch(res)
      if (res.status == 200) {
        setLoading(false);
        await dispatch(NftList(slug));
        swal({
          title: "success",
          text: "success",
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      }
      console.log("res bid", res);
    } catch (e) {
      swal("error", e?.response?.data?.message, "error");
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
export const GetbuyedNftDetails = (slug) => async (dispatch) => {
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
    dispatch(LogsAction(e));
    if (e?.response?.data.message) {
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
    // await dispatch(res())
    if (res?.status == 200) {
      await dispatch(GetbuyedNftDetails(props.slug));

      swal({
        title: "success",
        text: "Your NFT has been sent to resell",
        icon: "success",
        buttons: false,
        timer: 1500,
      });
      props.onHide(false);
      // history.push(`/my/nfts-detail/${props.slug?.slug}`)
    }
  } catch (e) {
    dispatch(LogsAction(e));
    // console.log("error");
    if (e?.response?.data.message) {
      swal("error", e.response.data.message, "error");
    }
  }
};

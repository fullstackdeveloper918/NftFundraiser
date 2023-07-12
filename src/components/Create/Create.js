import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  CategoriesAction,
  CreateProjectAction,
  GetCollectionsAction,
  checkIsProjectExists,
} from "../../redux/Actions/projectAction";
import "reactjs-popup/dist/index.css";
import styles from "./styles/styles.module.scss";
import { useFormData } from "./Context/context";
import JoditEditor from "jodit-react";
import {
  CityList,
  CountryList,
  GetUserAction,
  StateList,
} from "../../redux/Actions/authAction";
import { dataURLtoBlob } from "../../utils/blobfromurl";
import UploadComponent from "../UploadComponent";
import swal from "sweetalert";
import { Loader } from "@react-three/drei";

const Create = ({ current, next, prev }) => {
  const { data, setFormValues } = useFormData();
  console.log("data", data);
  const [description, setDescription] = useState();
  const [country, setCountry] = useState();
  const [projName, setprojName] = useState();
  console.log("projname", projName);
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [image, setImage] = useState();
  console.log("image", image);
  const [loading, setLoading] = useState(false);
  const [usertype, setUserType] = useState("1");
  const dispatch = useDispatch();
  const history = useHistory();
  const [nftwidth, setNftwidth] = useState();
  const [nftHeight, setNftheight] = useState();
  const [size, setSize] = useState();
  const [countryName, setCountryName] = useState(" ");
  const [status, setStatus] = useState("");
  console.log("status", status);
  const userdet = useSelector((state) => {
    return state?.user?.userdetail;
  });
  const { countries } = useSelector((state) => state.countries);
  const states = useSelector((state) => {
    return state.countries.states;
  });
  // const statusData = useSelector((state) => {
  //   return state?.projectdetails?.getTitleRes?.status;
  // });
  // console.log("statusData", statusData);
  const cities = useSelector((state) => {
    return state.countries.city;
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    mode: "all",
  });

  const cat = useSelector((state) => {
    return state?.projectdetails?.categories;
  });

  const handleChangeCountry = (event) => {
    // 👇 Get input value from "event"
    const formData = new FormData();
    if (event && event?.currentTarget?.value) {
      setCountry(event?.currentTarget?.value);
      formData.append("country_id", event?.currentTarget?.value);
    } else {
      setCountryName(userdet?.organization_detail?.country);
      setCountry(userdet?.organization_detail?.country_id);
      formData.append("country_id", userdet?.organization_detail?.country_id);
    }
    dispatch(StateList(formData));
  };

  useEffect(() => {
    if (userdet?.organization_detail) {
      setCountry(userdet?.organization_detail?.country_id);
      setValue("country", userdet?.organization_detail?.country_id);
    }
  }, [setValue, userdet]);
  console.log(country, "country");

  useEffect(() => {
    if (country) {
      const formData = new FormData();
      formData.append("country_id", country);
      dispatch(StateList(formData));
    }
  }, [country, dispatch]);
  useEffect(() => {
    if (userdet?.organization_detail === false && userdet.role === "3") {
      swal(
        "warning",
        "Please fill in the organization details to continue...",
        "warning"
      ).then(function () {
        window.location = "/create/organization";
      });
    }
  }, [userdet]);
  useEffect(() => {
    if (country && state) {
      const formData = new FormData();
      formData.append("country_id", country);
      formData.append("state_id", state);
      dispatch(CityList(formData));
    }
  }, [country, dispatch, state]);

  useEffect(() => {
    dispatch(GetUserAction(history));
    dispatch(GetCollectionsAction(history));
    dispatch(CategoriesAction());
    dispatch(CountryList());
    if (prev) {
      setValue("title", data.title);
      setValue("address", data.address);
      setValue("category_id", data.category_id);
      setValue("state", data.state);
      setValue("city", data.city);
      setValue("description", data.description);
      setValue("type", data.usertype);
      setValue("image", data.imageUri);
      setUserType(data.usertype);
      setDescription(data.description);
      setImage(data.imageUri);
      setState(data.state);
      setCity(data.city);
    }
  }, [data]);

  const handleChangeState = (event) => {
    // 👇 Get input value from "event"
    // setCountry(event.currentTarget.value);
    const formData = new FormData();
    formData.append("country_id", country);
    formData.append("state_id", event.currentTarget.value);
    dispatch(CityList(formData));
  };

  const handleSubmitDraft = (data) => {
    // const imageBanner = dataURLtoBlob(image);
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    formData.append("image", image);
    formData.append("type", "1");
    formData.append("status", 3);
    formData.append("number_of_nft", "1");
    formData.append("on_which_step_left", 0);
    dispatch(CreateProjectAction(formData, setLoading, history));
  };

  const onSubmit = async (data) => {
    // ;
    // setLoading(true);
    // const res = await dispatch(
    //   checkIsProjectExists(data.title, setLoading, setStatus)
    // );
    // console.log("res", res);
    ;
    // if (status == '0') {
      setFormValues({
        ...data,
        description,
        country,
        state,
        city,
        type: usertype,
        image: image,
        imageUri: image,
      });

      next();
    // } else {
    //   swal("warning", "Project name already exists", "warning");
    // }
  };

  return (
    <div className={current === 0 ? styles.showForm : styles.hideForm}>
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="item-form card no-hover"
        >
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-group mt-3">
                <label>Project name</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Project name"
                  {...register("title", {
                    required: true,
                    pattern: { value: /[A-Za-z]/ },
                  })}
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title && errors.title?.type === "pattern" && (
                  <p style={{ color: "red" }} role="alert">
                    Only VarChar allowed
                  </p>
                )}
                {errors.title?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Title is required
                  </p>
                )}
              </div>
              {/* )} */}
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group mt-3">
                <label>Web address</label>
                <input
                  type="text"
                  className="form-control"
                  // required={false}
                  name="address"
                  placeholder="Web address"
                  {...register("address", {
                    required: true,
                    pattern: {
                      value:
                        /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&=&/]*)$/,
                    },
                  })}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && errors.address?.type === "pattern" && (
                  <p style={{ color: "red" }} role="alert">
                    Not valid URL
                  </p>
                )}
                {errors.address?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Address is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-12">
              <label>Description</label>
              <div className="form-group">
                <Controller
                  control={control}
                  name="description"
                  defaultValue=""
                  rules={{ required: true, minLength: 100 }}
                  render={({ field }) => {
                    return (
                      <JoditEditor
                        ref={field.ref}
                        value={description}
                        placeholder="start typing"
                        aria-invalid={errors.description ? "true" : "false"}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
                {errors.description?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Description is required
                  </p>
                )}
                {errors.description &&
                  errors.description.type === "minLength" && (
                    <p style={{ color: "red" }}>min length of words is 100</p>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group mt-3">
                <label>Country</label>
                <div className="position-relative select-box">
                  <select
                    name="country"
                    placeholder="Select your country"
                    {...register("country", { required: true })}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    defaultValue={country}
                    value={country}
                  >
                    aria-invalid={errors?.country ? "true" : "false"}
                    {countries?.data?.data?.map((option, key) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group mt-3">
                <label>State or province</label>
                <div className="position-relative select-box">
                  <select
                    name="state"
                    {...register("state")}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    disabled={states?.data?.data?.length === 0}
                  >
                    aria-invalid={errors?.state ? "true" : "false"}
                    <option
                      value=""
                      disabled
                      selected
                      style={{ color: "#495057" }}
                    >
                      {states?.data?.data?.length === "0"
                        ? "N/A"
                        : "Select your state/province"}
                    </option>
                    {states?.data?.data?.map((option, key) => (
                      <>
                        <option key={key.id} value={option.id}>
                          {option.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>City or Region</label>
                <div className="position-relative select-box">
                  <select
                    name="city"
                    {...register("city")}
                    disabled={states?.data?.data?.length === 0}
                    onChange={(e) => setCity(e.target.value)}
                    defaultValue={city}
                  >
                    aria-invalid={errors?.city ? "true" : "false"}
                    <option
                      value=""
                      disabled
                      selected
                      style={{ color: "#495057" }}
                    >
                      {states?.data?.data?.length === "0"
                        ? "N/A"
                        : "Select your city/region"}
                    </option>
                    {cities?.data?.data?.map((option, key) => (
                      <>
                        <option key={key.id} value={option.id}>
                          {option.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>Category</label>
                <div className="position-relative select-box">
                  <select
                    name="category_id"
                    {...register("category_id", { required: true })}
                  >
                    aria-invalid={errors.category_id ? "true" : "false"}
                    <option
                      value=""
                      disabled
                      selected
                      style={{ color: "#495057" }}
                    >
                      Select category{" "}
                    </option>
                    {cat?.map((option, key) => (
                      <option key={key.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                  {errors.category_id?.type === "required" && (
                    <p style={{ color: "red" }} role="alert">
                      Category is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className=" col-12">
              <div className="form-group">
                <label>Banner image</label>

                <UploadComponent
                  imageSrc={image}
                  setImageSrc={setImage}
                  {...register("image", { required: !image ? true : false })}
                />

                <div>
                  <div className="logo-dis logo-dis-img">
                    <span>Allowed types: JPG, PNG, GIF</span>
                    <span>
                      Banner should be 800 px wide x 500 px high, 10MB max
                    </span>
                  </div>
                </div>
                {errors.image?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Banner is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-6">
              <button
                className="btn w-100 mt-3 mt-sm-4"
                onClick={handleSubmit(handleSubmitDraft)}
              >
                Save as Draft
              </button>
            </div>
            <div className="col-6">
              <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
      {/* )} */}
    </div>
  );
};
export default Create;

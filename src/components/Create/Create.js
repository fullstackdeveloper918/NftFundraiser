import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  CategoriesAction,
  CreateProjectAction,
  GetCollectionsAction,
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

const Create = ({ current, next, prev }) => {
  const { data, setFormValues } = useFormData();
  const [description, setDescription] = useState();
  const [country, setCountry] = useState();

  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [usertype, setUserType] = useState("1");
  const dispatch = useDispatch();
  const history = useHistory();
  const [countryName, setCountryName] = useState(" ");

  const userdet = useSelector((state) => {
    return state?.user?.userdetail;
  });
  const { countries } = useSelector((state) => state.countries);
  const states = useSelector((state) => {
    return state.countries.states;
  });
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
  }, [userdet]);

  useEffect(() => {
    if (country) {
      const formData = new FormData();
      formData.append("country_id", country);
      dispatch(StateList(formData));
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      const formData = new FormData();
      formData.append("country_id", country);
      formData.append("state_id", state);
      dispatch(CityList(formData));
    }
  }, [country, state]);

 

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
    const imageBanner = dataURLtoBlob(image);
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    formData.append("image", imageBanner);
    formData.append("type", "1");
    formData.append("status", 3);
    formData.append("number_of_nft", "1");
    formData.append("on_which_step_left", 0);
    dispatch(CreateProjectAction(formData, setLoading, history));
  };

  const onSubmit = (data) => {
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
  };

  return (
    <div className={current === 0 ? styles.showForm : styles.hideForm}>
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
                    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})/
  
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
                >
                  <option value={userdet?.organization_detail?.country_id} selected>{countryName}</option>
                  aria-invalid={errors?.country ? "true" : "false"}
                  {countries?.data?.data?.map((option, key) => (
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
              <UploadComponent imageSrc={image} setImageSrc={setImage} />
              <div>
                <div className="logo-dis logo-dis-img">
                  <span>Allowed types: JPG, PNG, GIF</span>
                  <span>
                    Banner should be 800 px wide x 500 px high, 10MB max
                  </span>
                </div>
              </div>
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
    </div>
  );
};
export default Create;

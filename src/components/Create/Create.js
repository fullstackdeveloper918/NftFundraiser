import React, { useEffect, useState, useRef, useMemo } from "react";
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
import UploadImage from "../../shared/Upload";
import { dataURLtoBlob } from "../../utils/blobfromurl";
import UploadComponent from "../UploadComponent";

const Create = ({ current, next, prev }) => {
  const { data, setFormValues } = useFormData();
  const [description, setDescription] = useState();
  const [country, setCountry] = useState("");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [collection_id, setCollectionId] = useState(0);
  const [usertype, setUserType] = useState("1");
  const [nonft, setNonft] = useState("1");
  const dispatch = useDispatch();
  const history = useHistory();
  const [countryName, setCountryName] = useState(" ");

  const userdet = useSelector((state) => {
    return state?.user?.userdetail;
  });
  const { countries } = useSelector((state) => state.countries);
  const [cursorState, updateCursorState] = useState({});
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
    watch,
    control,
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    // const imageBanner = dataURLtoBlob(image);
    setFormValues({
      ...data,
      description,
      type: usertype,
      image: image,
      imageUri: image,
    });
    next();
  };

  const cat = useSelector((state) => {
    return state?.projectdetails?.categories;
  });

  console.log(userdet, "userdet");
  console.log(country, "country");
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
    handleChangeCountry();
  }, [current]);

  useEffect(() => {
    dispatch(GetUserAction());
    dispatch(GetCollectionsAction());
    dispatch(CategoriesAction());
    dispatch(CountryList());
    handleChangeCountry();
    if (prev) {
      setValue("title", data.title);
      setValue("address", data.address);
      setValue("category_id", data.category_id);
      setValue("country", data.country);
      setValue("state", data.state);
      setValue("city", data.city);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("type", data.usertype);
      setValue("image", data.imageUri);
      setUserType(data.usertype);
      setCountry(data.country);
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

  const handleEditorChange = (value) => {
    // Check if the editor content is empty
    if (!value) {
      // Reset the editor content if it's empty
      setDescription("");
    } else {
      setDescription(value);
    }
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

  return (
    <div className={current === 0 ? styles.showForm : styles.hideForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="item-form card no-hover"
      >
        <div className="row">
          <div className="col-md-6 col-12">
            {/* {type == 1 && ( */}
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
                      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
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
                  onChange={handleChangeCountry}
                  defaultValue={
                    countryName
                      ? countryName
                      : userdet?.organization_detail?.country_id &&
                        handleChangeCountry()
                  }
                >
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
                  onChange={handleChangeState}
                  disabled={states?.data?.data?.length === 0}
                >
                  aria-invalid={errors?.state ? "true" : "false"}
                  <option
                    value=""
                    disabled
                    selected
                    style={{ color: "#495057" }}
                  >
                    {states?.data?.data?.length === 0
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
                >
                  aria-invalid={errors?.city ? "true" : "false"}
                  <option
                    value=""
                    disabled
                    selected
                    style={{ color: "#495057" }}
                  >
                    {states?.data?.data?.length === 0
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
          <div className="col-12 col-md-12">
            <div className={`form-group  ${styles.input_group}`}>
              {usertype === 2 ? (
                <label>Price per NFT (In MATIC tokens)</label>
              ) : (
                <label>Price (In MATIC tokens)</label>
              )}
              <div className="position-relative">
                <span
                  className={styles.plus_icon}
                  onClick={() => setPrice((price) => Number(price) + 1)}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </span>
                <input
                  value={price}
                  type="number"
                  className="form-control"
                  step="0.01"
                  min="0"
                  name="price"
                  placeholder="Price"
                  {...register("price", { required: true })}
                  onChange={(e) => setPrice(e.target.value)}
                  aria-invalid={errors.price ? "true" : "false"}
                />
                <span
                  className={styles.minus_icon}
                  onClick={() => {
                    if (Number(price) <= 0) {
                      setPrice(Number(0));
                    } else {
                      setPrice(Number(price) - 1);
                    }
                  }}
                >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </span>
              </div>
              {errors.price?.type === "required" && (
                <p style={{ color: "red" }} role="alert">
                  Price is required
                </p>
              )}
            </div>
            <div className="">
              <div className="form-group pricing-detail">
                <p>
                  <span>Price</span> <span>{price ? price : "--"} MATIC</span>
                </p>

                <div className="fee_contentdiv">
                  <span className="mainkrmetica_heading">Karmatica Fee</span>
                  <div className="fee_content">
                    <span>Buyer</span>
                    <span>1%</span>
                  </div>
                  <div className="fee_content">
                    <span>Seller</span>
                    <span>1%</span>
                  </div>
                </div>
                {/* <span>Buyer</span><span>1%</span><br /><span>Seller</span><span>1%</span> */}

                <p>
                  <span>You will receive </span>
                  <span>
                    {(98 * price) / 100 ? (98 * price) / 100 : "--"} MATIC
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className=" col-12">
            <div className="form-group">
              <label>Banner image</label>
              {/* <UploadImage
                imageSrc={image}
                // src={image}
                initalImag={data.imageUri}
                setImageSrc={setImage}
              /> */}
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

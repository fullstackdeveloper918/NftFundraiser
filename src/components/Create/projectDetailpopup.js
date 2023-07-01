import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  CategoriesAction,
  CreateCollectionAction,
  UpdateProject,
} from "../../redux/Actions/projectAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  InstapaperIcon,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  EmailIcon,
} from "react-share";
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";
import JoditEditor from "jodit-react";
import {
  CityList,
  CountryList,
  StateList,
} from "../../redux/Actions/authAction";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

function ProjDetailPopup(props) {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({});
  const [description, setDescription] = useState();
  const id = useParams();
  const [type, setType] = useState();
  const { countries } = useSelector((state) => state.countries);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const states = useSelector((state) => {
    return state.countries.states;
  });
  const [nftCount, setNFTCount] = useState(1);

  useEffect(() => {
    dispatch(CategoriesAction());
    dispatch(CountryList());
  }, []);

  const handleChangeCountry = (event) => {
    event?.preventDefault();
    // 👇 Get input value from "event"
    setCountry(event?.currentTarget?.value);
    const formData = new FormData();
    formData.append("country_id", event?.currentTarget?.value);
    dispatch(StateList(formData));
  };

  const handleChangeState = (event) => {
    //
    event.preventDefault();
    // 👇 Get input value from "event"
    setState(event.currentTarget.value);
    const formData = new FormData();
    formData.append("country_id", country);
    formData.append("state_id", event?.currentTarget?.value);
    dispatch(CityList(formData));
  };

  const handleChangeCity = (event) => {
    //
    // 👇 Get input value from "event"
    setCity(event?.currentTarget?.value);
  };

  const cities = useSelector((state) => {
    //
    return state.countries.city;
  });

  const projdetail = useSelector((state) => {
    //
    return state?.projectdetails?.projectdetails;
  });

  const cat = useSelector((state) => {
    return state?.projectdetails?.categories;
  });

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 0).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    if (projdetail && Object.keys(projdetail).length) {
      setValue("title", projdetail.title);
      setValue("address", projdetail.address);
      setValue("description", projdetail.description);
      setValue("state", projdetail.state);
      setValue("country", projdetail.country);
      setValue("city", projdetail.city);
      setValue("number_of_nft", projdetail.number_of_nft);
      setValue("start_date", projdetail.start_date);
      setValue("end_date", projdetail.end_date);
      setValue("type", projdetail.type);
      setValue("category_id", projdetail.category_id);
      setType(projdetail.type);
      setCountry(projdetail.country);
      setDescription(projdetail.description);
      setValue("image", projdetail.image);
      const formData = new FormData();
      formData.append("country_id", projdetail.country);
      formData.append("state_id", projdetail.state);
      dispatch(StateList(formData));
      dispatch(CityList(formData));
    }
  }, [projdetail]);

  const OnSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", description);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("number_of_nft", data.number_of_nft);
    if (data?.type === '1') {
      formData.append("start_date", "");
      formData.append("end_date", "");
    } else {
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
    }
    formData.append("type", data.type);
    formData.append("category_id", data.category_id);
    dispatch(UpdateProject(props, formData,history));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div>
          <a>
            <i
              class="fa-regular fa-xmark-large"
              style={{ color: "#fff" }}
              onClick={props.onHide}
            >
              X
            </i>
          </a>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="item-form card no-hover"
        >
          <div className="row">
            <div className="col-6 col-12">
              {/* {type == 1 && ( */}
              <div className="form-group mt-3">
                <label>Project name</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Project name"
                  {...register("title", { required: true })}
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Title is required
                  </p>
                )}
              </div>
              {/* )} */}
            </div>
            <div className="col-6 col-12">
              <div className="form-group mt-3">
                <label>Web address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Web Address"
                  {...register("address", { required: true })}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Address is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>Country</label>
                <Controller
                  control={control}
                  name="country"
                  // selected={country}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <select
                      name="country"
                      {...register("country", { required: true })}
                      // value={value}
                      // defaultValue={value}
                      onChange={handleChangeCountry}
                    >
                      aria-invalid={errors?.country ? "true" : "false"}
                      <option
                        value=""
                        disabled
                        selected
                        style={{ color: "#495057" }}
                      >
                        Select your country
                      </option>
                      {countries?.data?.data?.map((option, key) => (
                        <>
                          <option key={key.id} value={option.id}>
                            {option.name}
                          </option>
                        </>
                      ))}
                    </select>
                  )}
                />
                {errors.country?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Country is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>State or Province</label>
                <Controller
                  control={control}
                  name="state"
                  // selected={country}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <select
                      name="state"
                      {...register("state", { required: true })}
                      // defaultValue={value}
                      // value={value}
                      onChange={handleChangeState}
                    >
                      aria-invalid={errors?.state ? "true" : "false"}
                      <option
                        value=""
                        disabled
                        selected
                        style={{ color: "#495057" }}
                      >
                        Select your state
                      </option>
                      {states?.data?.data?.map((option, key) => (
                        <>
                          <option key={key.id} value={option.id}>
                            {option.name}
                          </option>
                        </>
                      ))}
                    </select>
                  )}
                />
                {errors.state?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    State is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>City or Region</label>
                <Controller
                  control={control}
                  name="city"
                  // selected={country}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <select
                      name="city"
                      {...register("city", { required: true })}
                      // value={value}
                      onChange={handleChangeCity}
                    >
                      aria-invalid={errors?.city ? "true" : "false"}
                      <option
                        value=""
                        disabled
                        selected
                        style={{ color: "#495057" }}
                      >
                        Select your city
                      </option>
                      {cities?.data?.data?.map((option, key) => (
                        <>
                          <option key={key.id} value={option.id}>
                            {option.name}
                          </option>
                        </>
                      ))}
                    </select>
                  )}
                />
                {errors.country?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    City is required
                  </p>
                )}
              </div>
            </div>
          
            <div className="col-12 col-md-6">
              <div className="form-group number-input mt-3">
                <label>Number of NFTs</label>
                <div class="position-relative">
                  <span
                    className="plus_icon"
                    onClick={() => {
                      setNFTCount(Number(nftCount) + 1);
                    }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </span>
                  <input
                    value={nftCount}
                    type="number"
                    className="form-control"
                    name="number_of_nft"
                    defaultValue={1}
                    // disabled={type == 1}
                    placeholder="Select your number of NFTs (1-10)"
                    min={1}
                    max={10}
                    {...register("number_of_nft", { required: true })}
                    aria-invalid={errors.number_of_nft ? "true" : "false"}
                    onChange={(e) => setNFTCount(e.target.value)}
                  />
                  <span
                    className="minus_icon"
                    onClick={() => {
                      if (Number(nftCount) > 1) {
                        setNFTCount(Number(nftCount) - 1);
                      } else {
                        setNFTCount(Number(1));
                      }
                    }}
                  >
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </span>
                </div>
                {/* {errors.number_of_nft?.message && <p>{errors.number_of_nft.message}</p>} */}
                {errors.number_of_nft?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Number of NFT is required
                  </p>
                )}
              </div>
            </div>
            {projdetail.type === '2' && (
              <>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Campaign Start date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="start_date"
                      // min={disablePastDate()}
                      // placeholder="Start date"
                      {...register("start_date", { required: true })}
                      aria-invalid={errors.start_date ? "true" : "false"}
                    />
                    {errors.start_date?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Start date is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Campaign End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="end_date"
                      min={disablePastDate()}
                      // placeholder="End date"
                      {...register("end_date", { required: true })}
                      aria-invalid={errors.end_date ? "true" : "false"}
                    />
                    {errors.end_date?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        End date is required
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="annual_revenue_range"
                  // defaultValue={}
                  {...register("category_id")}
                >
                  {cat?.map((option, key) => (
                    <option key={key.id} value={option.id}>
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12">
              <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default ProjDetailPopup;

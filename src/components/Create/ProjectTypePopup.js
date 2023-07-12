import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CityList, StateList } from "../../redux/Actions/authAction";
import { UpdateProject } from "../../redux/Actions/projectAction";
import { useHistory } from "react-router-dom";

function ProTypePopup(props) {
  // 
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState();
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState();
  const dispatch = useDispatch();
  const [nftCount, setNFTCount] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({});

  const projdetail = useSelector((state) => {
    return state?.projectdetails?.projectdetails;
  });

  useEffect(() => {
    if (
      location.pathname !== "/create" &&
      projdetail &&
      Object.keys(projdetail).length
    ) {
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
    if (location.pathname === "/create") {
      props.startdate(data.start_date);
      props.enddate(data.end_date);
      props.nftno(data.number_of_nft);
      props.onHide(true);
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", description);
      formData.append("state", data.state);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("address", data.address);
      formData.append("number_of_nft", data.number_of_nft);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("type", "2");
      formData.append("category_id", data.category_id);

      dispatch(UpdateProject(props, formData,history));
    }
  };
  const today = new Date();
  const numberOfDaysToAdd = 30;
  const date = today.setDate(today.getDate());
  const date1 = today.setDate(today.getDate() + numberOfDaysToAdd);
  const defaultValue = new Date(date).toISOString().substr(0, 10); // yyyy-mm-dd
  const defaultValue1 = new Date(date1).toISOString().substr(0, 10); // yyyy-mm-dd

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 0).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
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
          <label>Switch to Campaign for multiple NFTs</label>
          <br />
          <span>fill the following mandatory fields to continue</span>
        </div>
        <div></div>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="item-form card no-hover"
        >
          <div className="row">
            <>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Campaign Start date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    min={disablePastDate()}
                    defaultValue={defaultValue}
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
                    defaultValue={defaultValue1}
                    min={disablePastDate()}
                    {...register("end_date", { required: true })}
                    aria-invalid={errors.end_date ? "true" : "false"}
                  />
                  {errors.end_date && errors?.end_date?.type === "min" && (
                    <p style={{ color: "red" }} role="alert">
                      End date should be greater or equal to startdate
                    </p>
                  )}
                  {errors.end_date?.type === "required" && (
                    <p style={{ color: "red" }} role="alert">
                      End date is required
                    </p>
                  )}
                </div>
              </div>
            </>
            <div className="col-12 col-md-6">
              <div className="form-group number-input mt-3">
                <label>Number of NFTs</label>
                <div class="position-relative">
                  {/* <span
                    className="plus_icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNFTCount(Number(nftCount) + 1);
                    }}
                  >
                    <i
                      className="fa fa-plus"
                      aria-hidden="true"
                      style={{ paddingBottom: "2px" }}
                    ></i>
                  </span> */}
                  <input
                    value={nftCount}
                    type="number"
                    className="form-control"
                    name="number_of_nft"
                    min={1}
                    max={10}
                    maxLength={10}
                    placeholder="Select your number of NFTs (1-10)"
                    {...register("number_of_nft", {
                      required: true,
                      min: 1,
                      max: 10,
                    })}
                    aria-invalid={errors.number_of_nft ? "true" : "false"}
                    onChange={(e) => {
                      setNFTCount(e.target.value);
                    }}
                  />
                  {/* <span
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
                  </span> */}
                </div>
                {errors.number_of_nft?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Number of NFTs per project is required with a limit of 10
                  </p>
                )}
              </div>
            </div>
            <div className="col-12">
              <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                switch
              </button>
            </div>
            {/* } */}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default ProTypePopup;

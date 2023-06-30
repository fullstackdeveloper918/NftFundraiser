import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { BidNft } from "../Wallet/interact";
import { useState } from "react";
import { Loader } from "@react-three/drei";
function BidPopup(props) {
  //
  const [loading, setLoading] = useState(false);
  const [bidValue, setBidValue] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    //
    BidNft(
      props.id,
      props.projid,
      props.from,
      props.onHide,
      setLoading,
      data.amount
    );
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div className="d-flex justify-content-between w-full">
          <label className="modal-title h4 ">Place a bid</label>
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
        {loading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="item-form card no-hover"
          >
            <div className="row">
              <div className="col-12 pb-2">
                {window.ethereum?.selectedAddress &&
                sessionStorage.getItem("authToken") ? (
                  <label>
                    You are about to place a bid for{" "}
                    {props.projtitle?.toUpperCase()} from{" "}
                    {props.projcoll?.toUpperCase()}.
                  </label>
                ) : (
                  <label style={{ color: "red" }}>Connect your wallet.</label>
                )}
              </div>
              <div className="col-12">
                <label>Wallet address:</label>
                <div class="bidinput">
                  {window.ethereum?.selectedAddress &&
                  sessionStorage.getItem("authToken") ? (
                    window.ethereum?.selectedAddress
                  ) : (
                    <span style={{ color: "red" }} disabled>
                      Please connect your wallet
                    </span>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group number-input">
                  <label>Your bid</label>
                  <div class="position-relative">
                    <span
                      className="plus_icon"
                      onClick={() => {
                        setBidValue(Number(bidValue) + 1);
                      }}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                    <input
                      value={bidValue}
                      type="number"
                      min="0"
                      placeholder="Enter bid"
                      {...register("amount", { required: true })}
                      aria-invalid={errors.amount ? "true" : "false"}
                      onChange={(e) => setBidValue(e.target.value)}
                    />
                    <span
                      className="minus_icon"
                      onClick={() => {
                        if (Number(bidValue) <= 0) {
                          setBidValue(Number(0));
                        } else {
                          setBidValue(Number(bidValue) - 1);
                        }
                      }}
                    >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </span>
                  </div>
                  {errors.amount?.type === "required" && (
                    <p style={{ color: "red" }} role="alert">
                      Amount is required
                    </p>
                  )}
                </div>
              </div>
              <hr />
              <div className="col-12">
                <button
                  className="btn w-100 mt-3 mt-sm-4"
                  disabled={!sessionStorage.getItem("authToken")}
                  type="submit"
                >
                  Place Your Bid{" "}
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default BidPopup;

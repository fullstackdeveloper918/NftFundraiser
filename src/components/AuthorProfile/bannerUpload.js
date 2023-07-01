import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  GetUserAction,
  UpdateProfileAction,
} from "../../redux/Actions/authAction";
import UploadComponent from "../UploadComponent";
import { useHistory } from "react-router-dom";

function BannerUpload(props) {
  const [imageSrc, setImageSrc] = useState("");
  const userdet = useSelector((state) => {
    return state?.user?.userdetail;
  });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUserAction());
  }, [dispatch]);

  const submit = () => {
    const formData = new FormData();
    formData.append("username", userdet.username);
    formData.append("banner_image", imageSrc);
    dispatch(UpdateProfileAction(formData, props,history));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Profile Banner
        </Modal.Title>
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
        <>
          <div className="banner_img">
            <div>
            
              <UploadComponent imageSrc={imageSrc} setImageSrc={setImageSrc} />
            </div>
            <Button onClick={submit} className="btn btn-primary banner-update">
              Update
            </Button>
          </div>
        </>
      </Modal.Body>
    </Modal>
  );
}
export default BannerUpload;

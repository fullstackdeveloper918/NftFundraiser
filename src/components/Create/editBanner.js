import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UpdateBanner } from "../../redux/Actions/projectAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import UploadComponent from "../UploadComponent";
import { useHistory } from "react-router-dom";

function Banner(props) {
  const [imageSrc, setImageSrc] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const submit = () => {
    const formData = new FormData();
    // const image = dataURLtoBlob(imageSrc)
    formData.append("image", imageSrc);
    dispatch(UpdateBanner(formData, props,history));
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
          Project Banner
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
              {/* <UploadImage
                                imageSrc={imageSrc}
                                setImageSrc={setImageSrc}
                            /> */}
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

export default Banner;

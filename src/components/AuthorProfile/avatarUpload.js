import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import UploadImage from "../../shared/Upload";
import { dataURLtoBlob } from "../../utils/blobfromurl";
import {
  GetUserAction,
  UpdateProfileAction,
} from "../../redux/Actions/authAction";
import UploadComponent from "../UploadComponent";
// import { useDrop } from 'react-dnd';
// import { NativeTypes } from 'react-dnd-html5-backend';
// import 'react-image-picker-editor/dist/index.css'

function AvatarUpload(props) {
  const [imageSrc, setImageSrc] = useState("");
  const userdet = useSelector((state) => {
    return state?.user?.userdetail;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUserAction());
  }, []);

  const submit = () => {

    const formData = new FormData();
    // const avatar = dataURLtoBlob(imageSrc);
    
    formData.append("avatar", imageSrc);
    formData.append("username", userdet.username);
    dispatch(UpdateProfileAction(formData, props));
  };
  // const handleDrop = (item) => {
  //     if (item && item.files && item.files.length) {
  //         const file = item.files[0];
  //         const reader = new FileReader();

  //         reader.onload = (e) => {
  //             setImageSrc(e.target.result);
  //         };

  //         reader.readAsDataURL(file);
  //     }
  // };

  // const [{ canDrop, isOver }, drop] = useDrop(() => ({
  //     accept: [NativeTypes.FILE],
  //     drop: (item) => handleDrop(item),
  //     collect: (monitor) => ({
  //         isOver: monitor.isOver(),
  //         canDrop: monitor.canDrop(),
  //     }),
  // }));

  // const isActive = canDrop && isOver;
  // const backgroundColor = isActive ? 'lightgreen' : 'white';
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">User Image</Modal.Title>
        <div>
          <a>
            <i
              class="fa-regular fa-xmark-large"
              style={{ color: "#fff" }}
              onClick={() => {
                props.onHide();
                setImageSrc("");
              }}
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
              {/* <UploadImage imageSrc={imageSrc} setImageSrc={setImageSrc} /> */}
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
export default AvatarUpload;

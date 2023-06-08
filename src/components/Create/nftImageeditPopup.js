import { Form } from "antd";
import Modal from "react-bootstrap/Modal";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCollectionsAction,
  NftList,
  UpdateNft,
  uploadNFT,
} from "../../redux/Actions/projectAction";
import "antd/lib/form/style/css";
import "antd/lib/upload/style/css";
import "antd/lib/modal/style/css";
import "antd/lib/button/style/css";
import Loader from "../Loader/loader";
import DModal from "./3dModal";
import swal from "sweetalert";

const EditNftImage = (props) => {
  const editor = useRef(null);
  const [nftFileType, setNFtFileType] = useState("Image");
  const [nft, setNft] = useState([]);
  const [nftwidth, setNftwidth] = useState();
  const [size, setSize] = useState();
  const [nftHeight, setNftheight] = useState();
  const [Pimage, setPimage] = useState();
  const [previewnft, setPreviewnft] = useState();
  const [preview, setPreview] = useState();
  const [source, setSource] = useState();
  const [modalShowcoll, setModalShowcoll] = React.useState(false);
  const [nft_collection_id, setNft_collection_id] = useState({ 0: "0" });
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    setNft_description: "",
  };
  const ipfsBaseUrl = "https://ipfs.karmatica.io/ipfs/";
  const dispatch = useDispatch();

  const nftdetail = useSelector((state) => {
    return state.projectdetails.nftlist;
  });
  const handleUpload = (e) => {
    const filetype = e.target.files[0].type;
    var fr = new FileReader();
    fr.onload = function () {
      var img = new Image();
      img.onload = function () {
        setNftwidth(img.width);
        setNftheight(img.height);
      };
      img.src = fr.result; // is the data URL because called with readAsDataURL
    };
    fr.readAsDataURL(e.target.files[0]); // I'm using a <input type="file"> for demonstrating
    if (e.target.files[0].size > 104857600) {
      alert("Filesize must 100mb or below");
    } else {
      setSource(URL.createObjectURL(e.target.files[0]));
      setNft((prevState) => {
        return [e?.target?.files[0]];
      });
      switch (filetype) {
        case "image/png":
        case "image/jpg":
        case "image/gif":
        case "image/svg":
          setNFtFileType("Image");
          //   setSourceType("I")
          break;
        case "audio/mpeg":
        case "audio/ogg":
        case "video/mp4":
        case "video/webm":
          setNFtFileType("Player");
          break;
        case "":
          setNFtFileType("modal");
          break;
        default:
          setNFtFileType("Image");
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const previewChange = async (e, index) => {
    const pimage = e.target.files[0];
    const base64 = await convertToBase64(pimage);
    setPimage(base64);
    setPreview(URL.createObjectURL(pimage));
  };

  useEffect(() => {
    dispatch(GetCollectionsAction());
    dispatch(NftList(props.nft_id?.id));
    form.setFieldsValue({
      nfts: [
        {
          nft_name: nftdetail.title,
          nft_description: nftdetail.description,
          nft_collection_id: nftdetail.collection_id,
          nft_image: nftdetail.image,
          preview_imag: nftdetail.preview_imag,
        },
      ],
    });
    setImage(nftdetail.image);
    setNFtFileType(nftdetail.extention);
    setPreviewnft(nftdetail.preview_imag);
    setNft_collection_id(nftdetail.collection_id);
  }, [props.nft_id?.id, form, nftdetail]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (source) {
        const imagesRes = await uploadNFT(nft, dispatch);
        const addedImage = imagesRes?.data?.data.map(
          (x) => ipfsBaseUrl + x?.image_hash
        );
        var str = addedImage;
        var check = str.includes("https://ipfs.io/ipfs/undefined");
        if (check === false) {
          const formData = new FormData();
          formData.append("image", addedImage);
          formData.append(
            "title",
            values?.nfts?.map((x) => x.nft_name)
          );
          formData.append("collection_id", nft_collection_id);
          formData.append("preview_imag", Pimage);
          formData.append("extention", nftFileType);
          formData.append(
            "description",
            values?.nfts?.map((x) => x.nft_description)
          );
          dispatch(UpdateNft(formData, props, setLoading));
        } else {
          swal("error!", "Nft not uploaded", "error");
        }
      } else {
        const formData = new FormData();
        formData.append("image", image);
        formData.append(
          "title",
          values?.nfts?.map((x) => x.nft_name)
        );
        formData.append("extention", nftFileType);
        formData.append("preview_imag", previewnft);
        formData.append("collection_id", nft_collection_id);
        formData.append(
          "description",
          values?.nfts?.map((x) => x.nft_description)
        );
        dispatch(UpdateNft(formData, props, setLoading));
      }
    } catch (error) {
      swal("error", error, "error");
      setLoading(false);
    }
  };

  const nfts = [
    {
      key: 0,
      name: "Wheat Flour",
      amount: 1000,
    },
  ];

  return (
    <div className="main-create">
      <Modal
        className="edit_nft_popup"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
      >
        <>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter h-auto">
              Update NFT
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
            <div className="col-12">
              {loading ? (
                <Loader />
              ) : (
                <Form
                  form={form}
                  name="dynamic_form_nest_item"
                  initialValues={{
                    nfts: nfts,
                    defaultValues,
                  }}
                  onFinish={(event) => onFinish(event)}
                  autoComplete="off"
                  className="item-form card no-hover"
                >
                  <Form.List name="nfts">
                    {(fields, { add, remove }) => (
                      <>
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Fragment>
                              <div className="row relative ">
                                <div className="col-12">
                                  <div className="col-lg-12 col-12 uploadnftpopup p-0 mb-4">
                                    <label className="mt-3">Upload NFT</label>
                                    <div
                                      className="position-relative upload_nft"
                                      style={{
                                        backgroundImage: "url('')",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        margin: "0 auto",
                                      }}
                                    >
                                      <div
                                        className={
                                          nftFileType === "Player" ||
                                          nftFileType === "modal"
                                            ? " inputdragVedio"
                                            : "inputtdrag"
                                        }
                                      >
                                        <input
                                          type="file"
                                          onChange={handleUpload}
                                          maxCount={1}
                                          accept=".mov,.mp4,.mp3,.webm.gltf,.glb,.jpg,.jpeg,.gif,.svg"
                                        />
                                        {nftFileType === "Image" && (
                                          <div>
                                            {source ? (
                                              nftHeight >= 500 &&
                                              nftwidth >= 500 ? (
                                                <img
                                                  src={source}
                                                  className="nft-image"
                                                />
                                              ) : (
                                                <>
                                                  <p
                                                    style={{
                                                      color: "red",
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    Minimum size should be
                                                    500x500
                                                  </p>
                                                  <p
                                                    style={{
                                                      color: "red",
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    Image size should be max 1mb
                                                  </p>
                                                </>
                                              )
                                            ) : (
                                              <img
                                                src={image}
                                                className="nft-image"
                                              />
                                            )}
                                          </div>
                                        )}
                                        {nftFileType === "Player" && (
                                          <div>
                                            {source ? (
                                              <video
                                                width="100%"
                                                controls
                                                src={source}
                                              />
                                            ) : (
                                              <video
                                                width="100%"
                                                controls
                                                src={image}
                                              />
                                            )}
                                            <div className="uploadnftpopup_content">
                                              <label>Preview Image</label>
                                              <p>
                                                Because you’ve included
                                                multimedia, you’ll need to
                                                provide an image (PNG, JPG, or
                                                GIF) for the card display of
                                                your item
                                              </p>
                                            </div>
                                            <div
                                              className="uploadnftpopup-input upload-secound-input inputtdrag"
                                              style={{
                                                backgroundImage: "url('')",
                                                backgroundSize: "contain",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                              }}
                                            >
                                              <input
                                                type="file"
                                                onChange={previewChange}
                                              />
                                              <div className="uploadnftpopup-input-img  uploadnftpopup-secound">
                                                {!preview ? (
                                                  <img
                                                    className="preview_image"
                                                    src={previewnft}
                                                  />
                                                ) : (
                                                  <img
                                                    className="preview_image"
                                                    src={preview}
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {nftFileType === "modal" && (
                                          <div>
                                            {!source ? (
                                              <DModal vdo={image} />
                                            ) : (
                                              <DModal vdo={source} />
                                            )}
                                            <div className="uploadnftpopup_content">
                                              <label>Preview Image</label>
                                              <p className="">
                                                Because you’ve included
                                                multimedia, you’ll need to
                                                provide an image (PNG, JPG, or
                                                GIF) for the card display of
                                                your item
                                              </p>
                                            </div>
                                            <div
                                              className="uploadnftpopup-input upload-secound-input inputtdrag"
                                              style={{
                                                backgroundImage: "url('')",
                                                backgroundSize: "contain",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                              }}
                                            >
                                              <input
                                                type="file"
                                                onChange={previewChange}
                                              />
                                              <div className="uploadnftpopup-input-img  uploadnftpopup-secound">
                                                {!preview ? (
                                                  <img
                                                    className="preview_image"
                                                    src={previewnft}
                                                  />
                                                ) : (
                                                  <img
                                                    className="preview_image"
                                                    src={preview}
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          ))}
                        </>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <div className="col-12">
                      <button className="btn w-100 mb-3" type="submit">
                        Update{" "}
                      </button>
                    </div>
                  </Form.Item>
                </Form>
              )}
            </div>
          </Modal.Body>
        </>
      </Modal>
    </div>
  );
};
export default EditNftImage;

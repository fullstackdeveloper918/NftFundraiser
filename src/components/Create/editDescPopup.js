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
import "antd/lib/modal/style/css";
import "antd/lib/button/style/css";
import JoditEditor from "jodit-react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
// import ImgCrop from 'antd-img-crop';
const EditNftDesc = (props) => {
  const history = useHistory();
  const editor = useRef(null);
  const [nftFileType, setNFtFileType] = useState("Image");
  const [nft, setNft] = useState();
  const [nftwidth, setNftwidth] = useState();
  const [nftHeight, setNftheight] = useState();
  const [Pimage, setPimage] = useState();
  const [previewnft, setPreviewnft] = useState();
  const [preview, setPreview] = useState();
  const [source, setSource] = useState();
  const [nft_collection_id, setNft_collection_id] = useState({ 0: "0" });
  const [form] = Form.useForm();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    setNft_description: "",
  };
  const ipfsBaseUrl = "https://ipfs.karmatica.io/ipfs/";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCollectionsAction(history));
    dispatch(NftList(props.nft_id?.id, null, history));
  }, [props.nft_id?.id]);
 
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
      setNft(e.target.files[0]);
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
  }, [form, nftdetail]);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (source) {
        const nftImagepromises = [uploadNFT(nft, null, null, history)];
        const imagesRes = await Promise.all(nftImagepromises).then(
          (res) => res
        );
        const addedImage = imagesRes?.map(
          (x) => ipfsBaseUrl + x?.data?.data?.image_hash
        );
        var str = addedImage;
        var check = str.includes("https://ipfs.karmatica.io/ipfs/undefined");
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
          dispatch(UpdateNft(formData, props, setLoading, history));
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
        dispatch(UpdateNft(formData, props, setLoading, history));
      }
    } catch (error) {}
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
      {/* {loading ? (
                <Loader />
            ) : ( */}
      <Modal
        className="edit_nft_popup"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter ">
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
                          <div className="row relative">
                            <div className="col-12">
                              <label>Name</label>
                              <label>Description</label>
                              <div>
                                <Form.Item
                                  {...restField}
                                  name={[name, "nft_description"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing  description",
                                    },
                                  ]}
                                >
                                  <JoditEditor
                                    ref={editor}
                                    value={"nft_description"}
                                    placeholder="start typing"
                                    tabIndex={1} // tabIndex of textarea
                                    onChange={(newContent) => {}}
                                  />
                                  {/* }} */}
                                  {/* /> */}
                                </Form.Item>
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
          </div>
        </Modal.Body>
      </Modal>
      {/* )} */}
    </div>
  );
};
export default EditNftDesc;

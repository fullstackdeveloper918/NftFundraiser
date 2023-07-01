import { Button, Form, Input } from 'antd';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AddNftAction, GetCollectionsAction, uploadNFT } from '../../redux/Actions/projectAction';
import MyVerticallyCenteredModal from './createCollection';
import styles from './styles/styles.module.scss'
import 'antd/lib/form/style/css';
import 'antd/lib/upload/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css'
import swal from 'sweetalert';
import JoditEditor from 'jodit-react'
import Loader from '../Loader/loader';
import { useHistory, useLocation, useParams } from 'react-router';
import DModal from './3dModal';

const AddNft = ({ current, prev }) => {
    const editor = useRef(null);
    const [nft, setNft] = useState([])
    const [size, setSize] = useState()
    const [nftwidth, setNftwidth] = useState()
    const [nftHeight, setNftheight] = useState()
    const [Pimage, setPimage] = useState()
    const [modalShow, setModalShow] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState({ 0: "1" });
    const [NFtFileExtension, setNFtExtension] = useState([])
    const [source, setSource] = useState([])
    const [preview, setPreview] = useState([])
    const [nft_description, setNft_description] = useState([])
    const [sourceType, setSourceType] = useState([])
    const coll_id = (Object.values(nft_collection_id));
    const [loading, setLoading] = useState(false)
    const search = useLocation().search;
    const projid = new URLSearchParams(search).get('projectid');
    const slug = useParams()

    function onHandleClick(index, item) {
        setNft_collection_id(previ => {
            previ[index] = item
            return {
                ...previ,
            }
        }
        );
    };

    const defaultValues = {
        setNft_description: '',
    }

    const { register, formState: { errors } } = useForm({
        mode: 'all',
        defaultValues
    });

    const ipfsBaseUrl = 'https://ipfs.karmatica.io/ipfs/'
    const history = useHistory()
    const dispatch = useDispatch()
    const col = useSelector(state => {
        return state?.projectdetails?.getcollections
    })

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
        const pimage = e.target.files[0]
        const base64 = await convertToBase64(pimage);
        setPimage(base64)
        setPreview(prevState => {
            prevState[index] = e?.target?.files[0]
            return [...prevState]
        })
    };

    const handleUpload = (e, index) => {
        const filetype = e.target.files[0].type
        setNFtExtension(filetype)
        setNft(previ => {
            previ[index] = e.target.files[0]
            return [
                ...previ,

            ]
        })
        var fr = new FileReader;
        fr.onload = function () { // file is loaded
            var img = new Image;
            img.onload = function () {
                setSize(e.target.files[0].size);
                setNftwidth(img.width)
                setNftheight(img.height)
            };
            img.src = fr.result; // is the data URL because called with readAsDataURL
        };
        fr.readAsDataURL(e.target.files[0]); // I'm using a <input type="file"> for demonstrating
        let type = "Image"
        if (e.target.files[0].size > 104857600) {
            alert('Filesize must 100mb or below');
        } else {
            switch (filetype) {
                case 'image/png':
                case 'image/jpg':
                case 'image/gif':
                case 'image/svg':
                    type = "Image"
                    break;
                case 'audio/mpeg':
                case 'audio/ogg':
                case 'video/mp4':
                case 'video/webm':
                    type = 'Player'
                    break;
                case '':
                    // if (nft?.name?.str.includes(".glb")) {
                    type = 'modal'
                    // }
                    break;
                default:
                    type = 'Image'
            }
            // setNFtFileType(type)
            setSource(prevState => {
                // 
                prevState[index] = { file: e.target.files[0], type: type }
                setSourceType(type)
                return [...prevState]
            })

        }

    }

    useEffect(() => {
        dispatch(GetCollectionsAction(history))
        register("nft_description");
    }, [register]);

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const imagesRes = await uploadNFT(nft, dispatch,null,history)
            const addedImage = ipfsBaseUrl + imagesRes.data.data[0].image_hash
            var str = addedImage;
            var check = str.includes("https://ipfs.io/ipfs/undefined");
            const formData = new FormData()
            if (check === false) {
                formData.append('image', addedImage)
                formData.append('title', values?.nfts?.map(x =>
                    x.nft_name
                ))
                formData.append('collection_id', coll_id)
                formData.append('description', values?.nfts?.map(x => x.nft_description))
                formData.append('preview_imag', Pimage)
                formData.append('extention', sourceType)
                dispatch(AddNftAction(formData, projid, slug, setLoading, history))
            } else {
                setLoading(false)
                swal('error!', 'Nft not uploaded', 'error')
            }
        } catch (error) {
            setLoading(false)
            swal('error!', 'Nft not uploaded', 'error')
        }
    };

    const [form] = Form.useForm()

    const nfts = [
        {
            key: 0,
            name: 'Wheat Flour',
            amount: 1000
        },
    ];

    return (
        <section className="author-area">
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9">
                        {/* Intro */}
                        <div className="mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <><h3 className="mt-3 mb-0">Upload NFT</h3><p> Allowed types: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF</p><p>Maximum size: 100 MB</p></>
                                <div>
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <div className={current === 1 ? styles.showForm : styles.hideForm}>
                                            <Form
                                                form={form}
                                                name="dynamic_form_nest_item"
                                                initialValues={{
                                                    nfts: nfts,
                                                }}
                                                // onSubmit={(event) => handleSubmit(event)}
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
                                                                        {/* <div>Artwork {index}</div> */}
                                                                        <div className="row relative">
                                                                            <div className="col-12">
                                                                                <label>Name</label>
                                                                                <div>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, "nft_name"]}
                                                                                        // label="Enter name"
                                                                                        // name="name"
                                                                                        rules={[
                                                                                            {
                                                                                                required: true,
                                                                                                message: "Name is required",
                                                                                            },
                                                                                        ]}
                                                                                    >
                                                                                        {/* <label>Name</label> */}
                                                                                        <Input placeholder="Name" />
                                                                                    </Form.Item>
                                                                                </div>
                                                                                <label>Description</label>
                                                                                <div>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, "nft_description"]}
                                                                                        // label="Enter name"
                                                                                        // name="name"
                                                                                        rules={[
                                                                                            {
                                                                                                required: true,
                                                                                                message: "Missing  description",
                                                                                            },
                                                                                        ]}
                                                                                    >

                                                                                        <JoditEditor
                                                                                            ref={editor}
                                                                                            value={nft_description}
                                                                                            // config={config}
                                                                                            placeholder="start typing"
                                                                                            tabIndex={1} // tabIndex of textarea
                                                                                            onBlur={(newContent) =>
                                                                                                setNft_description(newContent)
                                                                                            } // preferred to use only this option to update the content for performance reasons
                                                                                            onChange={(newContent) => { }}
                                                                                        />

                                                                                    </Form.Item>
                                                                                    {errors.nft_description?.type ===
                                                                                        "required" && (
                                                                                            <p style={{ color: "red" }} role="alert">
                                                                                                Description is required
                                                                                            </p>
                                                                                        )}
                                                                                    {errors.nft_description &&
                                                                                        errors.nft_description.type ===
                                                                                        "minLength" && (
                                                                                            <p style={{ color: "red" }}>
                                                                                                min length of words is 300
                                                                                            </p>
                                                                                        )}
                                                                                </div>
                                                                            </div>

                                                                            {/* </div> */}
                                                                            <div className="col-12">
                                                                                <label className="mt-2 mb-3">
                                                                                    Choose Collection
                                                                                </label>
                                                                            </div>
                                                                            {col?.map((item, idx) => (
                                                                                <div
                                                                                    key={`auc_${idx}`}
                                                                                    id={item.id}
                                                                                    className="col-md-6 col-lg-3 col-12 choose_div"
                                                                                >
                                                                                    <div
                                                                                        id={item.id}
                                                                                        onClick={() =>
                                                                                            onHandleClick(index, item.id)
                                                                                        }
                                                                                        className="card"
                                                                                        style={{
                                                                                            background: "black",
                                                                                            marginBottom: "8px",
                                                                                            border:
                                                                                                nft_collection_id[index] == item.id
                                                                                                    ? "1px solid #fff"
                                                                                                    : null,
                                                                                        }}
                                                                                    >
                                                                                        <div className="card-body">
                                                                                            <div>{item.title}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* </Form.Item> */}
                                                                                </div>
                                                                                // </div>
                                                                            ))}
                                                                            <div className="col-md-6 col-lg-3 col-12">
                                                                                {/* <div className="col-24"> */}
                                                                                <div className="form-group">
                                                                                    <div
                                                                                        className="card choose_div"
                                                                                        style={{
                                                                                            background: "black",
                                                                                            marginBottom: "8px",
                                                                                        }}
                                                                                    >
                                                                                        <div className="card-body ">
                                                                                            <Button
                                                                                                variant="primary"
                                                                                                className="collection_btn"
                                                                                                onClick={() => setModalShow(true)}
                                                                                            >
                                                                                                <i className="f1a-regular fa-plus"></i>{" "}
                                                                                                Create Collection
                                                                                            </Button>
                                                                                            <MyVerticallyCenteredModal
                                                                                                show={modalShow}
                                                                                                onHide={() => setModalShow(false)}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12">
                                                                                <div className="col-lg-6 col-12 uploadnftpopup p-0 mb-4">
                                                                                    <label className="mt-3">Upload NFT</label>
                                                                                    <div
                                                                                        className="position-relative upload_nft"
                                                                                        style={{
                                                                                            backgroundImage: "url('')",
                                                                                            backgroundSize: "contain",
                                                                                            backgroundRepeat: "no-repeat",
                                                                                        }}
                                                                                    >

                                                                                        <div
                                                                                            className={
                                                                                                source[index]?.type === "Player" || source[index]?.type === "modal"
                                                                                                    ? " inputdragVedio"
                                                                                                    : "inputtdrag"
                                                                                            }
                                                                                        >
                                                                                            <input
                                                                                                type="file"
                                                                                                // onChange={handleUpload}
                                                                                                maxCount={1}
                                                                                                onChange={e => handleUpload(e, index)}
                                                                                                accept=".mov,.mp4,.mp3,.webm.gltf,.glb,.jpg,.jpeg,.gif,.svg"
                                                                                            />
                                                                                            {source?.length && source?.[index] && source[index]?.type === "Image" &&
                                                                                                <div>
                                                                                                    {/* {nftFileType === "Image" && nftHeight >= 500 && nftwidth >= 500 ? ( */}
                                                                                                    {source?.length && source?.[index] && source[index]?.type === "Image" && nftHeight >= 500 && nftwidth >= 500 && size <= "1000000" ? (
                                                                                                        <img
                                                                                                            src={URL.createObjectURL(source[index].file)}
                                                                                                            className="nft-image"
                                                                                                        />
                                                                                                    ) : (
                                                                                                        <>
                                                                                                            <p style={{ color: "red", marginLeft: '10px' }}>
                                                                                                                Minimum size should be 500x500
                                                                                                            </p>
                                                                                                            <p style={{ color: "red", marginLeft: '10px' }}>
                                                                                                                Image size should be max 1mb
                                                                                                            </p>
                                                                                                        </>
                                                                                                    )}

                                                                                                </div>
                                                                                            }
                                                                                            {source?.length && source?.[index] && source[index]?.type === "Player" &&
                                                                                                <div>
                                                                                                    <video
                                                                                                        // className="VideoInput_video"
                                                                                                        width="100%"
                                                                                                        // height={height}
                                                                                                        controls
                                                                                                        src={source?.length && source?.[index] && URL.createObjectURL(source[index]?.file)}
                                                                                                    // onChange={setSource}
                                                                                                    />
                                                                                                    {/* )} */}
                                                                                                    <div className="uploadnftpopup_content">
                                                                                                        <label>Preview Image</label>
                                                                                                        <p>
                                                                                                            Because you’ve included
                                                                                                            multimedia, you’ll need to provide
                                                                                                            an image (PNG, JPG, or GIF) for
                                                                                                            the card display of your item
                                                                                                        </p>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="uploadnftpopup-input upload-secound-input inputtdrag"
                                                                                                        style={{
                                                                                                            backgroundImage:
                                                                                                                "url('')",
                                                                                                            backgroundSize: "contain",
                                                                                                            backgroundRepeat: "no-repeat",
                                                                                                            backgroundPosition: "center",
                                                                                                        }}
                                                                                                    >
                                                                                                        <input
                                                                                                            type="file"
                                                                                                            onChange={e => previewChange(e, index)}
                                                                                                        // onChange={previewChange}
                                                                                                        />
                                                                                                        {preview?.length && preview?.[index] &&
                                                                                                            <div className="uploadnftpopup-input-img  uploadnftpopup-secound">
                                                                                                                {preview?.length && preview?.[index] && (
                                                                                                                    <img
                                                                                                                        className="preview_image"
                                                                                                                        src={URL.createObjectURL(preview[index])}
                                                                                                                    // onChange={setPimage}
                                                                                                                    />
                                                                                                                )}
                                                                                                            </div>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                            }
                                                                                            {source?.length && source?.[index] && source[index]?.type === "modal" && (
                                                                                                <div>
                                                                                                    <DModal
                                                                                                        vdo={source?.length && source?.[index] && URL.createObjectURL(source[index]?.file)}
                                                                                                    // mdl={setModal}
                                                                                                    />
                                                                                                    <div className="uploadnftpopup_content">
                                                                                                        <label>Preview Image</label>
                                                                                                        <p className="">
                                                                                                            Because you’ve included multimedia,
                                                                                                            you’ll need to provide an image
                                                                                                            (PNG, JPG, or GIF) for the card
                                                                                                            display of your item
                                                                                                        </p>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="uploadnftpopup-input upload-secound-input inputtdrag"
                                                                                                        style={{
                                                                                                            backgroundImage:
                                                                                                                "url('')",
                                                                                                            backgroundSize: "contain",
                                                                                                            backgroundRepeat: "no-repeat",
                                                                                                            backgroundPosition: "center",
                                                                                                        }}
                                                                                                    >
                                                                                                        <input
                                                                                                            type="file"
                                                                                                            onChange={e => previewChange(e, index)}
                                                                                                        />
                                                                                                        {preview?.length && preview?.[index] &&
                                                                                                            <div className="uploadnftpopup-input-img  uploadnftpopup-secound">
                                                                                                                {preview?.length && preview?.[index] && (
                                                                                                                    <img
                                                                                                                        className="preview_image"
                                                                                                                        src={URL.createObjectURL(preview[index])} />
                                                                                                                )}
                                                                                                            </div>
                                                                                                        }
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
                                                        <button className="btn w-100 mt-3 mt-sm-4 mb-3" type="submit">
                                                            Add
                                                        </button>
                                                    </div>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default AddNft;


import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload } from 'antd';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AddNftAction, CreateProjectAction, GetCollectionsAction, uploadNFT } from '../../redux/Actions/projectAction';
import { useFormData } from './Context/context'
import MyVerticallyCenteredModal from './createCollection';
import styles from './styles/styles.module.scss'
import 'antd/lib/form/style/css';
import 'antd/lib/upload/style/css';
import { Collapse } from 'antd';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css'
import swal from 'sweetalert';
import JoditEditor from 'jodit-react'
import Loader from '../Loader/loader';
import { useParams } from 'react-router';
import DModal from './3dModal';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
// import ImgCrop from 'antd-img-crop';

const AddNft = ({ current, prev }) => {
    const editor = useRef(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // console.log(data, 'formdta')
    const [count, setCount] = useState(0);
    // const [nft_description, setNft_description] = useState([])
    // console.log('nft_description', nft_description)
    const [nftFileType, setNFtFileType] = useState()
    const [nft, setNft] = useState()
    const [nftwidth, setNftwidth] = useState()
    console.log(nftwidth, 'nftwidth')
    const [nftHeight, setNftheight] = useState()
    const [Pimage, setPimage] = useState()
    console.log(nftHeight, 'nftheight')
    const [modalShow, setModalShow] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState({ 0: "1" });
    const [NFtFileExtension, setNFtExtension] = useState()
    const [source, setSource] = useState([])
    const [preview, setPreview] = useState([])
    const [nft_description, setNft_description] = useState([])
    // console.log('colldata', coldata)
    const [sourceType, setSourceType] = useState()
    // console.log(nft_collection_id)
    // const [coll_id,setCollId] = useState()
    const coll_id = (Object.values(nft_collection_id));
    // console.log("collid", coll_id)

    const [loading, setLoading] = useState(false)

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };


    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };
    // console.log(count, 'count')

    function onHandleClick(index, item) {
        setNft_collection_id(previ => {
            previ[index] = item
            return {
                ...previ,
            }
        }
        );
    };
    const { slug } = useParams()
    // function descc(e) {
    //     setNft_description(prev => [...prev, nft_description]);
    // };

    const defaultValues = {
        setNft_description: '',
    }
    // this.setState(prev => ({
    //     item: prev.item.map(item => item.name === 'xjz' ? { ...item, age: '10' } : item)
    // }))
    const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm({
        mode: 'all',
        defaultValues
    });
    useEffect(() => {
        register("nft_description");
    }, [register]);

    // const ipfsClient = create('http://127.0.0.1:5001')
    // const ipfsBaseUrl = 'https://ipfs.karmatica.io/ipfs/'
    const ipfsBaseUrl = 'https://ipfs.io/ipfs/'
    // const ipfsBaseUrl = ('http://127.0.0.1:8080/')
    // const ipfsBaseUrl = '`${process.env.REACT_APP_IPFS_BASE_URL}`'
    const dispatch = useDispatch()
    const col = useSelector(state => {
        // 
        return state?.projectdetails?.getcollections
    })
    const imaeg = useSelector(state => {
        // 
        return state?.projectdetails?.nftres
    })
    // console.log(imaeg, 'imgg')
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
            // debugger
            prevState[index] = e?.target?.files[0]

            return [...prevState]
        })

        // setPreview(pimage)
    };
    const handleUpload = (e, index) => {
        const filetype = e.target.files[0].type
        setNFtExtension(filetype)
        // debugger
        setNft(e.target.files[0])



        var fr = new FileReader;

        fr.onload = function () { // file is loaded
            var img = new Image;

            img.onload = function () {
                // alert(img.width); // image is loaded; sizes are available
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
                // debugger
                prevState[index] = { file: e.target.files[0], type: type }
                setSourceType(type)

                return [...prevState]
            })


            // switch (nft?.name?.str.includes(".glb")) {

            //     case '':
            //         setNFtFileType('modal')
            //         break;
            // }

        }

        // if (nftFileType === 'Image' && window.innerHeight > '500' && window.innerWidth > '500') {
        //     alert("This is  matching")
        // }
        // else {
        //     setNftError('Minimum size should be 500x500')
        //     alert('This is not matching')

        // }
    }

    // console.log('col', col)



    const lat = localStorage.getItem('latitude')
    // console.log(lat, 'lattt')
    const log = localStorage.getItem('longitude')
    // console.log(log, 'logggg')

    // const desdata = { nft_description() }
    useEffect(() => {

        dispatch(GetCollectionsAction())


    }, []);


    const onFinish = async (values) => {
        try {
            setLoading(true)
            const nftImagepromises = values?.nfts?.map(x => uploadNFT(nft))

            const imagesRes = await Promise.all(nftImagepromises).then(res => res)
            // 

            const addedImage = imagesRes?.map(x => ipfsBaseUrl + x?.data?.data?.image_hash)
            // 
            var str = addedImage;
            var check = str.includes("https://ipfs.io/ipfs/undefined");
            const formData = new FormData()



            if (check === false) {

                formData.append('image', addedImage)
                formData.append('title', values?.nfts?.map(x =>
                    x.nft_name
                ))
                // const newlist = newList.push(nft_collection_id);
                formData.append('collection_id', coll_id)
                // formData.append('nft_description', nft_description)
                formData.append('description', values?.nfts?.map(x => x.nft_description))
                // formData.append('nft_collection_id', values?.nfts?.map(x => x.nft_collection_id))
                formData.append('preview_imag', Pimage)
                formData.append('extention', sourceType)
                // dispatch(uploadNFT())
                dispatch(AddNftAction(formData, slug, setLoading))
                // setLoading(false)
            } else {
                // debugger
                console.log('fail')
                setLoading(false)
                swal('error!', 'Nft not uploaded', 'error')

            }
        } catch (error) {
            console.log(error, 'error')
        }
        // console.log('Received values of form:', values, data)

    };
    // console.log('title', localStorage.getItem('title'))
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const fileProps = {
        name: "file",
        multiple: false,
        beforeUpload: () => {
            return false;
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                let reader = new FileReader();
                reader.readAsDataURL(info.file);
                // setUploadedImage(info.file);
            }
        }
    };

    // const getFile = (e) => {
    //     // 
    //     console.log('Upload event:', e);

    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };
    const [form] = Form.useForm()
    // const save = (data) => {
    //     setNft_description(data)
    // };
    const { Panel } = Collapse;
    const [expandIconPosition, setExpandIconPosition] = useState('end');
    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    const onChange = (key) => {
        console.log(key);
    };
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
                                                            <Button className="previous_btn" onClick={() => prev()}>
                                                                <svg
                                                                    width="16px"
                                                                    height="16px"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fill="none"
                                                                        stroke="#fff"
                                                                        stroke-width="2"
                                                                        d="M2,12 L22,12 M13,3 L22,12 L13,21"
                                                                        transform="matrix(-1 0 0 1 24 0)"
                                                                    />
                                                                </svg>
                                                                Previous
                                                            </Button>

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
                                                                                        {/* <Controller
                                                                                control={control}
                                                                                name="nft_description"
                                                                                defaultValue=""
                                                                                render={({ field: { value, onChange } }) => {
                                                                                    return  */}
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
                                                                                        {/* }} */}
                                                                                        {/* /> */}
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


                                                                            <div className="col-md-1 col-12 nft-remove">
                                                                                <MinusCircleOutlined
                                                                                    onClick={(e) => {
                                                                                        remove(name);
                                                                                        handleDecrement(e);
                                                                                    }}
                                                                                />
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
                                                                                        {/* <Form.Item
                                                                            {...restField}
                                                                            name={[name, "nft_image"]}
                                                                            // getValueFromEvent={getFile}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Please select a image',
    
                                                                                },
                                                                            ]}
    
                                                                        > */}
                                                                                        {/* <div className='uploadnftpopup-input Icon_cam' > */}
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
                                                                                                    {source?.length && source?.[index] && source[index]?.type === "Image" && nftHeight >= 500 && nftwidth >= 500 ? (


                                                                                                        <img
                                                                                                            src={URL.createObjectURL(source[index].file)}
                                                                                                            className="nft-image"
                                                                                                        />
                                                                                                    ) : (
                                                                                                        <p style={{ color: "red", marginLeft: '10px' }}>
                                                                                                            Minimum size should be 500x500
                                                                                                        </p>



                                                                                                    )}
                                                                                                    {/* : (
                                                                                        <p style={{ color: "red" }}>
                                                                                            Minimum size should be 500x500
                                                                                        </p>
                                                                                    )
                                                                                    s
                                                                                    } */}
                                                                                                </div>
                                                                                            }

                                                                                            {source?.length && source?.[index] && source[index]?.type === "Player" &&
                                                                                                <div>
                                                                                                    {/* { source?.length && source?.[index] && source[index]?.type === "Player" && ( */}
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

                                                                                            {/* )} */}
                                                                                            {/* <div className="VideoInput_footer">{vdo || "Nothing selectd"}</div> */}

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
                                                                                        {/* </Form.Item> */}
                                                                                        {/* <Form.Item
                                                                            {...restField}
                                                                            name={[name, "nft_image"]}
                                                                            // getValueFromEvent={getFile}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Please select a MP4 File',
    
                                                                                },
                                                                            ]}
    
                                                                        >
    
                                                                            <VideoInput width={400} height={300} />
    
    
                                                                        </Form.Item> */}

                                                                                        {/* <div className="col-12 col-md-12">
                                                                            <div className="form-group">
                                                                                <label>MP4 & MP3 </label>
                                                                                <VideoInput width={400} height={300} />
    
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12 col-md-12">
                                                                            <div className="form-group">
                                                                                <label>3D Modal </label>
                                                                                <Dinosaur />
    
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12 col-md-12">
                                                                            <div className="form-group">
                                                                               
    
                                                                            </div>
                                                                        </div> */}
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
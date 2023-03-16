
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProjectAction, GetCollectionsAction, uploadNFT } from '../../redux/Actions/projectAction';
import { useFormData } from './Context/context'
import MyVerticallyCenteredModal from './createCollection';
import styles from './styles/styles.module.scss'
import 'antd/lib/form/style/css';
import 'antd/lib/upload/style/css';
import { Collapse } from 'antd';
import 'antd/lib/modal/style/css';

import 'antd/lib/button/style/css'
import JoditEditor from 'jodit-react'
import Loader from '../Loader/loader';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import DModal from './3dModal';
import ProTypePopup from './ProjectTypePopup';


const UploadNft = ({ current, prev }) => {

    const editor = useRef(null);
    const { data, setFormValues } = useFormData();

    const [count, setCount] = useState(1);
    console.log("count", count)
    const [nft_description, setNft_description] = useState([])
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);
    const [projmodalShow, setProjModalShow] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState({ 0: '1' });
    const [nftFileType, setNFtFileType] = useState()
    const [nft, setNft] = useState()
    const [nftwidth, setNftwidth] = useState()
    const [nftHeight, setNftheight] = useState()
    const [size, setSize] = useState()
    const [Pimage, setPimage] = useState()
    const [startDate, setStartDate] = useState("")
    console.log("startdate", startDate)
    const [endDate, setEndDate] = useState("")
    console.log("enddate", endDate)
    const [numberofNfts, setNumberofNfts] = useState("")
    console.log("noof nfts", numberofNfts)

    const coll_id = (Object.values(nft_collection_id));
    const [source, setSource] = useState([])
    const [sourceType, setSourceType] = useState()


    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState()
    const [NFtFileExtension, setNFtExtension] = useState()
    const [preview, setPreview] = useState([])
    console.log('previwimg', preview[0])
    const [projtype, setProjType] = useState("1")

    console.log(nft_collection_id, "nft collections")
    const [nftName, setNftName] = useState([])
    console.log("nftName", nftName)


    const handleIncrement = () => {
        // if (startDate && endDate && numberofNfts) {

        setCount(prevCount => prevCount + 1);
        // }
    };


    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
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


    const defaultValues = {
        setNft_description: '',
    }

    const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm({
        mode: 'all',
        defaultValues
    });
    useEffect(() => {

        register("nft_description");
        // let sType = source?.map((element) => element);
        // console.log('stype',sType)
        // setSourceType(sType) 

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
    // const { nodes, materials } = useGLTF("/img/adamHead.gltf");
    const OnSubmit = (values) => {
        // e.preventDefault
        // setColData(col)
        // 
        setFormValues(values)

    }
    // program to get the dimensions of an image



    // console.log('col', col)
    const handleUpload = (e, index) => {
        const filetype = e.target.files[0].type
        setNFtExtension(filetype)
        // debugger
        setNft(e.target.files[0])



        var fr = new FileReader;

        fr.onload = function () { // file is loaded
            var img = new Image;

            img.onload = function () {
                setSize(e.target.files[0].size); // image is loaded; sizes are available
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


        }
    }

    const lat = localStorage.getItem('latitude')
    // console.log(lat, 'lattt')
    const log = localStorage.getItem('longitude')
    // console.log(log, 'logggg')

    // const desdata = { nft_description() }

    useEffect(() => {

        dispatch(GetCollectionsAction())


    }, [])


    const onFinish = async (values) => {
        try {
            setLoading(true)
            // debugger
            // const nftImagepromises = values?.nfts?.map(x => uploadNFT(x?.nft_image?.file))
            const nftImagepromises = values?.nfts?.map(x => uploadNFT(nft))

            const imagesRes = await Promise.all(nftImagepromises).then(res => res)
            // 
            // debugger
            const addedImage = imagesRes?.map(x => ipfsBaseUrl + x?.data?.data?.image_hash)

            const addedImagetype = imagesRes?.map(x => x?.data?.data?.extension)
            var str = addedImage;
            var check = str.includes("https://ipfs.io/ipfs/undefined");
            // console.log(check)
            // console.log(addedImage.includes('undefined'), 'add')

            const formData = new FormData()

            // debugger
            if (check === false) {
                console.log('uploaded')
                formData.append('title', data.title)
                formData.append('description', data.description)
                formData.append('address', data.address)

                formData.append('country', data.country)
                if (!data.state) {

                    formData.append('state', '')
                } else {
                    formData.append('state', data.state)
                }
                if (!data.city) {
                    formData.append('city', '')
                } else {

                    formData.append('city', data.city)
                }
                formData.append('latitude', lat)
                formData.append('logitude', log)
                formData.append('price', data.price)

                formData.append('image', data.image)
                if (projtype == 1) {
                    formData.append('preview_imag', "")
                    formData.append('number_of_nft', "1")
                    formData.append('start_date', '')
                    formData.append('end_date', '')
                } else {
                    formData.append('preview_imag', Pimage)
                    formData.append('number_of_nft', numberofNfts)
                    formData.append('start_date', startDate)
                    formData.append('end_date', endDate)
                }
                formData.append('type', projtype)
                formData.append('category_id', data.category_id)


                formData.append('nft_image', addedImage)
                formData.append('extention', sourceType)
                formData.append('nft_name', values?.nfts?.map(x =>
                    x.nft_name
                ))

                formData.append('nft_collection_id', coll_id)
                formData.append('nft_description', nft_description)


                dispatch(CreateProjectAction(formData, setLoading, history))
            } else {

                console.log('fail')
                setLoading(false)
                swal('error!', 'Nft not uploaded', 'error')

            }
        } catch (error) {
            console.log(error, 'error')
        }

    };

    // // console.log('title', localStorage.getItem('title'))
    // const handleCancel = () => setPreviewOpen(false);

    // const handlePreview = async (file) => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setPreviewImage(file.url || file.preview);
    //     setPreviewOpen(true);
    //     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    // };
    // const validateFileType = (
    //     { type, name }
    //     allowedTypes?
    // ) => {
    //     if (!allowedTypes) {
    //         return true;
    //     }

    //     if (type) {
    //         return allowedTypes.includes(type);
    //     }
    // };

    const fileProps = {
        name: "file",
        multiple: false,

        beforeUpload: file => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {

                alert('You can only upload JPG/PNG file!');
            }
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                let reader = new FileReader();
                reader?.readAsDataURL(info.file);
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
    const nftNameHandler = (event, index) => {
        // debugger
        setNftName(prevState => {
            return {
                ...prevState,
                [index]: event?.target?.value
            }
        })
    }


    const headerDetail = Object?.values(nftName)
    console.log("headerdata", headerDetail)
    return (
        // <section className="author-area">
        <div className="main-create ">

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
                        onSubmit={OnSubmit}
                        onChange={nftNameHandler}
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
                                    {/* <div className='steps-center'>
    
    
                                                    <div className='orgicon1'>
    
                                                        <i className=" fa-solid fa-circle-check" style={{}}> Step 1</i>
                                                    </div>
    
                                                    <div className='orgicon1line'>
                                                        <span style={{}}> ----------------------------- </span>
    
                                                    </div>
                                                    <div className='orgicon2'>
    
                                                        <i className="fa-regular fa-circle" style={{}}> Step 2</i>
                                                    </div>
                                                </div> */}
                                    <>
                                        {fields.map(({ key, name, ...restField }, index) => (

                                            // setSourceType(source[index]?.file),
                                            // <Space
                                            //     key={key}
                                            //     style={{
                                            //         display: 'flex',
                                            //         marginBottom: 8,
                                            //     }}
                                            //     align="baseline"
                                            // >
                                            <Collapse accordion
                                                defaultActiveKey={[count]}
                                                onChange={onChange}
                                                expandIconPosition={expandIconPosition}
                                            >
                                                <Panel key={count} header={[nftName[index] ? <div className='Collapse-text'> {nftName[index].slice(0, 50) }  </div>: "Detail", source[index]?.type === "Image" ? <div>  <img src={URL.createObjectURL(source[index].file)} className="images-Collapse" /></div> : <div> <img src={preview?.[index] && window.URL.createObjectURL(preview[index])} className="images-Collapse" /></div>]} className="p-0 nft-Collapse">
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
                                                                        <Input placeholder="Name" onChange={e => nftNameHandler(e, index)} />
                                                                    </Form.Item>
                                                                </div>
                                                                <label>Description</label>
                                                                <div>
                                                                    {/* <Controller
                                                                            control={control}
                                                                            name="nft_description"
                                                                            defaultValue=""
                                                                            rules={{ required: true, minLength: 300 }}
                                                                            render={({ field }) => {
                                                                                return <JoditEditor
                                                                                    ref={field.ref}
                                                                                    value={field.value}
                                                                                    
                                                                                    aria-invalid={errors.nft_description ? "true" : "false"}
                                                                                    placeholder="start typing"
                                                                                    tabIndex={1} 
                                                                                    onBlur={newContent => setNft_description(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                                    onChange={field.onChange}
                                                                                />
                                                                            }}
    
    
                                                                        /> */}
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
                                                                            onBlur={(newContent, e) => setNft_description(newContent)}
                                                                            // preferred to use only this option to update the content for performance reasons
                                                                            onChange={(e) => { }}
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
                                                            {/* <div className="col-md-5 col-12">
                                                                        <label>Nft</label>
                                                                        <div>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, "nft_image"]}
                                                                                // getValueFromEvent={getFile}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message: 'Please select a image',
                                                                                    },
                                                                                ]}
    
                                                                            >
    
                                                                                <Upload
                                                                                    {...fileProps}
                                                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                                    listType="picture-card"
                                                                                    // fileList={fileList}
                                                                                    // onChange={onChange}
                                                                                    onPreview={handlePreview}
                                                                                    maxCount={1}
    
                                                                                >
                                                                                    + Upload
                                                                                </Upload>
    
    
                                                                            </Form.Item>
                                                                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                                                <img
                                                                                    alt="example"
                                                                                    style={{
                                                                                        width: '100%',
                                                                                    }}
                                                                                    src={previewImage} />
                                                                            </Modal>
                                                                        </div>
                                                                    </div> */}

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
                                                            <div className='d-flex flex-wrap gap-10 col-12'>



                                                                {col?.map((item, idx) => (
                                                                    <div
                                                                        key={`auc_${idx}`}
                                                                        id={item.id}
                                                                        className="choose_div"
                                                                    >
                                                                        <div
                                                                            id={item.id}
                                                                            onClick={() =>
                                                                                onHandleClick(index, item.id)
                                                                            }
                                                                            className=""
                                                                            style={{
                                                                                background: "black",
                                                                                marginBottom: "8px",
                                                                                border:
                                                                                    nft_collection_id[index] == item.id
                                                                                        ? "1px solid #fff"
                                                                                        : null,
                                                                            }}
                                                                        >

                                                                            <div>{item.title}</div>

                                                                        </div>
                                                                        {/* </Form.Item> */}
                                                                    </div>



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
                                                                                        {source?.length && source?.[index] && source[index]?.type === "Image" && nftHeight >= 500 && nftwidth >= 500 && size <= "1000000" ? (


                                                                                            <img
                                                                                                src={URL.createObjectURL(source[index].file)}
                                                                                                className="nft-image"
                                                                                            />
                                                                                        ) : (
                                                                                            <>
                                                                                                <p style={{ color: "red", marginLeft: '10px' }}>
                                                                                                    Image width & height should be 500x500
                                                                                                </p>
                                                                                                <p style={{ color: "red", marginLeft: '10px' }}>
                                                                                                    Image size should be max 1mb
                                                                                                </p>
                                                                                            </>
                                                                                        )

                                                                                        }
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
                                                        </div>
                                                    </Fragment>
                                                </Panel>
                                            </Collapse>
                                        ))}

                                        {/* {!((data?.number_of_nft === count)) ? */}
                                        {sourceType &&

                                            <Form.Item>
                                                <Tooltip title={count == 1 ? "Switch to Campaign for multiple NFTs" : 'Add more NFTs'} color='#4528dc'>
                                                    <Button
                                                        type="dashed"
                                                        onClick={(e) => {
                                                            {
                                                                count == 1 &&
                                                                    setProjModalShow(true)
                                                            }

                                                            // {
                                                            //     count == 2 &&


                                                            // }
                                                            {
                                                                numberofNfts && startDate && endDate &&
                                                                    add(e)
                                                                setProjType("2")
                                                                handleIncrement(e);
                                                                // setPannelKey(pannelKey + 1)

                                                            };
                                                            // {startDate && endDate && numberofNfts && 


                                                            // }

                                                        }}
                                                        block

                                                        icon={<PlusOutlined />}
                                                    // disabled={data?.number_of_nft == count}
                                                    >
                                                        Add NFT
                                                    </Button>
                                                </Tooltip>

                                            </Form.Item>


                                        }
                                        {/* : null} */}
                                    </>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <div className="col-12">
                                <button key="create-project" className="btn w-100 mt-3 mt-sm-4 mb-3" type="submit">
                                    Create
                                </button>
                            </div>
                        </Form.Item>
                    </Form>
                    <ProTypePopup
                        show={projmodalShow}
                        onHide={() => setProjModalShow(false)}
                        enddate={setEndDate}
                        startdate={setStartDate}
                        nftno={setNumberofNfts}

                    />
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />

                </div>
            )
            }
        </div >
    )
}
export default UploadNft
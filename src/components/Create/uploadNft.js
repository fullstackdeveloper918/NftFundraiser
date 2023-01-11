
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload } from 'antd';
import React, { Fragment, useEffect, useState, useRef, Suspense } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

import VideoAudioPLayer from './VideoInput';

import DModal from './3dModal';

import { useGLTF } from "@react-three/drei";
import ImageViewer from './ImageViewer';








const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const UploadNft = ({ current, prev }) => {

    const editor = useRef(null);
    const { data, setFormValues } = useFormData();
    console.log(data, 'dataaa')
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // console.log(data, 'formdta')
    const [count, setCount] = useState(1);
    const [nft_description, setNft_description] = useState([])
    console.log('count', count)
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState({ 0: '1' });
    const [nftFileType, setNFtFileType] = useState()
    const [nft, setNft] = useState()
    const [nftwidth, setNftwidth] = useState()
    console.log(nftwidth, 'nftwidth')
    const [nftHeight, setNftheight] = useState()
    const [Pimage, setPimage] = useState()
    console.log(nftHeight, 'nftheight')
    console.log('nfterror', nft)
    console.log('nftFile', nftFileType)
    // console.log('colldata', coldata)
    // console.log(nft_collection_id)
    // const [coll_id,setCollId] = useState()
    const coll_id = (Object.values(nft_collection_id));
    // console.log("collid", coll_id)
    const [source, setSource] = useState('')
    console.log('source', source)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState()

    console.log(nft_collection_id, "nft collections")
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };


    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };
    const previewChange = e => {
        const pimage = e.target.files[0]
        setPimage(URL.createObjectURL(pimage))
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
    // const { nodes, materials } = useGLTF("/img/adamHead.gltf");
    const OnSubmit = (values) => {
        // e.preventDefault
        // setColData(col)
        // 
        setFormValues(values)

    }
    // program to get the dimensions of an image



    // console.log('col', col)
    const handleUpload = e => {
        const filetype = e.target.files[0].type
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
        if (e.target.files[0].size > 104857600) {
            alert('Filesize must 100mb or below');
        } else {

            setSource(URL.createObjectURL(e.target.files[0]))

            switch (filetype) {
                case 'image/png':
                case 'image/jpg':
                case 'image/gif':
                case 'image/svg':
                    setNFtFileType('Image')
                    break;
                case 'audio/mpeg':
                case 'audio/ogg':
                case 'video/mp4':
                case 'video/webm':
                    setNFtFileType('Player')
                    break;
                case '':
                    setNFtFileType('modal')
                    break;
                default:
                    setNFtFileType('Image')
            }


        }


        // if (nftFileType === 'Image' && window.innerHeight > '500' && window.innerWidth > '500') {
        //     alert("This is  matching")
        // }
        // else {
        //     setNftError('Minimum size should be 500x500')
        //     alert('This is not matching')

        // }
    }
    // useEffect(() => {

    //     if (nftFileType === 'Image' && window.innerHeight <= 800 && window.innerWidth < 800) {
    //         alert("This is not matching")
    //     }
    //     // else {
    //     //     alert('This is not matching')
    //     //     setNftError('Minimum should be 800x800')

    //     // }
    // }, [])

    const lat = localStorage.getItem('latitude')
    // console.log(lat, 'lattt')
    const log = localStorage.getItem('longitude')
    // console.log(log, 'logggg')

    // const desdata = { nft_description() }
    useEffect(() => {

        dispatch(GetCollectionsAction())


    }, []);


    const onFinish = async (values) => {
        // debugger
        try {
            setLoading(true)
            // debugger
            // const nftImagepromises = values?.nfts?.map(x => uploadNFT(x?.nft_image?.file))
            const nftImagepromises = values?.nfts?.map(x => uploadNFT(nft))

            const imagesRes = await Promise.all(nftImagepromises).then(res => res)
            // 

            const addedImage = imagesRes?.map(x => ipfsBaseUrl + x?.data?.data?.image_hash)
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
                formData.append('preview_imag', Pimage)
                formData.append('logitude', log)
                formData.append('price', data.price)
                formData.append('number_of_nft', data.number_of_nft)
                formData.append('image', data.image)
                if (data.type == 1) {
                    formData.append('start_date', '')
                    formData.append('end_date', '')
                } else {

                    formData.append('start_date', data.start_date)
                    formData.append('end_date', data.end_date)
                }
                formData.append('type', data.type)
                formData.append('category_id', data.category_id)


                formData.append('nft_image', addedImage)
                formData.append('nft_name', values?.nfts?.map(x =>
                    x.nft_name
                ))
                // const newlist = newList.push(nft_collection_id);
                formData.append('nft_collection_id', coll_id)
                formData.append('nft_description', nft_description)
                // formData.append('nft_description', values?.nfts?.map(x => x.nft_description))
                // formData.append('nft_collection_id', values?.nfts?.map(x => x.nft_collection_id))

                // dispatch(uploadNFT())
                dispatch(CreateProjectAction(formData, setLoading, history))
            } else {
                // debugger
                console.log('fail')
                setLoading(false)
                swal('error!', 'Nft not uploaded', 'error')

            }
        } catch (error) {
            console.log(error, 'error')
        }


        // setLoading(false)

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
    return (
        // <section className="author-area">
        <div className='main-create'>
            {loading ? (
                <Loader />
            ) : (

                <div className={current === 1 ? styles.showForm : styles.hideForm}>
                    <Form form={form} name="dynamic_form_nest_item" initialValues={{
                        nfts: nfts
                    }}
                        // onSubmit={(event) => handleSubmit(event)}
                        onFinish={(event) => onFinish(event)}
                        onSubmit={OnSubmit} autoComplete="off" className="item-form card no-hover">
                        <Form.List name="nfts">

                            {(fields, { add, remove }) => (
                                <>
                                    <Button className="previous_btn" onClick={() => prev()}>
                                        <svg width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="none" stroke="#fff" stroke-width="2" d="M2,12 L22,12 M13,3 L22,12 L13,21" transform="matrix(-1 0 0 1 24 0)" />
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
                                            // <Space
                                            //     key={key}
                                            //     style={{
                                            //         display: 'flex',
                                            //         marginBottom: 8,
                                            //     }}
                                            //     align="baseline"
                                            // >
                                            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                                                <Panel header="Details" key="1">
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
                                                                                message: 'Name is required',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        {/* <label>Name</label> */}
                                                                        <Input placeholder="Name" />
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
                                                                                message: 'Missing  description',
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
                                                                            onBlur={newContent => setNft_description(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                            onChange={newContent => { }}
                                                                        />
                                                                        {/* }} */}
                                                                        {/* /> */}
                                                                    </Form.Item>
                                                                    {errors.nft_description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                                                                    {errors.nft_description && errors.nft_description.type === "minLength" && (
                                                                        <p style={{ color: 'red' }}>
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
                                                                <MinusCircleOutlined onClick={(e) => { remove(name); handleDecrement(e); }} />
                                                            </div>
                                                            {/* </div> */}
                                                            <div className='col-12'>
                                                                <label className='mt-2 mb-3'>Choose Collection</label>
                                                            </div>
                                                            <div className="col-md-6 col-lg-3 col-12">

                                                                {/* <div className="col-24"> */}

                                                                <div className="form-group">

                                                                    <div className="card choose_div" style={{
                                                                        background: "black",
                                                                        marginBottom: "8px",
                                                                    }}>
                                                                        <div className="card-body ">
                                                                            <Button variant="primary" className='collection_btn' onClick={() => setModalShow(true)}>
                                                                                <i className="fa-regular fa-plus" ></i> Create Collection
                                                                            </Button>

                                                                            <MyVerticallyCenteredModal
                                                                                show={modalShow}
                                                                                onHide={() => setModalShow(false)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            {col?.map((item, idx) => (

                                                                <div key={`auc_${idx}`} id={item.id} className="col-md-6 col-lg-3 col-12 choose_div" >




                                                                    <div id={item.id} onClick={() => onHandleClick(index, item.id)} className="card"
                                                                        style={{
                                                                            background: "black",
                                                                            marginBottom: "8px",
                                                                            border: nft_collection_id[index] == item.id ? "1px solid #fff" : null
                                                                        }}

                                                                    >

                                                                        <div className="card-body"  >
                                                                            <div>


                                                                                {item.title}
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                    {/* </Form.Item> */}

                                                                </div>
                                                                // </div>
                                                            ))}
                                                            <div className="col-md-12 col-12 uploadnftpopup">
                                                                <label>Upload Nft</label>
                                                                <div>
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

                                                                    <input
                                                                        type="file"
                                                                        onChange={handleUpload}
                                                                        maxCount={1}

                                                                        accept=".mov,.mp4,.mp3,.webm.gltf,.glb,.jpg,.jpeg,.gif,.svg"
                                                                    />
                                                                    {nftFileType === 'Image' &&
                                                                        <div>
                                                                            {nftFileType === 'Image' && nftHeight >= 500 && nftwidth >= 500 ? (
                                                                                <img
                                                                                    width={200}
                                                                                    height={200}
                                                                                    src={source}




                                                                                />
                                                                            ) : (
                                                                                <p style={{ color: 'red' }}>Minimum size should be 500x500</p>
                                                                            )
                                                                                // <ImageViewer vdo={source} width={400} height={300} />
                                                                            }
                                                                        </div>
                                                                    }

                                                                    {nftFileType === 'Player' &&
                                                                        <div className="VideoInput">
                                                                            {/* {!vdo && <button onClick={handleChoose}>Choose</button>} */}
                                                                            {/* {source && ( */}
                                                                            <video
                                                                                className="VideoInput_video"
                                                                                width="100%"
                                                                                // height={height}
                                                                                controls
                                                                                src={source}
                                                                            />
                                                                            {/* )} */}
                                                                            {/* <div className="VideoInput_footer">{vdo || "Nothing selectd"}</div> */}
                                                                            <div>
                                                                                <label>Preview Image</label>
                                                                                <p>Because you’ve included multimedia, you’ll need to provide an image (PNG, JPG, or GIF) for the card display of your item</p>                                                                      </div>
                                                                            <input
                                                                                type='file'
                                                                                onChange={previewChange}
                                                                            />
                                                                            <img
                                                                                width={200}
                                                                                height={200}
                                                                                src={Pimage}
                                                                            />
                                                                        </div>}
                                                                    {nftFileType === 'modal' &&
                                                                        <div>
                                                                            <DModal
                                                                                vdo={source}
                                                                            // mdl={setModal}
                                                                            />
                                                                            <div>
                                                                                <label>Preview Image</label>
                                                                                <p>Because you’ve included multimedia, you’ll need to provide an image (PNG, JPG, or GIF) for the card display of your item</p>                                                                      </div>
                                                                            <input
                                                                                type='file'
                                                                                onChange={previewChange}
                                                                            />
                                                                            <img
                                                                                width={200}
                                                                                height={200}
                                                                                src={Pimage}
                                                                            />
                                                                        </div>
                                                                    }


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
                                                    </Fragment>
                                                </Panel>
                                            </Collapse>
                                        ))}


                                        {!((data?.number_of_nft === count)) ?
                                            <Form.Item>
                                                <Button type="dashed" onClick={(e) => { add(e); handleIncrement(e); }} block icon={<PlusOutlined />} disabled={data?.number_of_nft == count}>
                                                    Add NFT
                                                </Button>
                                            </Form.Item>
                                            : null}
                                    </></>
                            )}

                        </Form.List>
                        <Form.Item>
                            <div className="col-12">
                                <button className="btn w-100 mt-3 mt-sm-4 mb-3" type="submit">Create</button>
                            </div>

                        </Form.Item>
                    </Form>
                </div>

            )}
        </div>
    );
};
export default UploadNft;

// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Form, Input, Modal, Upload } from 'antd';
// import React, { Fragment, useEffect, useState, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddNftAction, CreateProjectAction, GetCollectionsAction, uploadNFT } from '../../redux/Actions/projectAction';
// import { useFormData } from './Context/context'
// import MyVerticallyCenteredModal from './createCollection';
// import styles from './styles/styles.module.scss'
// import 'antd/lib/form/style/css';
// import 'antd/lib/upload/style/css';
// import { Collapse } from 'antd';
// import 'antd/lib/modal/style/css';
// import 'antd/lib/button/style/css'
// import JoditEditor from 'jodit-react'
// import Loader from '../Loader/loader';
// import { useParams } from 'react-router';

// const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
// // import ImgCrop from 'antd-img-crop';

// const AddNft = ({ current, prev }) => {
//     const editor = useRef(null);
//     const [previewOpen, setPreviewOpen] = useState(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const [previewTitle, setPreviewTitle] = useState('');
//     // console.log(data, 'formdta')
//     const [count, setCount] = useState(0);
//     // const [nft_description, setNft_description] = useState([])
//     // console.log('nft_description', nft_description)

//     const [modalShow, setModalShow] = React.useState(false);
//     const [nft_collection_id, setNft_collection_id] = useState({ 0: "0" });
//     // console.log('colldata', coldata)
//     // console.log(nft_collection_id)
//     // const [coll_id,setCollId] = useState()
//     const coll_id = (Object.values(nft_collection_id));
//     // console.log("collid", coll_id)

//     const [loading, setLoading] = useState(false)

//     const handleIncrement = () => {
//         setCount(prevCount => prevCount + 1);
//     };


//     const handleDecrement = () => {
//         setCount(prevCount => prevCount - 1);
//     };
//     // console.log(count, 'count')

//     function onHandleClick(index, item) {
//         setNft_collection_id(previ => {
//             previ[index] = item
//             return {
//                 ...previ,
//             }
//         }
//         );
//     };
//     const { id } = useParams()
//     // function descc(e) {
//     //     setNft_description(prev => [...prev, nft_description]);
//     // };

//     const defaultValues = {
//         setNft_description: '',
//     }
//     // this.setState(prev => ({
//     //     item: prev.item.map(item => item.name === 'xjz' ? { ...item, age: '10' } : item)
//     // }))
//     const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm({
//         mode: 'all',
//         defaultValues
//     });
//     useEffect(() => {
//         register("nft_description");
//     }, [register]);

//     // const ipfsClient = create('http://127.0.0.1:5001')
//     // const ipfsBaseUrl = 'https://ipfs.karmatica.io/ipfs/'
//     const ipfsBaseUrl = 'https://ipfs.io/ipfs/'
//     // const ipfsBaseUrl = ('http://127.0.0.1:8080/')
//     // const ipfsBaseUrl = '`${process.env.REACT_APP_IPFS_BASE_URL}`'
//     const dispatch = useDispatch()
//     const col = useSelector(state => {
//         // 
//         return state?.projectdetails?.getcollections
//     })
//     const imaeg = useSelector(state => {
//         // 
//         return state?.projectdetails?.nftres
//     })
//     // console.log(imaeg, 'imgg')




//     // console.log('col', col)



//     const lat = localStorage.getItem('latitude')
//     // console.log(lat, 'lattt')
//     const log = localStorage.getItem('longitude')
//     // console.log(log, 'logggg')

//     // const desdata = { nft_description() }
//     useEffect(() => {

//         dispatch(GetCollectionsAction())


//     }, []);


//     const onFinish = async (values) => {

//         setLoading(true)
//         const nftImagepromises = values?.nfts?.map(x => uploadNFT(x?.nft_image?.file))

//         const imagesRes = await Promise.all(nftImagepromises).then(res => res)
//         // 

//         const addedImage = imagesRes?.map(x => ipfsBaseUrl + x?.data?.data?.image_hash)
//         // 

//         const formData = new FormData()





//         formData.append('image', addedImage)
//         formData.append('title', values?.nfts?.map(x =>
//             x.nft_name
//         ))
//         // const newlist = newList.push(nft_collection_id);
//         formData.append('collection_id', coll_id)
//         // formData.append('nft_description', nft_description)
//         formData.append('description', values?.nfts?.map(x => x.nft_description))
//         // formData.append('nft_collection_id', values?.nfts?.map(x => x.nft_collection_id))

//         // dispatch(uploadNFT())
//         dispatch(AddNftAction(formData, id, setLoading))
//         // setLoading(false)

//         // console.log('Received values of form:', values, data)

//     };
//     // console.log('title', localStorage.getItem('title'))
//     const handleCancel = () => setPreviewOpen(false);

//     const handlePreview = async (file) => {
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj);
//         }
//         setPreviewImage(file.url || file.preview);
//         setPreviewOpen(true);
//         setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
//     };

//     const fileProps = {
//         name: "file",
//         multiple: false,
//         beforeUpload: () => {
//             return false;
//         },
//         onChange(info) {
//             if (info.file.status !== "uploading") {
//                 let reader = new FileReader();
//                 reader.readAsDataURL(info.file);
//                 // setUploadedImage(info.file);
//             }
//         }
//     };

//     // const getFile = (e) => {
//     //     // 
//     //     console.log('Upload event:', e);

//     //     if (Array.isArray(e)) {
//     //         return e;
//     //     }
//     //     return e && e.fileList;
//     // };
//     const [form] = Form.useForm()
//     // const save = (data) => {
//     //     setNft_description(data)
//     // };
//     const { Panel } = Collapse;
//     const [expandIconPosition, setExpandIconPosition] = useState('end');
//     const onPositionChange = (newExpandIconPosition) => {
//         setExpandIconPosition(newExpandIconPosition);
//     };
//     const onChange = (key) => {
//         console.log(key);
//     };
//     const nfts = [
//         {
//             key: 0,
//             name: 'Wheat Flour',
//             amount: 1000
//         },

//     ];
//     return (
//         <section className="author-area">
//             <div className="container">
//                 <div className="row justify-content-center">


//                     <div className="col-14 col-md-9">
//                         {/* Intro */}
//                         <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
//                             <div className="intro-content">

//                                 <><h3 className="mt-3 mb-0">Upload NFT</h3><p> Allowed types: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF</p><p>Maximum size: 100 MB</p></>


//                                 <div>
//                                     {loading ? (
//                                         <Loader />
//                                     ) : (

//                                         <div >
//                                             <Form form={form} name="dynamic_form_nest_item" initialValues={{
//                                                 nfts: nfts
//                                             }}
//                                                 // onSubmit={(event) => handleSubmit(event)}
//                                                 onFinish={(event) => onFinish(event)}
//                                                 autoComplete="off" className="item-form card no-hover">
//                                                 <Form.List name="nfts">

//                                                     {(fields, { add, remove }) => (
//                                                         <>
//                                                             {/* <div className='steps-center'>


//                                                 <div className='orgicon1'>

//                                                     <i className=" fa-solid fa-circle-check" style={{}}> Step 1</i>
//                                                 </div>

//                                                 <div className='orgicon1line'>
//                                                     <span style={{}}> ----------------------------- </span>

//                                                 </div>
//                                                 <div className='orgicon2'>

//                                                     <i className="fa-regular fa-circle" style={{}}> Step 2</i>
//                                                 </div>
//                                             </div> */}
//                                                             <>
//                                                                 {fields.map(({ key, name, ...restField }, index) => (
//                                                                     // <Space
//                                                                     //     key={key}
//                                                                     //     style={{
//                                                                     //         display: 'flex',
//                                                                     //         marginBottom: 8,
//                                                                     //     }}
//                                                                     //     align="baseline"
//                                                                     // >

//                                                                     <Fragment>
//                                                                         {/* <div>Artwork {index}</div> */}
//                                                                         <div className="row">

//                                                                             <div className="col-md-10 col-12">
//                                                                                 <label>Name</label>
//                                                                                 <div>

//                                                                                     <Form.Item
//                                                                                         {...restField}
//                                                                                         name={[name, "nft_name"]}
//                                                                                         // label="Enter name"
//                                                                                         // name="name"
//                                                                                         rules={[
//                                                                                             {
//                                                                                                 required: true,
//                                                                                                 message: 'Missing  name',
//                                                                                             },
//                                                                                         ]}
//                                                                                     >
//                                                                                         {/* <label>Name</label> */}
//                                                                                         <Input placeholder="Name" />
//                                                                                     </Form.Item>
//                                                                                 </div>
//                                                                                 <label>Description</label>
//                                                                                 <div>

//                                                                                     <Form.Item
//                                                                                         {...restField}
//                                                                                         name={[name, "nft_description"]}
//                                                                                         // label="Enter name"
//                                                                                         // name="name"
//                                                                                         rules={[
//                                                                                             {
//                                                                                                 required: true,
//                                                                                                 message: 'Missing  description',
//                                                                                             },
//                                                                                         ]}
//                                                                                     >
//                                                                                         {/* <Controller
//                                                                             control={control}
//                                                                             name="nft_description"
//                                                                             defaultValue=""
//                                                                             render={({ field: { value, onChange } }) => {
//                                                                                 return  */}
//                                                                                         <JoditEditor
//                                                                                             ref={editor}
//                                                                                             value={'nft_description'}
//                                                                                             // config={config}

//                                                                                             placeholder="start typing"
//                                                                                             tabIndex={1} // tabIndex of textarea
//                                                                                             // onBlur={newContent => 'nft_description'(newContent)} // preferred to use only this option to update the content for performance reasons
//                                                                                             onChange={newContent => { }}
//                                                                                         />
//                                                                                         {/* }} */}
//                                                                                         {/* /> */}
//                                                                                     </Form.Item>
//                                                                                 </div>
//                                                                             </div>
//                                                                             {/* <div className="col-md-5 col-12">
//                                                                     <label>Nft</label>
//                                                                     <div>
//                                                                         <Form.Item
//                                                                             {...restField}
//                                                                             name={[name, "nft_image"]}
//                                                                             // getValueFromEvent={getFile}
//                                                                             rules={[
//                                                                                 {
//                                                                                     required: true,
//                                                                                     message: 'Please select a image',
//                                                                                 },
//                                                                             ]}

//                                                                         >

//                                                                             <Upload
//                                                                                 {...fileProps}
//                                                                                 action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                                                                                 listType="picture-card"
//                                                                                 // fileList={fileList}
//                                                                                 // onChange={onChange}
//                                                                                 onPreview={handlePreview}
//                                                                                 maxCount={1}

//                                                                             >
//                                                                                 + Upload
//                                                                             </Upload>


//                                                                         </Form.Item>
//                                                                         <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//                                                                             <img
//                                                                                 alt="example"
//                                                                                 style={{
//                                                                                     width: '100%',
//                                                                                 }}
//                                                                                 src={previewImage} />
//                                                                         </Modal>
//                                                                     </div>
//                                                                 </div> */}
//                                                                             <div className="col-md-1 col-12">
//                                                                                 <MinusCircleOutlined onClick={(e) => { remove(name); handleDecrement(e); }} />
//                                                                             </div>
//                                                                             {/* </div> */}
//                                                                             <div className="col-md-3 col-12">

//                                                                                 {/* <div className="col-24"> */}

//                                                                                 <div className="form-group">
//                                                                                     <label className='mt-2'>Choose Collection</label>
//                                                                                     <div className="card choose_div" style={{
//                                                                                         background: "black",
//                                                                                         marginBottom: "8px",
//                                                                                     }}>
//                                                                                         <div className="card-body ">
//                                                                                             <Button variant="primary" onClick={() => setModalShow(true)}>
//                                                                                                 <i className="fa-regular fa-plus" ></i> Create Collection
//                                                                                             </Button>

//                                                                                             <MyVerticallyCenteredModal
//                                                                                                 show={modalShow}
//                                                                                                 onHide={() => setModalShow(false)} />
//                                                                                         </div>
//                                                                                     </div>
//                                                                                 </div>
//                                                                             </div>


//                                                                             {col?.map((item, idx) => (

//                                                                                 <div key={`auc_${idx}`} id={item.id} className="col-md-3 col-12 choose_div">
//                                                                                     {/* <Form.Item
//                                                                             {...restField}
//                                                                             name={[name, "nft_collection_id"]}
//                                                                             // getValueFromEvent={getFile}
//                                                                             rules={[
//                                                                                 {
//                                                                                     required: true,
//                                                                                     message: 'Please select nft collection',
//                                                                                 },
//                                                                             ]}

//                                                                         > */}
//                                                                                     <label className='hidden-word'>jsaswjdwjd</label>

//                                                                                     <div id={item.id} onClick={() => onHandleClick(index, item.id)} className="card"
//                                                                                         style={{
//                                                                                             background: "black",
//                                                                                             marginBottom: "8px",
//                                                                                             border: nft_collection_id[index] == item.id ? "1px solid #fff" : null
//                                                                                         }}>
//                                                                                         <div className="card-body">
//                                                                                             <div>


//                                                                                                 {item.title}
//                                                                                             </div>


//                                                                                         </div>
//                                                                                     </div>
//                                                                                     {/* </Form.Item> */}

//                                                                                 </div>
//                                                                                 // </div>
//                                                                             ))}
//                                                                             <div className="col-md-12 col-12">
//                                                                                 <label>Upload Nft</label>
//                                                                                 <div>
//                                                                                     <Form.Item
//                                                                                         {...restField}
//                                                                                         name={[name, "nft_image"]}
//                                                                                         // getValueFromEvent={getFile}
//                                                                                         rules={[
//                                                                                             {
//                                                                                                 required: true,
//                                                                                                 message: 'Please select a image',
//                                                                                             },
//                                                                                         ]}

//                                                                                     >

//                                                                                         <Upload
//                                                                                             {...fileProps}
//                                                                                             action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                                                                                             listType="picture-card"
//                                                                                             // fileList={fileList}
//                                                                                             // onChange={onChange}
//                                                                                             onPreview={handlePreview}
//                                                                                             maxCount={1}

//                                                                                         >
//                                                                                             + Upload
//                                                                                         </Upload>


//                                                                                     </Form.Item>
//                                                                                     <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//                                                                                         <img
//                                                                                             alt="example"
//                                                                                             style={{
//                                                                                                 width: '100%',
//                                                                                             }}
//                                                                                             src={previewImage} />
//                                                                                     </Modal>
//                                                                                 </div>
//                                                                             </div>

//                                                                         </div>
//                                                                     </Fragment>

//                                                                 ))}



//                                                             </></>
//                                                     )}

//                                                 </Form.List>
//                                                 <Form.Item>
//                                                     <div className="col-12">
//                                                         <button className="btn w-100 mt-3 mt-sm-4 mb-3" type="submit">Add</button>
//                                                     </div>

//                                                 </Form.Item>
//                                             </Form>
//                                         </div>

//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
// export default AddNft;

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
import JoditEditor from 'jodit-react'
import Loader from '../Loader/loader';
import { useParams } from 'react-router';

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

    const [modalShow, setModalShow] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState({ 0: "0" });
    // console.log('colldata', coldata)
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
    const { id } = useParams()
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

        setLoading(true)
        const nftImagepromises = values?.nfts?.map(x => uploadNFT(x?.nft_image?.file))

        const imagesRes = await Promise.all(nftImagepromises).then(res => res)
        // 

        const addedImage = imagesRes?.map(x => ipfsBaseUrl + x?.data?.data?.image_hash)
        // 

        const formData = new FormData()





        formData.append('image', addedImage)
        formData.append('title', values?.nfts?.map(x =>
            x.nft_name
        ))
        // const newlist = newList.push(nft_collection_id);
        formData.append('collection_id', coll_id)
        // formData.append('nft_description', nft_description)
        formData.append('description', values?.nfts?.map(x => x.nft_description))
        // formData.append('nft_collection_id', values?.nfts?.map(x => x.nft_collection_id))

        // dispatch(uploadNFT())
        dispatch(AddNftAction(formData, id, setLoading))
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

                                        <div >
                                            <Form form={form} name="dynamic_form_nest_item" initialValues={{
                                                nfts: nfts
                                            }}
                                                // onSubmit={(event) => handleSubmit(event)}
                                                onFinish={(event) => onFinish(event)}
                                                autoComplete="off" className="item-form card no-hover">
                                                <Form.List name="nfts">

                                                    {(fields, { add, remove }) => (
                                                        <>
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

                                                                    <Fragment>
                                                                        {/* <div>Artwork {index}</div> */}
                                                                        <div className="row">

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
                                                                                                message: 'Missing  name',
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
                                                                                            value={'nft_description'}
                                                                                            // config={config}

                                                                                            placeholder="start typing"
                                                                                            tabIndex={1} // tabIndex of textarea
                                                                                            // onBlur={newContent => 'nft_description'(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                                            onChange={newContent => { }}
                                                                                        />
                                                                                        {/* }} */}
                                                                                        {/* /> */}
                                                                                    </Form.Item>
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
                                                                            {/* <div className="col-md-1 col-12">
                                                                                <MinusCircleOutlined onClick={(e) => { remove(name); handleDecrement(e); }} />
                                                                            </div> */}
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

                                                                                <div key={`auc_${idx}`} id={item.id} className="col-md-6 col-lg-3 col-12 choose_div">
                                                                                    {/* <Form.Item
                                                                            {...restField}
                                                                            name={[name, "nft_collection_id"]}
                                                                            // getValueFromEvent={getFile}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Please select nft collection',
                                                                                },
                                                                            ]}

                                                                        > */}


                                                                                    <div id={item.id} onClick={() => onHandleClick(index, item.id)} className="card"
                                                                                        style={{
                                                                                            background: "black",
                                                                                            marginBottom: "8px",
                                                                                            border: nft_collection_id[index] == item.id ? "1px solid #fff" : null
                                                                                        }}>
                                                                                        <div className="card-body">
                                                                                            <div>


                                                                                                {item.title}
                                                                                            </div>


                                                                                        </div>
                                                                                    </div>
                                                                                    {/* </Form.Item> */}

                                                                                </div>
                                                                                // </div>
                                                                            ))}
                                                                            <div className="col-md-12 col-12">
                                                                                <label>Upload Nft</label>
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
                                                                            </div>

                                                                        </div>
                                                                    </Fragment>

                                                                ))}



                                                            </></>
                                                    )}

                                                </Form.List>
                                                <Form.Item>
                                                    <div className="col-12">
                                                        <button className="btn w-100 mt-3 mt-sm-4 mb-3" type="submit">Add</button>
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
    );
};
export default AddNft;
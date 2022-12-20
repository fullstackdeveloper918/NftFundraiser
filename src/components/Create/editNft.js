
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'react-bootstrap/Modal';
import React, { Fragment, useEffect, useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { create } from 'ipfs-http-client'
import { useDispatch, useSelector } from 'react-redux';
import { CreateProjectAction, GetCollectionsAction, NftList, UpdateNft, uploadNFT } from '../../redux/Actions/projectAction';
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
import UploadImage from '../../shared/Upload';
import { dataURLtoBlob } from '../../utils/blobfromurl';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
// import ImgCrop from 'antd-img-crop';

const EditNft = (props) => {

    const editor = useRef(null);
    const [fileList, setFileList] = useState([])
    // const { data, setFormValues } = useFormData();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // console.log(data, 'formdta')
    const [count, setCount] = useState(0);
    // const [nft_description, setNft_description] = useState([])
    // console.log('nft_description', nft_description)

    const [modalShow, setModalShow] = React.useState(false);
    const [modalShoww, setModalShoww] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState({ 0: "0" });
    console.log(nft_collection_id, "sdfasf")
    const [items, setItems] = useState([]);
    const [coldata, setColData] = useState();
    const [allcol, setAllColl] = useState()
    const [form] = Form.useForm()

    const [image, setImage] = useState('')

    const [loading, setLoading] = useState(false)
    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };


    const defaultValues = {
        setNft_description: '',
    }

    const id = useParams()
    const ipfsBaseUrl = 'https://ipfs.io/ipfs/'

    const dispatch = useDispatch()
    const col = useSelector(state => {
        // 
        return state?.projectdetails?.getcollections
    })


    const nftdetail = useSelector(state => {
        // 
        return state.projectdetails.nftlist

    })

    useEffect(() => {
        dispatch(NftList(props.nft_id, props.id))
    }, [props.nft_id, props.id])

    console.log("nftdet", nftdetail)


    useEffect(() => {
        form.setFieldsValue({
            nfts: [{
                nft_name: nftdetail.title,
                nft_description: nftdetail.description,
                nft_collection_id: nftdetail.collection_id,
                nft_image: nftdetail.image,
            }]

        })
        console.log(nftdetail.image, "Image")
        setImage(nftdetail.image)
        setNft_collection_id(nftdetail.collection_id)

    }, [form, nftdetail])

    useEffect(() => {

        dispatch(GetCollectionsAction())

    }, []);


    const onFinish = async (values) => {


        // setLoading(true)
        const nftImagepromises = [uploadNFT(dataURLtoBlob(image))]
        // const nftImagepromises = nfts?.map(x => uploadNFT(x?.image))
        const imagesRes = await Promise.all(nftImagepromises).then(res => res)
        // const imagesRes = await (nftImagepromises).then(res => res)
        // 

        const addedImage = imagesRes?.map(x => ipfsBaseUrl + x?.data?.data?.image_hash)
        // const addedImage = ipfsBaseUrl + image


        const formData = new FormData()





        formData.append('image', addedImage)
        formData.append('title', values?.nfts?.map(x =>
            x.nft_name
        ))
        // const newlist = newList.push(nft_collection_id);
        formData.append('collection_id', nft_collection_id)
        // formData.append('nft_description', nft_description)
        formData.append('description', values?.nfts?.map(x => x.nft_description))
        // formData.append('nft_collection_id', values?.nfts?.map(x => x.nft_collection_id))

        // dispatch(uploadNFT())
        dispatch(UpdateNft(formData, props))
        // setLoading(false)

        // console.log('Received values of form:', values, data)

    };
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
            } else {
            }
        }
    };



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
        <div>
            {loading ? (
                <Loader />
            ) : (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                // centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update NFT
                        </Modal.Title>
                        <div>
                            <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form form={form} name="dynamic_form_nest_item" initialValues={{
                                nfts: nfts, defaultValues
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
                                                    <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={expandIconPosition}>
                                                        <Panel header="Details" key="1">
                                                            <Fragment>
                                                                {/* <div>Artwork {index}</div> */}
                                                                <div className="row">

                                                                    <div className="col-md-10 col-12">
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

                                                                    <div className="col-md-1 col-12">
                                                                        <MinusCircleOutlined onClick={(e) => { remove(name); handleDecrement(e); }} />
                                                                    </div>
                                                                    {/* </div> */}
                                                                    <div className="col-md-3 col-12">

                                                                        {/* <div className="col-24"> */}

                                                                        <div className="form-group">
                                                                            <label className='mt-2'>Choose Collection</label>
                                                                            <div className="card choose_div" style={{
                                                                                background: "black",
                                                                                marginBottom: "8px",
                                                                            }}>
                                                                                <div className="card-body ">
                                                                                    <Button variant="primary" onClick={() => setModalShow(true)}>
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

                                                                        <div key={`auc_${idx}`} id={item.id} className="col-md-3 col-12 choose_div">
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
                                                                            <label className='hidden-word'>jsaswjdwjd</label>

                                                                            <div id={item.id} onClick={() => setNft_collection_id(item.id)} className="card"
                                                                                style={{
                                                                                    background: "black",
                                                                                    marginBottom: "8px",
                                                                                    border: nft_collection_id == item.id ? "1px solid #fff" : null
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

                                                                                {/* <Upload
                                                                                    {...fileProps}
                                                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                                    listType="picture-card"
                                                                                    // fileList={fileList}
                                                                                    // onChange={onChange}
                                                                                    src={'/img/nft.png'}
                                                                                    onPreview={handlePreview}
                                                                                    maxCount={1}

                                                                                >
                                                                                    + Upload
                                                                                </Upload> */}
                                                                                <UploadImage
                                                                                    imageSrc={image}
                                                                                    // src={image}
                                                                                    initalImag={image}
                                                                                    setImageSrc={setImage}
                                                                                />
                                                                            </Form.Item>
                                                                            {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                                                <img
                                                                                    alt="example"
                                                                                    style={{
                                                                                        width: '100%',
                                                                                    }}
                                                                                    src={previewImage} />
                                                                            </Modal> */}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </Fragment>
                                                        </Panel>
                                                    </Collapse>
                                                ))}


                                            </></>
                                    )}

                                </Form.List>
                                <Form.Item>
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4 mb-3" type="submit">Update </button>
                                    </div>

                                </Form.Item>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>

            )
            }
        </div >
    );
};
export default EditNft;
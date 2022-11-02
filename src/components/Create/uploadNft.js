import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProjectAction, GetCollectionsAction } from '../../redux/Actions/projectAction';
import { useFormData } from './Context/context'
import MyVerticallyCenteredModal from './createCollection';
import styles from './styles/styles.module.scss'
import 'antd/lib/form/style/css';
import 'antd/lib/upload/style/css';
import 'antd/lib/modal/style/css';
import swal from 'sweetalert';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
// import ImgCrop from 'antd-img-crop';

const UploadNft = ({ formStep, nextFormStep }) => {

    const [formValues, setFormvalues] = useState()

    const [fileList, setFileList] = useState([])
    const { data, setFormValues } = useFormData();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    console.log(data, 'formdta')
    const [count, setCount] = useState(0);
    const [modalShow, setModalShow] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState(0);
    const [items, setItems] = useState([]);
    console.log(nft_collection_id)


    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };
    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };
    console.log(count, 'count')

    function onHandleClick(event) {
        setNft_collection_id(event.currentTarget.id);
    };


    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'all'
    });

    const dispatch = useDispatch()

    const OnSubmit = (values) => {
        // debugger
        setFormValues(values)
        // dispatch(CreateProjectAction())

        // const formData = new FormData()

        // formData.append('image', values.image[0])
        // formData.append('title', data.title)
        // formData.append('name', values.name)
        // formData.append('description', data.description)
        // formData.append('description', values.description)
        // formData.append('country', data.country)
        // formData.append('state', data.state)
        // formData.append('city', data.city)
        // formData.append('address', data.address)
        // formData.append('price', data.price)
        // formData.append('number_of_nft', data.number_of_nft)
        // formData.append('start_date', data.start_date)
        // formData.append('end_date', data.end_date)
        // formData.append('type', data.type)
        // formData.append('collection_id', collection_id)
        // formData.append('category_id', data.category_id)

        // dispatch(CreateProjectAction(formData))
        // if (formData) {
        //     swal("Registered!", "You have been registered!", "success");
        //     history.push('/login')
        // }
    }
    const col = useSelector(state => {
        // debugger
        return state?.projectdetails?.getcollections
    })
    console.log(col, 'col')

    useEffect(() => {
        dispatch(GetCollectionsAction())
    }, [])
    // const nft_data = [
    //     {
    //         "nft_name": "test 1",
    //         "nft_description": "asdasdasd",
    //         "nft_collection_id": 5,
    //         "nft_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
    //     }

    // ]
    const onFinish = (values) => {
        debugger
        const formData = new FormData()


        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('address', data.address)
        formData.append('state', data.state)
        formData.append('country', data.country)
        formData.append('city', data.city)
        formData.append('price', data.price)
        formData.append('number_of_nft', data.number_of_nft)
        formData.append('start_date', data.start_date)
        formData.append('end_date', data.end_date)
        formData.append('type', data.type)
        formData.append('category_id', data.category_id)


        formData.append('nft_image', values?.nfts?.map(x => {
            debugger
            return x.nft_image.fileList[0]
        }
        ))
        formData.append('nft_name', values?.nfts?.map(x =>
            x.nft_name
        ))
        // const newlist = newList.push(nft_collection_id);
        formData.append('nft_collection_id', [nft_collection_id, ...nft_collection_id])
        formData.append('nft_description', values?.nfts?.map(x =>
            x.nft_description
        ))

        // formData.append('nft_name', "hjasd")
        // formData.append('nft_collection_id', nft_collection_id)
        // formData.append('nft_description', "as,jdkadb")
        // formData.append('nft_image', "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png")
        // const nft = values?.nfts?.map(x => {
        //     // debugger
        //     return {
        //         "nft_name": x.nft_name,
        //         "nft_collection_id": nft_collection_id,
        //         "nft_description": x.nft_description,
        //         "nft_image": x.nft_image.file,
        //         // "nft_image": 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
        //     }
        // })
        // nft.forEach(item => {
        //     // debugger


        // formData.append('nft_data', JSON.stringify(nft));
        // })
        // console.log('nftdata', formData.getAll('nft'))

        // formData.append('nft_data', JSON.stringify('nft_data', values?.nfts?.map(x => {
        //     return [{
        //         "nft_name": x?.nft_name,
        //         "nft_collection_id": nft_collection_id,
        //         "nft_description": x?.nft_description,
        //         "nft_image": x?.nft_image,
        //     }]
        // })));
        // formData.append('nft_data', values?.nfts?.map(x => {
        //     return [{
        //         "nft_name": x?.nft_name,
        //         "nft_collection_id": nft_collection_id,
        //         "nft_description": x?.nft_description,
        //         "nft_image": x?.nft_image,
        //     }]
        // }))

        // const mydata = {
        //     ...data,
        //     nfts: values?.nfts?.map(x => {
        //         return {
        //             'nft_name': x.nft_name,
        //             nft_collection_id,
        //             'nft_description': x.nft_description,
        //             'nft_image': x.nft_image,
        //         }
        //     })
        // }
        dispatch(CreateProjectAction(formData))
        // dispatch(CreateProjectAction({
        //     data,
        //     nfts: values.nfts.map(x => {
        //         return {
        //             nft_name: x.nft_name,
        //             nft_collection_id,
        //             nft_description: x.nft_description,
        //             nft_image: x.nft_image,
        //         }
        //     })
        // }))
        // dispatch(CreateProjectAction({
        //     ...data,
        //     nfts: values.nfts.map(x => {
        //         return {
        //             nft_name: x.nft_name,
        //             nft_collection_id,
        //             nft_description: x.nft_description,
        //             nft_image: x.nft_image,
        //         }
        //     })
        // }))
        console.log('Received values of form:', values, data)
        // swal("Success", "Created", 'success')
        // localStorage.setItem("values", JSON.stringify({
        //     ...data,
        //     nfts: values.nfts.map(x => {
        //         return {
        //             name: x.name,
        //             collection_id,
        //             description: x.description,
        //             image: x.image,
        //         }
        //     })
        // }));
        // localStorage.setItem("values", JSON.stringify(data));
        // return values, data
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
    //     // debugger
    //     console.log('Upload event:', e);

    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };
    const [form] = Form.useForm()
    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-center">


                    <div className="col-14 col-md-9">
                        {/* Intro */}
                        <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <span>Get Started</span>
                                <h3 className="mt-3 mb-0">Create NFT</h3>
                                <p> types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
                                <label>Project image</label>
                            </div>
                        </div>
                        <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
                            <Form form={form} name="dynamic_form_nest_item" initialValues={{
                                remember: true
                            }}
                                onFinish={onFinish}
                                onSubmit={OnSubmit} autoComplete="off" className="item-form card no-hover">
                                <Form.List name="nfts">
                                    {(fields, { add, remove }) => (
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
                                                        <div className="col-6">
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
                                                            <div>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, "nft_description"]}

                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Missing Description',
                                                                        },
                                                                    ]}
                                                                >
                                                                    {/* <label>Description</label> */}
                                                                    <TextArea placeholder="Description" minLength={'5px'} />

                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="col-5">
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
                                                                        src={previewImage}
                                                                    />
                                                                </Modal>
                                                            </div>
                                                        </div>
                                                        <div className="col-1">
                                                            <MinusCircleOutlined onClick={(e) => { remove(name); handleDecrement(e) }} />
                                                        </div>
                                                        {/* </div> */}
                                                        <div className="col-3">

                                                            {/* <div className="col-24"> */}
                                                            <div className="form-group">
                                                                <label>Choose collection</label>
                                                                <div className="card choose_div" style={{
                                                                    background: "black",
                                                                    marginBottom: "8px",

                                                                }} >
                                                                    <div className="card-body ">
                                                                        <Button variant="primary" onClick={() => setModalShow(true)}>
                                                                            <i className="fa-regular fa-plus"></i> create
                                                                        </Button>

                                                                        <MyVerticallyCenteredModal
                                                                            show={modalShow}
                                                                            onHide={() => setModalShow(false)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {col?.map((item, idx) => (
                                                            <div key={`auc_${idx}`} id={item.id} className="col-3 choose_div" >
                                                                <label className='hidden-word'>jsaswjdwjd</label>
                                                                <div id={item.id} onClick={onHandleClick} className="card"
                                                                    style={{
                                                                        background: "black",
                                                                        marginBottom: "8px",
                                                                        border: nft_collection_id == item.id ? "1px solid #fff" : null
                                                                    }} >
                                                                    <div className="card-body">
                                                                        <div  >


                                                                            {item.title}
                                                                        </div>


                                                                    </div>
                                                                </div>

                                                            </div>
                                                            // </div>
                                                        ))}


                                                    </div>
                                                </Fragment>    // </Space>
                                            ))}


                                            {(!(data?.number_of_nft == count)) ?
                                                <Form.Item>
                                                    <Button type="dashed" onClick={(e) => { add(e); handleIncrement(e) }} block icon={<PlusOutlined />} disabled={data?.number_of_nft == count}>
                                                        Add NFT
                                                    </Button>
                                                </Form.Item>
                                                : null}
                                        </>
                                    )}

                                </Form.List>
                                <Form.Item>
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create</button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};
export default UploadNft;
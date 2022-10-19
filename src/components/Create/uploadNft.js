import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { CreateProjectAction } from '../../redux/Actions/projectAction';
import { useFormData } from './Context/context'
import styles from './styles/styles.module.scss'
// import 'antd/dist/antd.css';

const UploadNft = ({ formStep, nextFormStep }) => {
    const { data, setFormValues } = useFormData();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'all'
    });
    const dispatch = useDispatch()
    const OnSubmit = (values) => {
        setFormValues(values)

        const formData = new FormData()

        formData.append('image', data.image[0])
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('country', data.country)
        formData.append('state', data.state)
        formData.append('city', data.city)
        formData.append('address', data.address)
        formData.append('price', data.price)
        formData.append('number_of_nft', data.number_of_nft)
        formData.append('start_date', data.start_date)
        formData.append('end_date', data.end_date)
        formData.append('type', data.type)
        formData.append('collection_id', data.collection_id)
        formData.append('category_id', data.category_id)

        dispatch(CreateProjectAction(formData))
        // if (formData) {
        //     swal("Registered!", "You have been registered!", "success");
        //     history.push('/login')
        // }
    }
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };
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
                            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" OnSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                                <Form.List name="users">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: 'flex',
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <div className="row">

                                                        <div className="col-6">


                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'name']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Missing  name',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder="Name" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-5">
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'Description']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Missing Description',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder="Description" />

                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-6">
                                                            <Form.Item>
                                                                <div className="input-group form-group">
                                                                    <div>
                                                                        <label htmlFor="upload-button">

                                                                            <img src={
                                                                                watch('image') && watch('image').length
                                                                                    ? URL.createObjectURL(watch('image')[0])
                                                                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                                                            }
                                                                                alt="photo preview" width="200" height="200" />
                                                                        </label>
                                                                        <input
                                                                            type="file"
                                                                            id="upload-button"
                                                                            {...register("image", { required: true })}
                                                                            style={{ display: "none" }}
                                                                            aria-invalid={errors.image ? "true" : "false"}
                                                                        />
                                                                        {errors.image?.type === 'required' && <p style={{ color: 'red' }} role="alert">File is required</p>}
                                                                    </div>

                                                                </div>
                                                            </Form.Item>
                                                        </div>

                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </div>
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add field
                                                </Button>
                                            </Form.Item>
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
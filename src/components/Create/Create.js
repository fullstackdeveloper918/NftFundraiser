import { DropzoneAreaBase, DropzoneDialogBase } from 'material-ui-dropzone';
import React, { Component, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
// import state from 'sweetalert/typings/modules/state';
import { CategoriesAction, CreateCollectionAction, CreateProjectAction, GetCollectionsAction } from '../../redux/Actions/projectAction';
import GeoLocation from './geoLocation';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from "./styles/styles.module.scss"
import MyVerticallyCenteredModal from './createCollection';
import { useFormData } from './Context/context';
import { Label } from '@material-ui/icons';


const Create = ({ formStep, nextFormStep }) => {
    const { setFormValues } = useFormData();

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [collection_id, setCollectionId] = useState(0);
    const [type, setType] = useState(1);
    console.log(type)
    // console.log(collection_id)


    function onHandleClick(event) {
        setCollectionId(event.currentTarget.id);
    };


    const dispatch = useDispatch()
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);



    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({
        mode: "all",

    });


    const col = useSelector(state => {
        // debugger
        return state?.projectdetails?.getcollections
    })
    console.log(col, 'col')
    useEffect(() => {
        dispatch(GetCollectionsAction())
    }, [])

    const cat = useSelector(state => {
        // debugger
        return state?.projectdetails?.categories
    })
    console.log(cat, 'cat')
    useEffect(() => {
        dispatch(CategoriesAction())
    }, [])


    const OnSubmit = (data) => {
        setFormValues({ ...data, country, state, city, type });
        nextFormStep();
        // debugger
        // const formData = new FormData()
        // formData.append('image', data.image[0])
        // formData.append('title', data.title)
        // formData.append('description', data.description)
        // formData.append('country', country)
        // formData.append('state', state)
        // formData.append('city', city)
        // formData.append('address', data.address)
        // formData.append('price', data.price)
        // formData.append('number_of_nft', data.number_of_nft)
        // formData.append('start_date', data.start_date)
        // formData.append('end_date', data.end_date)
        // formData.append('type', type)
        // formData.append('collection_id', collection_id)
        // formData.append('category_id', data.category_id)

        // dispatch(CreateProjectAction(formData))

    }


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
                            </div>
                        </div>
                        {/* Item Form */}
                        <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
                            <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="radiobutton" id="donation" value="1" onChange={(e) => setType(e.target.value)} defaultChecked />
                                                <label className="form-check-label" htmlFor="donation">Campaign</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="radiobutton" id="product_sale" value="2" onChange={(e) => setType(e.target.value)} />
                                                <label className="form-check-label" htmlFor="product_sale">Project</label>
                                            </div>

                                        </div>
                                    </div>
                                    {/* <div className="col-12">
                                    <div className="input-group form-group">
                                        <div>
                                            <p> types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
                                            <label>Project image</label>
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
                                </div> */}



                                    <div className="col-6">
                                        {/* {type == 1 && ( */}

                                        <div className="form-group mt-3">
                                            <label>Project name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                placeholder="Project name"
                                                {...register("title", { required: true })}
                                                aria-invalid={errors.title ? "true" : "false"}
                                            />
                                            {errors.title?.type === 'required' && <p style={{ color: 'red' }} role="alert">Title is required</p>}

                                        </div>
                                        {/* )} */}
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                placeholder="Address"
                                                {...register("address", { required: true })}
                                                aria-invalid={errors.address ? "true" : "false"}
                                            />
                                            {errors.address?.type === 'required' && <p style={{ color: 'red' }} role="alert">Address is required</p>}

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label>Description</label>
                                        <div className="form-group">
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="textarea"
                                                placeholder="Description"
                                                cols={30} rows={3}
                                                {...register("description", { required: true })}
                                                aria-invalid={errors.description ? "true" : "false"}
                                            />
                                            {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                                        </div>
                                    </div>

                                    {/* <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label>Choose collection</label>
                                        <div className="card" >
                                            <div className="card-body">
                                                <Button variant="primary" onClick={() => setModalShow(true)}>
                                                    create
                                                </Button>

                                                <MyVerticallyCenteredModal
                                                    show={modalShow}
                                                    onHide={() => setModalShow(false)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">

                                    {col?.map((item, idx) => (
                                        <div key={`auc_${idx}`} id={item.id} >
                                            <div id={item.id} onClick={onHandleClick} className="card"
                                                style={{
                                                    background: "black",
                                                    marginBottom: "8px",
                                                    border: collection_id == item.id ? "1px solid" : null
                                                }} >
                                                <div className="card-body">
                                                    <div  >

                                                        {item.title}
                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div> */}
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <Controller
                                                control={control}
                                                name="country"
                                                render={({ field: { onChange, onBlur, value, ref } }) => (

                                                    // onChange={onChange}

                                                    <GeoLocation
                                                        locationTitle="Country"
                                                        isCountry
                                                        onBlur={onBlur}
                                                        selected={value}
                                                        onChange={setCountry}
                                                        required={true}
                                                    />
                                                )}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>State</label>
                                            <Controller
                                                control={control}
                                                name="state"
                                                render={({ field: { onChange, onBlur, value, ref } }) => (

                                                    <GeoLocation
                                                        // type="text"
                                                        // className="form-control"
                                                        locationTitle="State"
                                                        onChange={setState}
                                                        geoId={country}
                                                        onBlur={onBlur}
                                                        selected={value}
                                                    // onChange={onChange}

                                                    // {...register("state", { required: true })}
                                                    // aria-invalid={errors.state ? "true" : "false"}
                                                    />
                                                )}
                                            />
                                            {/* {errors.state?.type === 'required' && <p style={{ color: 'red' }} role="alert">state is required</p>} */}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>City</label>
                                            <Controller
                                                control={control}
                                                name="city"
                                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                                    <GeoLocation
                                                        locationTitle="City"
                                                        onChange={setCity}
                                                        geoId={state}
                                                        onBlur={onBlur}
                                                        selected={value}
                                                    // onChange={onChange}


                                                    // {...register("city", { required: true })}
                                                    // aria-invalid={errors.city ? "true" : "false"}
                                                    />
                                                )}
                                            />
                                            {/* {errors.city?.type === 'required' && <p style={{ color: 'red' }} role="alert">city is required</p>} */}
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            {type == 2 ? (

                                                <label>Price</label>
                                            ) : (

                                                <label>Price per NFT</label>
                                            )}
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="price"
                                                placeholder="Price"
                                                {...register("price", { required: true })}
                                                aria-invalid={errors.price ? "true" : "false"}
                                            />
                                            {errors.price?.type === 'required' && <p style={{ color: 'red' }} role="alert">Price is required</p>}
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Number of NFT's</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="number_of_nft"
                                                defaultValue={1}
                                                disabled={type == 2}
                                                placeholder="Select your number of NFT's (1-10)"
                                                min={1}
                                                max={10}
                                                {...register("number_of_nft", { required: true })}
                                                aria-invalid={errors.number_of_nft ? "true" : "false"}
                                            />
                                            {/* {errors.number_of_nft?.message && <p>{errors.number_of_nft.message}</p>} */}
                                            {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of NFT is required</p>}
                                        </div>
                                    </div>
                                    {type == 1 && (

                                        <><div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Start date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="start_date"
                                                    placeholder=" Start date"
                                                    {...register("start_date", { required: true })}
                                                    aria-invalid={errors.start_date ? "true" : "false"} />
                                                {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>}
                                            </div>
                                        </div><div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>End date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="end_date"
                                                        placeholder=" End date"
                                                        {...register("end_date", { required: true })}
                                                        aria-invalid={errors.end_date ? "true" : "false"} />
                                                    {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                                </div>
                                            </div></>
                                    )}
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select name="annual_revenue_range"
                                                {...register("category_id")}>
                                                {cat?.map((option, key) => (

                                                    <option key={key.id} value={option.id} >
                                                        {option.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Next</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </section >
    );

}

export default Create;
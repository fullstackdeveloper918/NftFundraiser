import { DropzoneAreaBase, DropzoneDialogBase } from 'material-ui-dropzone';
import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
// import state from 'sweetalert/typings/modules/state';
import { CreateProjectAction } from '../../redux/Actions/projectAction';
import GeoLocation from './geoLocation';

const Create = () => {

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const dispatch = useDispatch()
    const history = useHistory()

    const message = useSelector(state => {
        return state.projectdetails.message
    })

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({});


    const proj = useSelector(state => {
        return state.createproject
    })


    const OnSubmit = (data) => {
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

        dispatch(CreateProjectAction(formData))

    }

    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-center">
                    {/* <div className="col-12 col-md-4">
                        <AuthorProfile />
                    </div> */}
                    <div className="col-14 col-md-9">
                        {/* Intro */}
                        <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <span>Get Started</span>
                                <h3 className="mt-3 mb-0">Create NFT</h3>
                            </div>
                        </div>
                        {/* Item Form */}
                        <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group form-group">
                                        <div>
                                            <h6 className="text-center">Image, Video, Audio, or 3D ModelFile</h6>
                                            <p> types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
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
                                </div>


                                {/* 
                                <div className="col-6">
                                    <div className="form-group mt-3">
                                        <input
                                            type="radio"

                                        />
                                        <div className="col-12">
                                            <input
                                                type="radio"

                                            />
                                        </div>

                                    </div>
                                </div> */}
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            placeholder="Item name"
                                            {...register("title", { required: true })}
                                            aria-invalid={errors.title ? "true" : "false"}
                                        />
                                        {errors.title?.type === 'required' && <p style={{ color: 'red' }} role="alert">Title is required</p>}

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
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
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <GeoLocation
                                            locationTitle="Country"
                                            isCountry
                                            onChange={setCountry}
                                        // {...register("country", { required: true })}
                                        // aria-invalid={errors.country ? "true" : "false"}
                                        />
                                        {/* {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">country is required</p>} */}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <GeoLocation
                                            // type="text"
                                            // className="form-control"
                                            locationTitle="State"
                                            onChange={setState}
                                            geoId={country}

                                        // {...register("state", { required: true })}
                                        // aria-invalid={errors.state ? "true" : "false"}
                                        />
                                        {/* {errors.state?.type === 'required' && <p style={{ color: 'red' }} role="alert">state is required</p>} */}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <GeoLocation
                                            locationTitle="City"
                                            onChange={setCity}
                                            geoId={state}

                                        // {...register("city", { required: true })}
                                        // aria-invalid={errors.city ? "true" : "false"}
                                        />
                                        {/* {errors.city?.type === 'required' && <p style={{ color: 'red' }} role="alert">city is required</p>} */}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
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
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="number_of_nft"
                                            placeholder="Number of NFT"
                                            {...register("number_of_nft", { required: true })}
                                            aria-invalid={errors.number_of_nft ? "true" : "false"}
                                        />
                                        {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of nft is required</p>}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="start_date"
                                            placeholder=" Start date"
                                            {...register("start_date", { required: true })}
                                            aria-invalid={errors.start_date ? "true" : "false"}
                                        />
                                        {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="end_date"
                                            placeholder=" End date"
                                            {...register("end_date", { required: true })}
                                            aria-invalid={errors.end_date ? "true" : "false"}
                                        />
                                        {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="donation" id="donation" value="1"  {...register("type")} />
                                            <label className="form-check-label" htmlFor="donation">Campaign</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="product_sale" id="product_sale" value='2' {...register("type")} />
                                            <label className="form-check-label" htmlFor="product_sale">Project</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Item</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </section >
    );

}

export default Create;
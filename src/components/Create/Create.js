import React, { Component } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
// import state from 'sweetalert/typings/modules/state';
import { CreateProjectAction } from '../../redux/Actions/projectAction';
import AuthorProfile from "../AuthorProfile/AuthorProfile";

const Create = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const message = useSelector(state => {
        // debugger
        return state.projectdetails.message
    })

    const { register, handleSubmit, formState: { errors } } = useForm();

    const proj = useSelector(state => {
        return state.createproject
    })

    const OnSubmit = (data) => {
        // 
        const formData = new FormData()

        formData.append('image', data.image[0])
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('latitude', data.latitude)
        formData.append('logitude', data.logitude)
        formData.append('address', data.address)
        formData.append('price', data.price)
        formData.append('number_of_nft', data.number_of_nft)
        formData.append('start_date', data.start_date)
        formData.append('end_date', data.end_date)
        formData.append('type', data.type)

        dispatch(CreateProjectAction(formData))
        if (proj?.project?.data?.statusCode === 200) {
            swal("Created!", "Project created successfully!", "success");
            history.push('/projectlist')
        } else {
            {
                message.length > 0 &&
                swal("error!", message,)
            }
        }
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
                                            placeholder="Wallet Address"
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="latitude"
                                            placeholder="Latitude"
                                            {...register("latitude", { required: true })}
                                            aria-invalid={errors.latitude ? "true" : "false"}
                                        />
                                        {errors.latitude?.type === 'required' && <p style={{ color: 'red' }} role="alert">latitude is required</p>}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="logitude"
                                            placeholder="Logitude"
                                            {...register("logitude", { required: true })}
                                            aria-invalid={errors.logitude ? "true" : "false"}
                                        />
                                        {errors.logitude?.type === 'required' && <p style={{ color: 'red' }} role="alert">logitude is required</p>}
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
                                            placeholder="Enter your start date of Fundraiser"
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
                                            placeholder="Enter your end date Fundraiser"
                                            {...register("end_date", { required: true })}
                                            aria-invalid={errors.end_date ? "true" : "false"}
                                        />
                                        {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-group form-group">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="inputGroupFile01"
                                                placeholder='Choose fi;e'
                                                {...register("image", { required: true })}
                                                aria-invalid={errors.image ? "true" : "false"}
                                            />
                                            {errors.image?.type === 'required' && <p style={{ color: 'red' }} role="alert">File is required</p>}
                                            {/* <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="donation" id="donation" value="1"  {...register("type")} />
                                            <label className="form-check-label" htmlFor="donation">Donation</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="product_sale" id="product_sale" value='2' {...register("type")} />
                                            <label className="form-check-label" htmlFor="product_sale">Product sale</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Item</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default Create;
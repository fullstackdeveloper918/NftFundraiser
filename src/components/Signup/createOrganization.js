import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { CreateOrganizationAction } from '../../redux/Actions/authAction'
import { useForm } from 'react-hook-form'

const CreateOrganization = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.user)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const OnSubmit = (data) => {
        dispatch(CreateOrganizationAction(data))

    }

    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center">
                            <span></span>
                            <h3 className="mt-3 mb-0"></h3>
                            <p></p>
                        </div>
                        {/* Item Form */}

                        <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="image"
                                            placeholder="Select file"
                                            {...register("image")}


                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="organization_name"
                                            placeholder="Enter your Organization Name"
                                            {...register("organization_name", { required: true })}
                                            // {...register("email")}
                                            aria-invalid={errors.organization_name ? "true" : "false"}
                                        />
                                        {errors.organization_name?.type === 'required' && <p role="alert">Organization name is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="url"
                                            placeholder="Enter your Url"
                                            {...register("url", { required: true })}
                                            // {...register("email")}
                                            aria-invalid={errors.url ? "true" : "false"}
                                        />
                                        {errors.url?.type === 'required' && <p role="alert">Url is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="select"
                                            className="form-control"
                                            name="country"
                                            placeholder="Enter your Country"
                                            {...register("country", { required: true })}
                                            // {...register("email")}
                                            aria-invalid={errors.country ? "true" : "false"}
                                        />
                                        {errors.copuntry?.type === 'required' && <p role="alert">Country is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="annual_revenue_range"
                                            placeholder="Enter your range"
                                            {...register("annual_revenue_range", { required: true })}
                                            // {...register("email")}
                                            aria-invalid={errors.annual_revenue_range ? "true" : "false"}
                                        />
                                        {errors.annual_revenue_range?.type === 'required' && <p role="alert">Range name is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="tax_id"
                                            placeholder="Enter your Id"
                                            {...register("tax_id", { required: true })}
                                            // {...register("email")}
                                            aria-invalid={errors.tax_id ? "true" : "false"}
                                        />
                                        {errors.tax_id?.type === 'required' && <p role="alert">Id is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="hear_about"
                                            placeholder="Enter your hear about"
                                            {...register("hear_about", { required: true })}
                                            // {...register("email")}
                                            aria-invalid={errors.hear_about ? "true" : "false"}
                                        />
                                        {errors.hear_about?.type === 'required' && <p role="alert">Hear about is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="method_hear_details"
                                            placeholder="Enter your details"
                                            {...register("method_hear_details", { required: true })}
                                            // {...register("email")}
                                            aria-invalid={errors.method_hear_details ? "true" : "false"}
                                        />
                                        {errors.method_hear_details?.type === 'required' && <p role="alert">Hear details is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Remember Me</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Signup</button>
                                </div>
                                <div className="col-12">
                                    <hr />
                                    <div className="other-option">
                                        <span className="d-block text-center mb-4">Or</span>
                                        {/* Social Icons */}

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CreateOrganization
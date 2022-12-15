import React, { Component, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ContactAction } from '../../redux/Actions/contactAction';
import Loader from '../Loader/loader';


const Contact = () => {
    const [loading, setLoading] = useState()
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(ContactAction())
    // })
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const OnSubmit = (data) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('subject', data.subject)
        formData.append('email', data.email)
        formData.append('description', data.description)
        dispatch(ContactAction(formData, setLoading))
    }

    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center">
                            <span>Contact</span>
                            <h3 className="mt-3 mb-0">Get In Touch</h3>
                            <p>Mint NFTs that are based on real-life projects or events related to important causes.</p>
                        </div>
                        {/* Item Form */}
                        <form id="contact-form" className="item-form card no-hover" onSubmit={handleSubmit(OnSubmit)} >
                            {loading ? (
                                <Loader />
                            ) : (

                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Name"  {...register("name", { required: true })}
                                                aria-invalid={errors.name ? "true" : "false"}
                                            />
                                            {errors.name?.type === 'required' && <p style={{ color: 'red' }} role="alert">Name is required</p>}

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="email" className="form-control" name="email" placeholder="Email" {...register("email", { required: true })}
                                                aria-invalid={errors.email ? "true" : "false"}
                                            />
                                            {errors.email?.type === 'required' && <p style={{ color: 'red' }} role="alert">Email is required</p>}

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="subject" placeholder="Subject"  {...register("subject", { required: true })}
                                                aria-invalid={errors.subject ? "true" : "false"}
                                            />
                                            {errors.subject?.type === 'required' && <p style={{ color: 'red' }} role="alert">Subject is required</p>}

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <textarea className="form-control" name="message" placeholder="Message" cols={30} rows={3} defaultValue={""}  {...register("description", { required: true })}
                                                aria-invalid={errors.description ? "true" : "false"}
                                            />
                                            {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Message is required</p>}

                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit"><i className="icon-paper-plane mr-2" />Send Message</button>
                                    </div>
                                </div>
                            )}
                        </form>
                        <p className="form-message" />
                    </div>
                </div>
            </div>
        </section>
    );

}

export default Contact;
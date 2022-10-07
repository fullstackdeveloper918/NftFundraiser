import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPasswordAction, LoginAction } from '../../redux/Actions/authAction';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'



const ForgotPassword = () => {

    const dispatch = useDispatch()
    const { forgotpassword, message, statusCode } = useSelector(state => {
        // 
        return state.forgotpassword
    })


    const { register, handleSubmit, formState: { errors } } = useForm();

    const OnSubmit = (data) => {
        dispatch(ForgotPasswordAction(data)).then(() => {

        });

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
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter your Email"
                                            {...register("email")}
                                        // aria-invalid={errors.email ? "true" : "false"}
                                        />
                                        {errors.email && <p style={{ color: 'red' }} role="alert">{errors.message}</p>}
                                    </div>
                                </div>
                                {/* <div>{errors.username && errors.username.message}</div> */}
                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Send Reset Link</button>
                                </div>

                                {/* <div className="col-12">
                                    <hr />
                                    <div className="other-option">
                                        Social Icons
                                        <div className="social-icons d-flex justify-content-center">
                                            {this.state.data.map((item, idx) => {
                                                return (
                                                    <a key={`lsd_${idx}`} className={item.link} href="#">
                                                        <i className={item.icon} />
                                                        <i className={item.icon} />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword
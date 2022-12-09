import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../../redux/Actions/authAction';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import swal from 'sweetalert'



const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { user } = useSelector(state => {
        // 
        // console.log(login.authToken, 'login')
        return state.login
    })
    // console.log(user, 'user')

    if (user?.status === 200) {
        history.push('/')
    }

    const mesg = useSelector(state => {
        // 
        return state.user.message
    })
    // if (login?.userToken) {
    //     console.log('hello')
    // }
    // console.log(login?.status)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const OnSubmit = (data) => {
        // 
        dispatch(LoginAction(data))

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
                                            {...register("email", { required: "Email Address is required" })}
                                            // {...register("email")}
                                            aria-invalid={errors.email ? "true" : "false"}
                                        />
                                        {errors.email && <p style={{ color: 'red' }} role="alert">{errors.email?.message}</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Enter your Password"
                                            {...register("password", { required: "Password is required" })}
                                            // {...register("email")}
                                            aria-invalid={errors.email ? "true" : "false"}
                                        />
                                        {errors.password && <p style={{ color: 'red' }} role="alert">{errors.password?.message}</p>}
                                    </div>
                                </div>
                                {/* <div className="col-12">
                                    <div className="form-group mt-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Remember Me</label>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Log In</button>
                                </div>
                                <div className="col-12">
                                    <span className="d-block text-center mt-4"><Link to="/forgotpassword">Forgot Password</Link></span>
                                </div>
                                <div className="col-12">
                                    <span className="d-block text-center mt-4">If not registered? <Link to="/signup"><b>Sign Up</b></Link></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login

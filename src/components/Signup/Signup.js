import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Register } from '../../redux/Actions/authAction'
import { Redirect, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const Signup = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [status, setStatus] = useState('none');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const OnSubmit = (data) => {
        dispatch(Register(data))
        // if (success)
        //     history.push('/create-organization')


    }


    const { user } = useSelector(state => state.user)
    console.log(user, 'userrrr')
    if (user?.status === 200) {
        history.push('/create-organization')
    }

    return (

        < section className="author-area" >
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
                                            {...register("password", { required: true })}
                                            aria-invalid={errors.password ? "true" : "false"}

                                        />
                                        {errors.password?.type === 'required' && <p style={{ color: 'red' }} role="alert">Password is required</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirm_password"
                                            placeholder="Enter your Password Again"
                                            {...register("confirm_password", { required: true })}
                                            aria-invalid={errors.confirm_password ? "true" : "false"}


                                        />
                                        {errors.confirm_password?.type === 'required' && <p style={{ color: 'red' }} role="alert">Confirm Password is required</p>}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Remember Me</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Next</button>
                                </div>
                                <div className="col-12">
                                    <span className="d-block text-center mt-4">Already have an account? <Link to="/login">Login</Link></span>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section >

    )
}

export default Signup

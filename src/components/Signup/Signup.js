import React from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Register } from '../../redux/Actions/authAction'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = Yup.object().shape({
    email: Yup.string()
    .email()
    .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match")
  });


const Signup = ({setStep}) => {
    const dispatch = useDispatch()
    const { register,watch, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

    const OnSubmit = (data) => {
        dispatch(Register(data))
    }

    const { user } = useSelector(state => state.user)

    if (user?.status === 200) {
       setStep(prev=>prev+1)
    }

    const { errMessage } = useSelector(state => {
        return state?.errmessage?.message
    })

    return (
        < section className="author-area" >
            <div className="container">

                <>
                    <div>
                        {errMessage && <p>{errMessage}</p>}

                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 co  l-lg-7">
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
                                                {...register("email", { required: 'Email address is required' })}
                                                // {...register("email")}
                                                aria-invalid={errors.email ? "true" : "false"} />
                                            {/* {errors.errMessage} */}
                                            {errors.email && <p style={{ color: 'red' }} role="alert">{errors.email?.message}</p>}
                                            {/* {errMessage && <p>{errMessage}</p>} */}
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
                                                aria-invalid={errors.password ? "true" : "false"} />
                                            {errors.password && <p style={{ color: 'red' }} role="alert">{errors.password.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">

                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirm_password"
                                                placeholder="Enter your Password Again"
                                                {...register("confirm_password",
                                                 { required: true,
                                                    validate: (val) => {
                                                        if (watch('password') != val) {
                                                          return "Your passwords do no match";
                                                        }
                                                  },
                                                })}
                                                aria-invalid={errors.confirm_password ? "true" : "false"} />
                                            {errors.confirm_password && <p style={{ color: 'red' }} role="alert">{errors.confirm_password.message}</p>}
                                        </div>
                                    </div>

                                    {/* <div className="col-12">
                                        <div className="form-group mt-3">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Remember Me</label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Next</button>
                                    </div>
                                    <div className="col-12">
                                        <span className="d-block text-center mt-4">Already have an account?<Link to="/login">Login</Link></span>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </>
            </div>
        </section >

    )
}

export default Signup

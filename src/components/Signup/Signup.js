
import { React } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormData } from './Context/context'
import styles from './styles/styles.module.scss'

const formSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Email is required"),
    // wallet_id: Yup.string()
    //     .wallet_id()
    //     .required("Wallet address is required"),
    // goal: Yup.string()
    //     .goal()
    //     .required("Fundraising goal is required"),

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


const Signup = ({ formStep, nextFormStep }) => {
    const { setFormValues } = useFormData();
    const dispatch = useDispatch()
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(formSchema)
    });

  
    const OnSubmit = (data) => {
        setFormValues({ ...data });
        nextFormStep();
    }

    const { user } = useSelector(state => state.user)


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
                            <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
                                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                                    <div className="row">
                                        <div className='steps-center'>
                                            <div className='step1icon'>

                                                <i className="fa-solid fa-circle-check"> Step 1 </i>
                                            </div>
                                            <div className='stepperline'>
                                                <i style={{ color: '#452868' }}>  ----------------------------- </i>

                                            </div>
                                            <div className='step2icon'>

                                                <i className="fa-regular fa-circle" > Step 2 </i>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="Email"
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
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder="Password"
                                                    {...register("password", { required: true })}
                                                    aria-invalid={errors.password ? "true" : "false"} />
                                                {errors.password && <p style={{ color: 'red' }} role="alert">{errors.password.message}</p>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mt-3">
                                                <label>Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="confirm_password"
                                                    placeholder="Confirm password"
                                                    {...register("confirm_password",
                                                        {
                                                            required: true,
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
                                        
                                        <div className="col-12">
                                           

                                            <button className="btn w-100 mt-3 mt-sm-4" type="submit">Next</button>
                                            
                                        </div>
                                        <div className="col-12">
                                            <span className="d-block text-center mt-4">Already have an account? <Link to="/wallet-connect"><b>Login</b></Link></span>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </section >

    )
}

export default Signup


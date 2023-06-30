import React from 'react';
import { useDispatch } from 'react-redux';
import { ForgotPasswordAction } from '../../redux/Actions/authAction';
import { useForm } from 'react-hook-form';



const ForgotPassword = () => {

    const dispatch = useDispatch()
    


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
                                            aria-invalid={errors.email ? "true" : "false"}
                                        />
                                        {errors.email && <p style={{ color: 'red' }} role="alert">{errors?.email?.message}</p>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Send Reset Link</button>
                                </div>

                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword
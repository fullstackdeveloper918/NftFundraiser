import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnnualRevenueList, CountryList, CreateOrganizationAction, HearAboutList, Register } from '../../redux/Actions/authAction'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import { useHistory } from 'react-router'
import { useFormData } from './Context/context'
import styles from './styles/styles.module.scss'
// import { Widget } from "@uploadcare/react-widget";
// import FileUpload from "react-material-file-upload";
// import { uploadcare } from '../lib/uploadcare.min.js';
const CreateOrganization = ({ formStep, nextFormStep }) => {
    const { data, setFormValues } = useFormData();

    const dispatch = useDispatch()
    const history = useHistory()

    const organization = useSelector(state => {

        return state.user.organization
    })
    const { countries } = useSelector(state => state.countries)
    const { annualRevenue } = useSelector(state => state.annualRevenue)

    // }
    const { hereAbout } = useSelector(state => state.hereAbout)
    // console.log(user, 'user')

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all'
    });


    const OnSubmit = (values) => {
        setFormValues(values)
        // FormData.append('email', data.email)
        // FormData.append('password', data.password)
        // FormData.append('confirm_password', data.confirm_password)
        const formData = new FormData()

        formData.append('image', values.image[0])
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('confirm_password', data.confirm_password)
        formData.append('organization_name', values.organization_name)
        formData.append('url', values.url)
        formData.append('country', values.country)
        formData.append('annual_revenue_range', values.annual_revenue_range)
        formData.append('tax_id', values.tax_id)
        formData.append('hear_about', values.hear_about)
        formData.append('method_heard_detail', values.method_heard_detail)
        formData.append('role', values.role)

        dispatch(Register(formData))
        // if (formData) {
        //     swal("Registered!", "You have been registered!", "success");
        //     history.push('/login')
        // }
    }

    useEffect(() => {
        dispatch(CountryList())
        dispatch(AnnualRevenueList())
        dispatch(HearAboutList())
    }, [])


    if (organization) {
        history.push('/')
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
                        <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
                            <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                                <div className="row">

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
                                            {errors.organization_name?.type === 'required' && <p style={{ color: 'red' }} role="alert">Organization name is required</p>}
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
                                            {errors.url?.type === 'required' && <p style={{ color: 'red' }} role="alert">Url is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">

                                            <select name="country"
                                                {...register("country", { required: true })}>
                                                {countries.data?.data?.map((option, key) => (

                                                    <option key={key.id} value={option.id} >
                                                        {option.name}
                                                        {/* aria-invalid={errors.tax_id ? "true" : "false"} */}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">Country is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <select name="annual_revenue_range"
                                                {...register("annual_revenue_range", { required: true })}>
                                                {annualRevenue?.data?.data?.map((option, key) => (

                                                    <option key={key.id} value={option.id} >
                                                        {option.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.annual_revenue_range?.type === 'required' && <p style={{ color: 'red' }} role="alert">Range name is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="tax_id"
                                                placeholder="Enter your EIN Number/Tax Id"
                                                {...register("tax_id", { required: true })}
                                                // {...register("email")}
                                                aria-invalid={errors.tax_id ? "true" : "false"}
                                            />
                                            {errors.tax_id?.type === 'required' && <p style={{ color: 'red' }} role="alert">Id is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <select name="hear_about"
                                                {...register("hear_about", { required: true })}>
                                                {hereAbout?.data?.data?.map((option, key) => (

                                                    <option key={key} value={option.id} >
                                                        {option.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.hear_about?.type === 'required' && <p style={{ color: 'red' }} role="alert">Hear about is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="role"
                                                defaultValue='2'
                                                placeholder="role"
                                                {...register("role", { required: true })}
                                            // {...register("email")}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="method_hear_detail"
                                                placeholder="Tell us How you Heard about us?(other)"
                                                {...register("method_heard_detail", { required: true })}
                                                // {...register("email")}
                                                aria-invalid={errors.method_heard_detail ? "true" : "false"}
                                            />
                                            {errors.method_heard_detail?.type === 'required' && <p style={{ color: 'red' }} role="alert">Hear detail is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            {/* <Dropzone
                                            onDrop={handleDrop}
                                            accept="image/*"
                                            minSize={1024}
                                            maxSize={3072000}
                                        >
                                            {({
                                                getRootProps,
                                                getInputProps,
                                                isDragActive,
                                                isDragAccept,
                                                isDragReject
                                            }) => {
                                                const additionalClass = isDragAccept
                                                    ? "accept"
                                                    : isDragReject
                                                        ? "reject"
                                                        : "";

                                                return (
                                                    <div
                                                        {...getRootProps({
                                                            className: `dropzone ${additionalClass}`
                                                        })}
                                                    >
                                                        <input {...getInputProps()} />
                                                        <span>{isDragActive ? "📂" : "📁"}</span>
                                                        <p>Drag'n'drop images, or click to select files</p>
                                                    </div>
                                                );
                                            }}
                                        </Dropzone> */}
                                            {/* <FileUpload

                                            className="form-control"
                                            value={files}
                                            name="image"
                                            onChange={setFiles}
                                            {...register("image")}
                                        /> */}

                                            <input
                                                className="form-control"
                                                type="file"
                                                name="image"
                                                placeholder="Select file"
                                                {...register("image", { required: true })}
                                                aria-invalid={errors.image ? "true" : "false"}
                                            />
                                            {errors.image?.type === 'required' && <p style={{ color: 'red' }} role="alert">File is required</p>}
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
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CreateOrganization
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnnualRevenueList, CountryList, CreateOrganizationAction, HearAboutList, Register } from '../../redux/Actions/authAction'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import { useHistory } from 'react-router'
import { useFormData } from './Context/context'
import styles from './styles/styles.module.scss'
import { GetSocialMediaIcons } from '../../redux/Actions/projectAction'
import SocialMedia from './media'
import styled from 'styled-components'
import ProgressSteps from './steps'

// import { Widget } from "@uploadcare/react-widget";
// import FileUpload from "react-material-file-upload";
// import { uploadcare } from '../lib/uploadcare.min.js';
const CreateOrganization = ({ formStep, nextFormStep, prevFormStep }) => {
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
        formData.append('banner_image', values.banner_image[0])
        formData.append('logo', values.logo[0])
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('wallet_id', data.wallet_id)
        formData.append('role', data.role)
        formData.append('goal', data.goal)
        formData.append('confirm_password', data.confirm_password)
        formData.append('organization_name', values.organization_name)
        formData.append('url', values.url)
        formData.append('country', values.country)
        // formData.append('annual_revenue_range', values.annual_revenue_range)
        formData.append('tax_id', values.tax_id)

        formData.append('social', values.social)
        formData.append('social_link', values.social_link)
        formData.append('description', values.description)
        // formData.append('method_heard_detail', values.method_heard_detail)

        dispatch(Register(formData))
        // if (formData) {
        //     swal("Registered!", "You have been registered!", "success");
        //     history.push('/login')
        // }
    }
    const socialmedia = useSelector(state => {
        return state?.getSocialmediaIcons?.getsocial
    })
    console.log('social', socialmedia)
    useEffect(() => {
        dispatch(CountryList())
        dispatch(AnnualRevenueList())
        dispatch(HearAboutList())
        dispatch(GetSocialMediaIcons())
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
                                {/* <button
                                    // className={styles.back}
                                    onClick={prevFormStep}
                                    type="button"
                                >
                                    back
                                </button> */}
                                <div className="row">
                                    <div className='orgicon1'>

                                        <i className="fa-regular fa-circle" style={{ marginRight: '8px', marginLeft: '138px' }}> Step 1</i>
                                    </div>

                                    <div className='orgicon1line'>
                                        <span style={{ color: '#452868' }}> ----------------------------- </span>

                                    </div>
                                    <div className='orgicon2'>

                                        <i className="fa-solid fa-circle-check" style={{ marginLeft: '8px' }}> Step 2</i>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="organization_name"
                                                placeholder="Organization name"
                                                {...register("organization_name", { required: true })}
                                                // {...register("email")}
                                                aria-invalid={errors.organization_name ? "true" : "false"}
                                            />
                                            {errors.organization_name?.type === 'required' && <p style={{ color: 'red' }} role="alert">Organization name is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization Website</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="url"
                                                placeholder="Website"
                                                {...register("url", { required: true })}
                                                // {...register("email")}
                                                aria-invalid={errors.url ? "true" : "false"}
                                            />
                                            {errors.url?.type === 'required' && <p style={{ color: 'red' }} role="alert">Url is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form- group mt-3">
                                            <label>Organization Description</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                placeholder="Describe your project"

                                                {...register("description", { required: true })}
                                                // {...register("email")}
                                                aria-invalid={errors.description ? "true" : "false"}
                                            />
                                            {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization Country</label>

                                            <select name="country"
                                                {...register("country", { required: true })}>
                                                aria-invalid={errors.tax_id ? "true" : "false"}
                                                <option value="" disabled selected style={{ color: "#495057" }}>Select your country</option>
                                                {countries.data?.data?.map((option, key) => (
                                                    <><option key={key.id} value={option.id}>
                                                        {option.name}
                                                    </option></>
                                                ))}
                                            </select>
                                            {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">Country is required</p>}
                                        </div>
                                    </div>
                                    {/* <div className="col-12">
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
                                    </div> */}
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization EIN Number/Tax Id</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="tax_id"
                                                placeholder="EIN Number/Tax Id(optional)"
                                                {...register("tax_id", { required: true })}
                                                // {...register("email")}
                                                aria-invalid={errors.tax_id ? "true" : "false"}
                                            />
                                            {errors.tax_id?.type === 'required' && <p style={{ color: 'red' }} role="alert">Id is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization Socialmedia</label>
                                            <select name="social"
                                                {...register("social", { required: true })}>
                                                aria-invalid={errors.social ? "true" : "false"}
                                                <option value="" disabled selected style={{ color: "#495057" }}>Select your social media</option>
                                                {socialmedia?.map((option, key) => (
                                                    <><option key={key.id} value={option.id}>
                                                        {option.title}
                                                    </option></>
                                                ))}
                                            </select>
                                            {errors.social?.type === 'required' && <p style={{ color: 'red' }} role="alert">Social media is required</p>}
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization Socialmedia Link</label>
                                            <div className="input-group-prepend">

                                                <span className="input-group-text" id="inputGroupPrepend2">@</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="social_link"
                                                    placeholder="social link "
                                                    {...register("social_link", { required: true })}
                                                    // {...register("email")}
                                                    aria-invalid={errors.social_link ? "true" : "false"}
                                                />
                                            </div>
                                            {errors.social_link?.type === 'required' && <p style={{ color: 'red' }} role="alert">Social media link is required</p>}
                                        </div>
                                    </div>

                                    {/* <div className="col-12">
                                        <div className="form-group mt-3">
                                            <select name="project"
                                                {...register("hear_about", { required: true })}>
                                                {hereAbout?.data?.data?.map((option, key) => (

                                                    <option key={key} value={option.id} >
                                                        {option.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.hear_about?.type === 'required' && <p style={{ color: 'red' }} role="alert">Hear about is required</p>}
                                        </div>
                                    </div> */}


                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization Banner</label>
                                            <input
                                                className="form-control"
                                                type="file"

                                                name="banner_image"
                                                placeholder="Select file"
                                                disp
                                                {...register("banner_image", { required: true })}
                                                aria-invalid={errors.banner_image ? "true" : "false"}
                                            />
                                            <span>maximum height should be 500 pixels & width should be 1500 pixels</span>

                                            {errors.banner_image?.type === 'required' && <p style={{ color: 'red' }} role="alert">Banner is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-3">
                                            <label>Organization Logo</label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                name="logo"
                                                placeholder="Select file"
                                                {...register("logo", { required: true })}
                                                aria-invalid={errors.logo ? "true" : "false"}
                                            />
                                            <div className='logo'>

                                                <span>maximum height should be 250 pixels</span>
                                            </div>
                                            {errors.logo?.type === 'required' && <p style={{ color: 'red' }} role="alert">logo is required</p>}
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
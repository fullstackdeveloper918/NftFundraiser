import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnnualRevenueList, CountryList, HearAboutList, Register } from '../../redux/Actions/authAction'
import { Controller, useForm } from 'react-hook-form'

import { useHistory } from 'react-router'
import { useFormData } from './Context/context'
import styles from './styles/styles.module.scss'
import { GetSocialMediaIcons } from '../../redux/Actions/projectAction'
import { useState } from 'react'
import JoditEditor from 'jodit-react';;

// import { Widget } from "@uploadcare/react-widget";
// import FileUpload from "react-material-file-upload";
// import { uploadcare } from '../lib/uploadcare.min.js';
const CreateOrganization = ({ formStep, nextFormStep, goBack }) => {

    const [description, setDescription] = useState()

    const editor = useRef(null);
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

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        mode: 'all',

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
        formData.append('wallet_id', values.wallet_id)
        // formData.append('role', data.role)
        formData.append('goal', values.goal)
        formData.append('confirm_password', data.confirm_password)
        formData.append('organization_name', values.organization_name)
        formData.append('url', values.url)
        formData.append('country', values.country)
        // formData.append('annual_revenue_range', values.annual_revenue_range)
        formData.append('tax_id', values.tax_id)

        formData.append('social', values.social)
        formData.append('social_link', values.social_link)
        formData.append('description', description)

        dispatch(Register(formData, dispatch,history))
        
    }

    const socialmedia = useSelector(state => {
        return state?.getSocialmediaIcons?.getsocial
    })
    // console.log('social', socialmedia)
    useEffect(() => {
        dispatch(CountryList())
        dispatch(AnnualRevenueList())
        dispatch(HearAboutList())
        dispatch(GetSocialMediaIcons())
    }, [])




    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9">
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
                                    <div className='col-12 d-flex justify-content-center'>
                                        <div className='orgicon1'>

                                            <i className="fa-solid fa-circle-check" > Step 1</i>
                                        </div>

                                        <div className='orgicon1line'>
                                            <span style={{ color: '#452868' }}> ----------------------------- </span>

                                        </div>
                                        <div className='orgicon2'>

                                            <i className="fa-solid fa-circle-check" > Step 2</i>
                                        </div>

                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Fundraising Goal</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="goal"
                                                step="0.01"
                                                placeholder="Fundraising goal (MATIC)"
                                                {...register("goal",
                                                    {
                                                        required: true,

                                                    })}
                                                aria-invalid={errors.goal ? "true" : "false"} />
                                            {errors.goal && <p style={{ color: 'red' }} role="alert">Fundraising goal is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Funding Wallet </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="wallet_id"
                                                // defaultValue='1'
                                                placeholder="Funding Wallet"
                                                {...register("wallet_id", { required: true })}
                                                // {...register("email")}
                                                aria-invalid={errors.wallet_id ? "true" : "false"}
                                            />
                                            {errors.wallet_id?.type === 'required' && <p style={{ color: 'red' }} role="alert">Wallet address is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Name</label>
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

                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Website</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="url"
                                                placeholder="Website"
                                                {...register("url", {
                                                    required: true,
                                                    pattern: {
                                                        value: /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&=&/]*)$/,

                                                    }
                                                })}
                                                // {...register("email")}
                                                aria-invalid={errors.url ? "true" : "false"}
                                            />

                                            {errors.url && errors.url?.type === "pattern" && <p style={{ color: 'red' }} role="alert">Not valid URL</p>}
                                            {errors.url?.type === 'required' && <p style={{ color: 'red' }} role="alert">Url is required</p>}
                                        </div>
                                    </div>

                                    {/* <div className="col-12">
                                        <div className="form- group mt-3">
                                            <label>Description</label>
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
                                    </div> */}
                                    <div className="col-12">
                                        <div className="form- group mt-3">
                                            <label>Description</label>
                                            <Controller
                                                control={control}
                                                name="description"
                                                defaultValue=""

                                                // {...register("description", { required: true })}
                                                rules={{ required: true, min: 150 }}
                                                // rules={{
                                                //     required: true, pattern: {

                                                //         message: "Description is required",
                                                //     },
                                                // }}
                                                render={({ field }) => {
                                                    return <JoditEditor
                                                        ref={field.ref}
                                                        value={field.value}
                                                        // config={config}
                                                        aria-invalid={errors.description ? "true" : "false"}
                                                        placeholder="start typing"
                                                        tabIndex={1} // tabIndex of textarea
                                                        onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                                        onChange={field.onChange}
                                                    />
                                                }}
                                            />
                                            {errors?.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Country</label>

                                            <select name="country"
                                                {...register("country", { required: true })}>
                                                aria-invalid={errors.country ? "true" : "false"}
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
                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>EIN Number/Tax Id</label>
                                            <input
                                                type="number"
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
                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Social Media (required)</label>
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

                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Social Media (secondary)</label>
                                            <div className="input-group-prepend">

                                                <span className="input-group-text" id="inputGroupPrepend2">@</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="social_link"
                                                    placeholder="social link(optional) "
                                                    {...register("social_link")}
                                                // {...register("email")}
                                                // aria-invalid={errors.social_link ? "true" : "false"}
                                                />
                                            </div>
                                            {/* {errors.social_link?.type === 'required' && <p style={{ color: 'red' }} role="alert">Social media link is required</p>} */}
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


                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Banner</label>
                                            <input
                                                className="form-control p-2"
                                                type="file"

                                                name="banner_image"
                                                placeholder="Select file"
                                                disp
                                                {...register("banner_image", { required: true })}
                                                aria-invalid={errors.banner_image ? "true" : "false"}
                                            />
                                            <span className='banner-dis'>maximum height should be 500 pixels & width should be 1500 pixels</span>

                                            {errors.banner_image?.type === 'required' && <p style={{ color: 'red' }} role="alert">Banner is required</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group mt-3">
                                            <label>Logo</label>
                                            <input
                                                className="form-control p-2"
                                                type="file"
                                                name="logo"
                                                placeholder="Select file"
                                                {...register("logo", { required: true })}
                                                aria-invalid={errors.logo ? "true" : "false"}
                                            />
                                            <div className='logo_one'>

                                                <span className='logo-dis'>maximum height should be 250 pixels</span>
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
                                    {/* <div className="col-3">
                                        <button className="btn w-100 mt-3 mt-sm-4" onClick={() => goBack()}>Previous</button>
                                    </div> */}
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

import React, { Component, useEffect, useState, useRef, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CategoriesAction, CreateProjectAction, GetCollectionsAction } from '../../redux/Actions/projectAction';

import 'reactjs-popup/dist/index.css';
import styles from "./styles/styles.module.scss"
import { useFormData } from './Context/context';
import JoditEditor from 'jodit-react'; import { CityList, CountryList, GetUserAction, StateList } from '../../redux/Actions/authAction';
import UploadImage from '../../shared/Upload';
import { blobToDataURl, dataURLtoBlob } from '../../utils/blobfromurl';
import { Autosave } from 'react-autosave';


const Create = ({ current, next, prev }) => {

    const editor = useRef(null);
    const { data, setFormValues, prevValues } = useFormData();
    console.log(data.city)
    const [description, setDescription] = useState()
    console.log('disss', description)
    const [country, setCountry] = useState("");
    console.log('country', country)
    const [state, setState] = useState("");
    console.log('state', state)
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    console.log('price', price)
    console.log('city', city)
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)


    const [collection_id, setCollectionId] = useState(0);
    const [usertype, setUserType] = useState("1");
    console.log("type", usertype)

    // const schema = yup.object().shape({
    //     description: yup.string().required()
    //     // password: yup.string().required(),
    // });
    const [nonft, setNonft] = useState('1')
    function onHandleClick(event) {
        setCollectionId(event.currentTarget.id);
    };

    console.log(data, "_________DATA_IN_CREATE______")

    const dispatch = useDispatch()
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);
    const [countryName, setCountryName] = useState(" ")
    console.log(countryName, 'countryname')

    const { countries } = useSelector(state => state.countries)

    console.log(countries?.data?.data, 'cntry')
    const states = useSelector(state => {
        // debugger
        return state.countries.states
    })

    console.log(states?.data?.data, 'states')
    const cities = useSelector(state => { return state.countries.city })

    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    console.log("userCountry", userdet.organization_detail?.country_id)
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 0).padStart(2, "0");
        const mm = String(today.getMonth() + 0).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({
        mode: "all",
    });

    const col = useSelector(state => {
        // 
        return state?.projectdetails?.getcollections
    })
    // console.log(col, 'col')
    const onSubmit = (data) => {
        // debugger
        const imageBanner = dataURLtoBlob(image)

        setFormValues({ ...data, description, type: usertype, image: imageBanner, imageUri: image });
        // localStorage.setItem('country', JSON.stringify(country))
        next()
    }
    // const bannerimage =
    // console.log('bannerimg', bannerimage)

    useEffect(() => {
        // debugger

        dispatch(GetUserAction())
        dispatch(GetCollectionsAction())
        dispatch(CategoriesAction())
        dispatch(CountryList())
        if (prev) {

            setValue('title', data.title)
            setValue('address', data.address)
            setValue('category_id', data.category_id)
            setValue('country', data.country)
            setValue('state', data.state)
            setValue('city', data.city)
            setValue('description', data.description)
            // setValue('number_of_nft', data.number_of_nft)
            setValue('price', data.price)
            // setValue('start_date', data.start_date)
            setValue('type', data.usertype)
            setValue('image', data.imageUri)

            setUserType(data.usertype)
            setCountry(data.country)
            setDescription(data.description)
            setImage(data.imageUri)
            setState(data.state)
            setCity(data.city)

            // setValue('end_date', data.end_date)
        }
        handleChangeCountry()

    }, [data])

    const cat = useSelector(state => {
        // 
        return state?.projectdetails?.categories
    })

    const handleChangeCountry = (event) => {
        // 👇 Get input value from "event"
        const formData = new FormData()
        if (event?.currentTarget?.value) {

            setCountry(event?.currentTarget?.value);
            formData.append('country_id', event?.currentTarget?.value)
        } else {
            setCountryName(userdet?.organization_detail?.country)
            setCountry(userdet?.organization_detail?.country_id);
            formData.append('country_id', userdet?.organization_detail?.country_id)
        }
        dispatch(StateList(formData)) // if (country) {

        //     debugger
        // }
    };
    const handleChangeState = (event) => {
        // 👇 Get input value from "event"
        // setCountry(event.currentTarget.value);
        const formData = new FormData()
        formData.append('country_id', country)
        formData.append('state_id', event.currentTarget.value)
        dispatch(CityList(formData))

        //     debugger
        // }
    };
    function imposeMinMax(el) {
        if (el?.value != "") {
            if (parseInt(el?.value) < parseInt(el?.min)) {
                el.value = el?.min;
            }
            if (parseInt(el?.value) > parseInt(el?.max)) {
                el.value = el.max;
            }
        }
    }

    const today = new Date();
    const numberOfDaysToAdd = 30;
    const date = today.setDate(today.getDate())
    const date1 = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().substr(0, 10) // yyyy-mm-dd
    const defaultValue1 = new Date(date1).toISOString().substr(0, 10) // yyyy-mm-dd

    const handleSubmitDraft = (data) => {
        // debugger
        // 
        const imageBanner = dataURLtoBlob(image)
        const formData = new FormData()
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value)
        }

        // formData.append("type", data.usertype)
        formData.append("image", imageBanner)
        formData.append("type", "1")
        formData.append("status", 3)
        formData.append("number_of_nft", "1")
        formData.append("on_which_step_left", 0)
        // if (data.usertype == 1) {
        //     formData.append('start_date', '')
        //     formData.append('end_date', '')
        // }

        dispatch(CreateProjectAction(formData, setLoading, history))
    }
    return (

        <div className={current === 0 ? styles.showForm : styles.hideForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="item-form card no-hover">
                <div className="row">

                    {/* <div className="col-12 ">
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline mr-2">
                                <>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiobutton"
                                        id="1"
                                        value="1"
                                        defaultChecked={data.usertype == 1 ? true : !usertype ? true : false}
                                        {...register("usertype", { required: true })}
                                        aria-invalid={errors.usertype ? "true" : "false"}
                                        onChange={(e) => setUserType(e.target.value)}
                                    />
                                    <label className="form-check-label mr-2" htmlFor="donation">Single</label>
                                </>

                                <><input
                                    className="form-check-input"
                                    type="radio"
                                    name="radiobutton"
                                    id="2"
                                    value="2"
                                    {...register("usertype", { required: true })}
                                    defaultChecked={data.usertype == 2 ? true : false}
                                    onChange={(e) => setUserType(e.target.value)}
                                    aria-invalid={errors.type ? "true" : "false"}

                                />
                                    <label className="form-check-label" htmlFor="donation">Campaign</label></>
                            </div>

                            {errors.usertype?.type === 'required' && <p style={{ color: 'red' }} role="alert">Type is required</p>}

                        </div>
                    </div> */}



                    {/* <Autosave onSave={handleSubmitDraft} data={}/> */}

                    <div className="col-md-6 col-12">
                        {/* {type == 1 && ( */}

                        <div className="form-group mt-3">
                            <label>Project name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Project name"
                                {...register("title", { required: true, pattern: { value: /[A-Za-z]/ } })}
                                aria-invalid={errors.title ? "true" : "false"}
                            />
                            {errors.title && errors.title?.type === 'pattern' && <p style={{ color: 'red' }} role="alert">Only VarChar allowed</p>}
                            {errors.title?.type === 'required' && <p style={{ color: 'red' }} role="alert">Title is required</p>}

                        </div>
                        {/* )} */}
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group mt-3">
                            <label>Web address</label>
                            <input
                                type="text"
                                className="form-control"
                                // required={false}
                                name="address"
                                placeholder="Web address"
                                {...register("address", {
                                    required: true,
                                    pattern: {
                                        value: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,

                                    }
                                })}
                                aria-invalid={errors.address ? "true" : "false"}
                            />


                            {errors.address && errors.address?.type === "pattern" && <p style={{ color: 'red' }} role="alert">Not valid URL</p>}
                            {errors.address?.type === 'required' && <p style={{ color: 'red' }} role="alert">Address is required</p>}

                        </div>
                    </div>
                    <div className="col-12">
                        <label>Description</label>
                        <div className="form-group">


                            <Controller
                                control={control}
                                name="description"
                                defaultValue=""
                                rules={{ required: true, minLength: 100 }}


                                render={({ field }) => {
                                    return <JoditEditor
                                        ref={field.ref}
                                        // value={description}
                                        // {...register("description", { required: true })}
                                        // config={config}
                                        value={field.value}

                                        placeholder="start typing"
                                        aria-invalid={errors.description ? "true" : "false"}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={field.onChange}
                                    />

                                }}
                            />
                            {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                            {errors.description && errors.description.type === "minLength" && (
                                <p style={{ color: 'red' }}>
                                    min length of words is 100
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="col-md-6 col-12">
                        <div className="form-group mt-3">

                            <label>Country</label>

                            <select name="country"

                                {...register("country", { required: true })} onChange={handleChangeCountry}>
                                aria-invalid={errors?.country ? "true" : "false"}
                                <option value={userdet?.organization_detail?.country_id} selected>{countryName}</option>
                                {countries?.data?.data?.map((option, key) => (
                                    <>


                                        <option key={key.id} value={option.id}>

                                            {option.name}

                                        </option>


                                    </>

                                ))}
                            </select>
                            {/* {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">Country is required</p>} */}
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group mt-3">
                            <label>State or province</label>

                            <select name="state"
                                {...register("state")} onChange={handleChangeState}>
                                aria-invalid={errors?.state ? "true" : "false"}
                                <option value="" disabled selected style={{ color: "#495057" }}>Select your state/province</option>
                                {states?.data?.data?.map((option, key) => (

                                    <><option key={key.id} value={option.id}  >
                                        {option.name}
                                    </option></>
                                ))}
                            </select>
                            {/* {errors.state?.type === 'required' && <p style={{ color: 'red' }} role="alert">State is required</p>} */}
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>City or Region</label>

                            <select name="city"
                                {...register("city")}>
                                aria-invalid={errors?.city ? "true" : "false"}
                                <option value="" disabled selected style={{ color: "#495057" }}>Select your city/region</option>
                                {cities?.data?.data?.map((option, key) => (
                                    <><option key={key.id} value={option.id}>
                                        {option.name}
                                    </option></>
                                ))}
                            </select>
                            {/* {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">City is required</p>} */}
                        </div>

                        {/* {!usertype || usertype == 1 ? (

                            <div className="col-12 col-md-12 pl-0 pr-0">
                                <div className="form-group">
                                    <label>Number of NFTs</label>
                                    <input
                                        type="number"

                                        className="form-control"
                                        name="number_of_nft"

                                        value={nonft}
                                        onChange={() => setNonft('1')}
                                        defaultValue={nonft}
                                        min={1}
                                        max={1}

                                        maxLength={1}
                                        placeholder="number of NFT (1 allowed)"
                                        {...register("number_of_nft", { required: true, min: 1, max: 1 })}
                                        aria-invalid={errors.number_of_nft ? "true" : "false"}
                                    />
               
                                   
                                </div>
                            </div>
                        ) : (
                            <div className="col-12 col-md-12 pl-0 pr-0">
                                <div className="form-group">
                                    <label>Number of NFTs</label>
                                    <input
                                      
                                        type="number"
                                        className="form-control"
                                        name="number_of_nft"

                                        min={1}
                                        max={10}
                                        maxLength={10}

                                        
                                        placeholder="Select your number of NFTs (1-10)"
                                        {...register("number_of_nft", { required: true, min: 1, max: 10 })}

                                        aria-invalid={errors.number_of_nft ? "true" : "false"}
                                    />
                                    {errors.number_of_nft && errors.number_of_nft.type === "max" && (
                                        <p style={{ color: 'red' }}>
                                            10 NFTs Maximum per Campaign
                                        </p>
                                    )}
                                    {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of NFTs per project is required with a limit of 10</p>}
                                </div>
                            </div>
                        )} */}


                        <div className="col-12 col-md-12 pr-0 pl-0">
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category_id"
                                    {...register("category_id", { required: true })}
                                >
                                    aria-invalid={errors.category_id ? "true" : "false"}
                                    <option value="" disabled selected style={{ color: "#495057" }}>Select category </option>
                                    {cat?.map((option, key) => (

                                        <option key={key.id} value={option.id} >
                                            {option.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id?.type === 'required' && <p style={{ color: 'red' }} role="alert">Category is required</p>}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            {usertype == 2 ? (

                                <label>Price per NFT (In MATIC tokens)</label>
                            ) : (
                                <label>Price (In MATIC tokens)</label>

                            )}
                            <input
                                type="number"
                                className="form-control"
                                step="0.01"
                                name="price"
                                placeholder="Price"
                                {...register("price", { required: true })}
                                onChange={(e) => setPrice(e.target.value)}
                                aria-invalid={errors.price ? "true" : "false"}
                            />
                            {errors.price?.type === 'required' && <p style={{ color: 'red' }} role="alert">Price is required</p>}
                        </div>
                        <div className="">
                            <div className="form-group pricing-detail">
                                <p><span>Price</span> <span>{price ? price : '--'} MATIC</span></p>
                                <p><span>Karmatica Fee</span><span>1%</span></p>
                                <p><span>You will receive </span><span>{99 * price / 100 ? 99 * price / 100 : "--"} MATIC</span></p>
                            </div>
                        </div>
                    </div>


                    {/* {usertype == 2 && (

                        <><div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Campaign Start date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="start_date"
                                    min={disablePastDate()}
                                    defaultValue={defaultValue}

                                    {...register("start_date", { required: true })}
                                    aria-invalid={errors.start_date ? "true" : "false"} />
                                {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>}
                            </div>
                        </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Campaign End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="end_date"
                                        defaultValue={defaultValue1}
                                        min={disablePastDate()}

                                        {...register("end_date", { required: true })}
                                        aria-invalid={errors.end_date ? "true" : "false"}
                                    />
                                    <div >

                                        <span className='logo-dis'>End date should be greater then or equal to start date</span>
                                    </div>
                                    {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                </div>
                            </div></>
                    )} */}
                    <div className=" col-12">
                        <div className="form-group">
                            <label>Banner image</label>
                            <UploadImage
                                imageSrc={image}
                                // src={image}
                                initalImag={data.imageUri}

                                setImageSrc={setImage}
                            />
                            <div >

                                <div className='logo-dis logo-dis-img'>
                                    <span>Allowed types: JPG, PNG, GIF</span><span>Banner should be 800 px wide x 500 px high, 10MB max</span>
                                </div>
                            </div>
                            {/* {errors.end_date && errors?.end_date?.type === 'min' && <p style={{ color: 'red' }} role="alert">End date should be greater or equal to startdate</p>} */}
                            {/* {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>} */}
                        </div>
                    </div>




                    <div className="col-6">
                        <button className="btn w-100 mt-3 mt-sm-4" onClick={handleSubmit(handleSubmitDraft)}>
                            Save as Draft
                        </button>
                    </div>
                    <div className="col-6">
                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Next</button>
                    </div>
                </div>
            </form>
        </div>
    );

}

export default Create;

import React, { Component, useEffect, useState, useRef, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CategoriesAction, GetCollectionsAction } from '../../redux/Actions/projectAction';
import GeoLocation from './geoLocation';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import 'reactjs-popup/dist/index.css';
import styles from "./styles/styles.module.scss"
import { useFormData } from './Context/context';
import JoditEditor from 'jodit-react'; import { CityList, CountryList, StateList } from '../../redux/Actions/authAction';
;

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
    console.log('city', city)

    const [collection_id, setCollectionId] = useState(0);
    const [type, setType] = useState();

    // const schema = yup.object().shape({
    //     description: yup.string().required()
    //     // password: yup.string().required(),
    // });
    function onHandleClick(event) {
        setCollectionId(event.currentTarget.id);
    };

    console.log(data, "_________DATA_IN_CREATE______")

    const dispatch = useDispatch()
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);

    const { countries } = useSelector(state => state.countries)

    console.log(countries?.data?.data, 'cntry')
    const states = useSelector(state => {
        // debugger
        return state.countries.states
    })

    console.log(states?.data?.data, 'states')
    const cities = useSelector(state => { return state.countries.city })
    useEffect(() => {
        dispatch(CountryList())

    }, [])

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };



    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({
        mode: "all",
        // resolver: yupResolver(schema)

    });

    const col = useSelector(state => {
        // 
        return state?.projectdetails?.getcollections
    })
    // console.log(col, 'col')
    const OnSubmit = (data) => {
        setFormValues({ ...data, type, description });
        // localStorage.setItem('country', JSON.stringify(country))
        next();
    }
    useEffect(() => {
        dispatch(GetCollectionsAction())
        dispatch(CategoriesAction())
        if (prev) {
            // 
            setValue('title', data.title)
            setValue('address', data.address)
            setValue('category_id', data.category_id)
            setValue('country', data.country)
            setValue('state', data.state)
            setValue('city', data.city)
            setValue('description', data.description)
            setValue('number_of_nft', data.number_of_nft)
            setValue('price', data.price)
            setValue('start_date', data.start_date)
            setValue('type', data.type)

            setType(data.type)
            setCountry(data.country)
            setDescription(data.description)

            setState(data.state)
            setCity(data.city)

            setValue('end_date', data.end_date)
        }

    }, [data])

    const cat = useSelector(state => {
        // 
        return state?.projectdetails?.categories
    })
    const handleChangeCountry = (event) => {
        // 👇 Get input value from "event"
        setCountry(event.currentTarget.value);
        const formData = new FormData()
        formData.append('country_id', event.currentTarget.value)
        dispatch(StateList(formData))        // if (country) {

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
    // const [dateError,setErrordate] = useState("")
    // function checkDateValidation(start_date, end_date) {
    //     // check the dates
    //     if ((new Date(start_date) > new Date(end_date)) || (new Date(end_date) < new Date(start_date))) {
    //         // set date error validation true 
    //         setErrordate("should be gtr")
    //     } else {
    //         // null or false date error validation 
    //     }
    // }
    return (

        <div className={current === 0 ? styles.showForm : styles.hideForm}>
            <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                <div className="row">

                    <div className="col-12 ">
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                {data.type == 2 ? (
                                    <><input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiobutton"
                                        id="donation"
                                        value="2"
                                        // defaultChecked={data.type ? true : false}
                                        {...register("type", { required: true })}
                                        aria-invalid={errors.type ? "true" : "false"}
                                        onChange={(e) => setType(e.target.value)}
                                        defaultChecked={data.type}
                                    />
                                        <label className="form-check-label" htmlFor="donation">Campaign</label>
                                    </>
                                ) : (

                                    <><input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiobutton"
                                        id="donation"
                                        value="2"
                                        {...register("type", { required: true })}
                                        onChange={(e) => setType(e.target.value)}
                                        aria-invalid={errors.type ? "true" : "false"}
                                    />
                                        <label className="form-check-label" htmlFor="donation">Campaign</label></>
                                )}
                            </div>
                            <div className="form-check form-check-inline">
                                {data.type == 1 ? (
                                    <><input
                                        className="form-check-input"
                                        type="radio" name="radiobutton"
                                        id="product_sale"
                                        value="1"
                                        defaultChecked={data.type}
                                        {...register("type", { required: true })}
                                        onChange={(e) => setType(e.target.value)}
                                        aria-invalid={errors.type ? "true" : "false"}
                                    // defaultChecked={data.type ? true : false}
                                    /><label className="form-check-label" htmlFor="product_sale">Single</label></>
                                ) : (



                                    <><input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiobutton"
                                        id="product_sale"
                                        value="1"
                                        // checked
                                        {...register("type", { required: true })}
                                        // defaultChecked={type === null ? true : false}

                                        onChange={(e) => setType(e.target.value)}
                                        aria-invalid={errors.type ? "true" : "false"}

                                    />
                                        <label className="form-check-label" htmlFor="product_sale">Single</label></>


                                )}
                            </div>
                            {errors.type?.type === 'required' && <p style={{ color: 'red' }} role="alert">Type is required</p>}

                        </div>
                    </div>




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
                                type="url"
                                className="form-control"
                                name="address"
                                placeholder="Web address"
                                {...register("address", {
                                    required: true, pattern: {
                                        value: /^(\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                                        message: 'Please enter a valid url'
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
                                rules={{ required: true }}

                                render={({ field: { value, onChange } }) => {
                                    return <JoditEditor
                                        ref={editor}
                                        // value={description}
                                        // {...register("description", { required: true })}
                                        // config={config}
                                        value={description}
                                        placeholder="start typing"
                                        aria-invalid={errors.description ? "true" : "false"}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={setDescription}
                                    />

                                }}
                            />
                            {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                            {/* {errors.description?.message && <span>{errors.description.message}</span>} */}

                            {/* {errors.description && errors?.description?.type === "min" && <p style={{ color: 'red' }} role="alert">Description limit is 150 words</p>} */}
                        </div>
                    </div>


                    <div className="col-md-6 col-12">
                        <div className="form-group mt-3">
                            <label>Country</label>

                            <select name="country"

                                {...register("country", { required: true })} onChange={handleChangeCountry}>
                                aria-invalid={errors?.country ? "true" : "false"}
                                <option value="" disabled selected style={{ color: "#495057" }}>Select your country</option>
                                {countries?.data?.data?.map((option, key) => (
                                    <>


                                        <option key={key.id} value={option.id}>

                                            {option.name}

                                        </option>


                                    </>

                                ))}
                            </select>
                            {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">Country is required</p>}
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
                        <div className="form-group mt-3">
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
                    </div>
                    {/* <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>State or Province</label>
                            <Controller
                                control={control}
                                name="state"
                                render={({ field: { onChange, onBlur, value, ref } }) => (

                                    <GeoLocation
                                       

                                        onChange={setState}
                                        geoId={country}
                                        onBlur={onBlur}
                                        selected={value}
                                    
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>City or Region</label>
                            <Controller
                                control={control}
                                name="city"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <GeoLocation
                                        // locationTitle="City"
                                        // isCity
                                        // setValue={data.city}
                                        onChange={setCity}
                                        geoId={state}

                                        onBlur={onBlur}
                                        selected={value}
                                        required={true}
                                        // onChange={onChange}


                                        // {...register("city", { required: true })}
                                        aria-invalid={errors.city ? "true" : "false"}
                                    />
                                )}
                            />
                            {errors.city?.type === 'required' && <p style={{ color: 'red' }} role="alert">city is required</p>}
                        </div>
                    </div> */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            {type == 2 ? (

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
                                aria-invalid={errors.price ? "true" : "false"}
                            />
                            {errors.price?.type === 'required' && <p style={{ color: 'red' }} role="alert">Price is required</p>}
                        </div>
                    </div>


                    {type == 1 ? (

                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Number of NFTs</label>
                                <input
                                    type="number"

                                    className="form-control"
                                    name="number_of_nft"
                                    // value='1'
                                    // defaultValue={1}
                                    // defaultValue={1}
                                    // disabled={true}
                                    min={1}

                                    placeholder="number of NFT (1 allowed)"
                                    {...register("number_of_nft", { required: true, min: 1, max: 1 })}
                                    // {...register("number_of_nft", { maxLength: 12 })}
                                    aria-invalid={errors.number_of_nft ? "true" : "false"}
                                />
                                {errors.number_of_nft && errors.number_of_nft.type === "max" && (
                                    <p style={{ color: 'red' }}>
                                        Only 1 nft allowed
                                    </p>
                                )}
                                {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of NFT is required and limit is upto 1</p>}
                                {/* {errors.number_of_nft?.type === "maxLength" && <p style={{ color: 'red' }} role="alert">Max one length </p>} */}
                            </div>
                        </div>
                    ) : (
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Number of NFTs</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="number_of_nft"

                                    // defaultValue={1}
                                    min={1}
                                    // disabled={type == 1}
                                    placeholder="Select your number of NFTs (1-10)"
                                    {...register("number_of_nft", { required: true, min: 1, max: 10 })}
                                    // {...register("number_of_nft", { maxLength: 12 })}
                                    aria-invalid={errors.number_of_nft ? "true" : "false"}
                                />
                                {/* {errors.number_of_nft?.message && <p>{errors.number_of_nft.message}</p>} */}
                                {errors.number_of_nft && errors.number_of_nft.type === "max" && (
                                    <p style={{ color: 'red' }}>
                                        Only 10 nfts allowed
                                    </p>
                                )}
                                {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of NFTs per project is required with a limit of 10</p>}
                                {/* {errors.number_of_nft?.type === "maxLength" && <p style={{ color: 'red' }} role="alert">Max length exceeded</p>} */}
                            </div>
                        </div>
                    )}
                    {type == 2 && (

                        <><div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Campaign Start date</label>
                                <input
                                    type="date"
                                    // placeholder='dd-mm-yy'
                                    // hidden={data.type == 1}
                                    className="form-control"
                                    name="start_date"
                                    min={disablePastDate()}

                                    // placeholder="Start date :"
                                    {...register("start_date", { required: true })}
                                    aria-invalid={errors.start_date ? "true" : "false"} />
                                {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>}
                            </div>
                        </div><div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Campaign End Date</label>
                                    <input
                                        type="date"
                                        // hidden={data.type == 1}
                                        className="form-control"
                                        name="end_date"
                                        min={disablePastDate()}

                                        // placeholder="End date"
                                        {...register("end_date")}
                                        aria-invalid={errors.end_date ? "true" : "false"}
                                    />
                                    {/* {errors.end_date && errors?.end_date?.type === 'min' && <p style={{ color: 'red' }} role="alert">End date should be greater or equal to startdate</p>} */}
                                    {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                </div>
                            </div></>
                    )}
                    {/* {data.type == 2 && (


                                        <><div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Campaign Start date</label>
                                                <input
                                                    type="date"
                                                    // placeholder='dd-mm-yy'
                                                    className="form-control"
                                                    value={data.start_date}

                                                    name="start_date"
                                                    min={disablePastDate()}

                                                    // placeholder="Start date :"
                                                    {...register("start_date", { required: true })}
                                                    aria-invalid={errors.start_date ? "true" : "false"} />
                                                {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>}
                                            </div>
                                        </div><div className="col-12 col-md-6">
                                                <div className="form-group">
                                                    <label>Campaign End Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="end_date"
                                                        value={data.end_date}

                                                        min={disablePastDate()}
                                                        // placeholder="End date"
                                                        {...register("end_date", { required: true })}
                                                        aria-invalid={errors.end_date ? "true" : "false"} />
                                                    {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                                </div>
                                            </div></>
                                    )} */}
                    <div className="col-12 col-md-6">
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


                    <div className="col-12">
                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Next</button>
                    </div>
                </div>
            </form>
        </div>
    );

}

export default Create;
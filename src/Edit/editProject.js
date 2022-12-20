// import { getValue } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { CategoriesAction, ProjectDetail, UpdateProject } from '../redux/Actions/projectAction';
import { useState } from 'react';
import GeoLocation from '../components/Create/geoLocation';
import JoditEditor from 'jodit-react';
import { CityList, CountryList, StateList } from '../redux/Actions/authAction';

const EditProject = () => {
    const editor = useRef(null);
    const [country, setCountry] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [description, setDescription] = useState();
    // const [descriptionup, setDescriptionup] = useState();
    // console.log(descriptionup, 'discup')
    const [type, setType] = useState();
    const { id } = useParams();
    // console.log(id, "idd")
    const dispatch = useDispatch()
    const history = useHistory()

    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    const dis = projdetail.description
    // setDescriptionup(dis)
    // console.log(dis, 'dis')
    // console.log(projdetail, "gfgfhghgghhgh")

    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))

    }, [id])
    const config = {
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: false
    }
    const { countries } = useSelector(state => state.countries)

    console.log(countries?.data?.data, 'cntry')
    const states = useSelector(state => {
        // debugger
        return state.countries.states
    })

    console.log(states?.data?.data, 'states')
    const cities = useSelector(state => { return state.countries.city })
    useEffect(() => {
        if (projdetail && Object.keys(projdetail).length) {

            setValue("title", projdetail.title)
            setValue("address", projdetail.address)
            setValue("description", projdetail.description)
            setValue('state', projdetail.state)
            setValue('country', projdetail.country)
            setValue('city', projdetail.city)
            setValue("price", projdetail.price)
            setValue("number_of_nft", projdetail.number_of_nft)
            setValue("start_date", projdetail.start_date)
            setValue("end_date", projdetail.end_date)
            setValue("type", projdetail.type)
            setValue('category_id', projdetail.category_id)

            setType(projdetail.type)
            setCountry(projdetail.country)
            // setState(projdetail.state)
            // setCity(projdetail.city)

            setValue("image", projdetail.image)
        }
    }, [projdetail]);

    const OnSubmit = (data) => {
        const formData = new FormData()

        // formData.append('image', data.image[0])
        formData.append('title', data.title)
        formData.append('description', description)
        formData.append('state', data.state)
        formData.append('country', data.country)
        formData.append('city', data.city)
        formData.append('address', data.address)
        formData.append('price', data.price)
        formData.append('number_of_nft', data.number_of_nft)
        if (data?.type == 1) {

            formData.append('start_date', '')
            formData.append('end_date', '')
        } else {

            formData.append('start_date', data.start_date)
            formData.append('end_date', data.end_date)
        }
        formData.append('type', data.type)
        formData.append('category_id', data.category_id)


        dispatch(UpdateProject(id, formData))
    }



    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    const cat = useSelector(state => {
        // 
        return state?.projectdetails?.categories
    })
    // console.log(cat, 'cat')
    useEffect(() => {
        dispatch(CategoriesAction())
        dispatch(CountryList())
    }, [])
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
    return (
        // <Modal
        //     {...props}
        //     size="lg"
        //     aria-labelledby="contained-modal"
        //     centered
        // >
        //     <Modal.Header closeButton>
        //         <Modal.Title id="contained-modal">
        //             Collection
        //         </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-12 col-md-7">
                        <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <span>Get Started</span>
                                <h3 className="mt-3 mb-0">Update Project</h3>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radiobutton" id="donation" value="2" onChange={(e) => setType(e.target.value)} {...register('type')} />
                                            <label className="form-check-label" htmlFor="donation">Campaign</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radiobutton" id="product_sale" value="1" onChange={(e) => setType(e.target.value)}  {...register('type')} />
                                            <label className="form-check-label" htmlFor="product_sale">Single</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-6">
                                    {/* {type == 1 && ( */}

                                    <div className="form-group mt-3">
                                        <label>Project name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            placeholder="Project name"
                                            {...register("title", { required: true })}
                                            aria-invalid={errors.title ? "true" : "false"}
                                        />
                                        {errors.title?.type === 'required' && <p style={{ color: 'red' }} role="alert">Title is required</p>}

                                    </div>
                                    {/* )} */}
                                </div>
                                <div className="col-6">
                                    <div className="form-group mt-3">
                                        <label>Web address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="Web Address"
                                            {...register("address", { required: true })}
                                            aria-invalid={errors.address ? "true" : "false"}
                                        />
                                        {errors.address?.type === 'required' && <p style={{ color: 'red' }} role="alert">Address is required</p>}

                                    </div>
                                </div>
                                <div className="col-12">
                                    <label>Description</label>
                                    <div className="form-group">
                                        {/* <textarea
                                            type="text"
                                            className="form-control"
                                            name="textarea"
                                            // data-provide="markdown-editable" rows="10"
                                            placeholder="Description"
                                            cols={30}
                                            {...register("description", { required: true })}
                                            aria-invalid={errors.description ? "true" : "false"}
                                        /> */}
                                        <Controller
                                            control={control}
                                            name="description"
                                            defaultValue=""
                                            render={({ field: { value, onChange } }) => {
                                                return <JoditEditor
                                                    ref={editor}
                                                    value={value}
                                                    // config={config}

                                                    placeholder="start typing"
                                                    tabIndex={1} // tabIndex of textarea
                                                    onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                                    onChange={newContent => { }}
                                                />
                                            }}
                                        />
                                        {/* <textarea value={value} onChange={setDescription}></textarea> */}



                                        {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                                    </div>
                                </div>

                                <div className="col-md-6 col-12">
                                    <div className="form-group mt-3">
                                        <label>Country</label>
                                        <Controller
                                            control={control}
                                            name="country"
                                            // selected={country}
                                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                                <select name="country"

                                                    {...register("country", { required: true })} onChange={handleChangeCountry} >
                                                    aria-invalid={errors?.country ? "true" : "false"}
                                                    <option value="" disabled selected style={{ color: "#495057" }} >Select your country</option>
                                                    {countries?.data?.data?.map((option, key) => (
                                                        <>
                                                            <option key={key.id} value={option.id} >

                                                                {option.name}

                                                            </option>
                                                        </>
                                                    ))}
                                                </select>
                                            )}
                                        />
                                        {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">Country is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group mt-3">
                                        <label>State or Province</label>

                                        <select name="state"
                                            {...register("state", { required: true })} onChange={handleChangeState} >
                                            aria-invalid={errors?.state ? "true" : "false"}
                                            <option value="" disabled selected style={{ color: "#495057" }}>Select your state</option>
                                            {states?.data?.data?.map((option, key) => (

                                                <><option key={key.id} value={option.id}  >
                                                    {option.name}
                                                </option></>
                                            ))}
                                        </select>
                                        {errors.state?.type === 'required' && <p style={{ color: 'red' }} role="alert">State is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group mt-3">
                                        <label>City or Region</label>

                                        <select name="city"
                                            {...register("city", { required: true })}>
                                            aria-invalid={errors?.city ? "true" : "false"}
                                            <option value="" disabled selected style={{ color: "#495057" }}>Select your city</option>
                                            {cities?.data?.data?.map((option, key) => (
                                                <><option key={key.id} value={option.id}>
                                                    {option.name}
                                                </option></>
                                            ))}
                                        </select>
                                        {errors.country?.type === 'required' && <p style={{ color: 'red' }} role="alert">City is required</p>}
                                    </div>
                                </div>
                                {/* <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label>Country</label>
                                        <Controller
                                            control={control}
                                            name="country"
                                            // selected={country}
                                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                                // onChange={onChange}

                                                <GeoLocation
                                                    // locationTitle="Country"
                                                    isCountry
                                                    onBlur={onBlur}
                                                    selected={value}
                                                    onChange={setCountry}
                                                    required={true}
                                                />
                                            )}
                                        />

                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
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
                                                  
                                                    onChange={setCity}
                                                    geoId={state}
                                                    onBlur={onBlur}
                                                    selected={value}
                                             
                                                />
                                            )}
                                        />
                                     
                                    </div>
                                </div> */}
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        {type == 2 ? (

                                            <label>Price</label>
                                        ) : (

                                            <label>Price per NFT</label>
                                        )}
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="price"
                                            placeholder="Price"
                                            {...register("price", { required: true })}
                                            aria-invalid={errors.price ? "true" : "false"}
                                        />
                                        {errors.price?.type === 'required' && <p style={{ color: 'red' }} role="alert">Price is required</p>}
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label>Number of NFTs</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="number_of_nft"
                                            defaultValue={1}
                                            disabled={type == 1}
                                            placeholder="Select your number of NFTs (1-10)"
                                            min={1}
                                            max={10}
                                            {...register("number_of_nft", { required: true })}
                                            aria-invalid={errors.number_of_nft ? "true" : "false"}
                                        />
                                        {/* {errors.number_of_nft?.message && <p>{errors.number_of_nft.message}</p>} */}
                                        {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of NFT is required</p>}
                                    </div>
                                </div>
                                {type == 2 && (

                                    <><div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Campaign Start date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="start_date"
                                                min={disablePastDate()}
                                                // placeholder="Start date"
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
                                                    min={disablePastDate()}
                                                    // placeholder="End date"
                                                    {...register("end_date", { required: true })}
                                                    aria-invalid={errors.end_date ? "true" : "false"} />
                                                {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                            </div>
                                        </div></>
                                )}
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select name="annual_revenue_range"
                                            // defaultValue={}
                                            {...register("category_id")}>
                                            {cat?.map((option, key) => (

                                                <option key={key.id} value={option.id}  >
                                                    {option.title}

                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        //     </Modal.Body>
        // </Modal>
    );

}

export default EditProject;
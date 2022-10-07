// import { getValue } from '@mui/system';
import React, { Component, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ProjectDetail, ProjectList, UpdateProject } from '../redux/Actions/projectAction';
import { getProjectDetail } from '../redux/Slices/projectSlice';

const EditProject = () => {
    const id = useParams();
    console.log(id, "idd")
    const dispatch = useDispatch()
    const history = useHistory()

    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })

    console.log(projdetail, "gfgfhghgghhgh")

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        // 
        dispatch(ProjectDetail(id))

    }, [id])

    useEffect(() => {
        if (projdetail && Object.keys(projdetail).length) {

            setValue("title", projdetail.title)
            setValue("address", projdetail.address)
            setValue("description", projdetail.description)
            setValue("latitude", projdetail.latitude)
            setValue("logitude", projdetail.logitude)
            setValue("price", projdetail.price)
            setValue("number_of_nft", projdetail.number_of_nft)
            setValue("start_date", projdetail.start_date)
            setValue("end_date", projdetail.end_date)
            setValue("type", projdetail.type)
            setValue("image", projdetail.image[0])
        }
    }, [projdetail]);

    const OnSubmit = (data) => {
        // 
        const formData = new FormData()

        formData.append('image', data.image[0])
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('latitude', data.latitude)
        formData.append('logitude', data.logitude)
        formData.append('address', data.address)
        formData.append('price', data.price)
        formData.append('number_of_nft', data.number_of_nft)
        formData.append('start_date', data.start_date)
        formData.append('end_date', data.end_date)
        formData.append('type', data.type)

        dispatch(UpdateProject(id, formData))
    }
    // if (formData) {
    //     swal("Created!", "Project created successfully!", "success");
    //     // history.push('/login')
    // }
    // // 
    //     }

    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-between">

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
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            placeholder="Item name"

                                            {...register("title")}
                                            defaultValue='title'
                                        />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="Address"
                                            {...register("address")}
                                        />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="textarea"
                                            placeholder="Description"
                                            cols={30} rows={3}
                                            {...register("description")}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="latitude"
                                            placeholder="Latitude"
                                            {...register("latitude")}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="logitude"
                                            placeholder="Logitude"
                                            {...register("logitude")}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="price"
                                            placeholder="Price"
                                            {...register("price")}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="number_of_nft"
                                            placeholder="Size"
                                            {...register("number_of_nft")}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="start_date"
                                            placeholder="Enter your start date"
                                            {...register("start_date")}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="end_date"
                                            placeholder="Enter your end date"
                                            {...register("end_date")}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-group form-group">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="inputGroupFile01"
                                                {...register("image")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="donation" id="donation" value="1"  {...register("type")} />
                                            <label className="form-check-label" htmlFor="donation">Donation</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="product_sale" id="product_sale" value="2" {...register("type")} />
                                            <label className="form-check-label" htmlFor="product_sale">Product sale</label>
                                        </div>

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
    );

}

export default EditProject;
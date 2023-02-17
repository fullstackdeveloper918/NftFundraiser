
import React, { Component, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { GetUserAction, UpdateProfileAction } from "../../redux/Actions/authAction";
import { useEffect } from "react";
import UserTransdataTable from "./userTransTable";
import UserdataTable from "./userDetails";
import Banner from "../Create/editBanner";
import AvatarUpload from "./avatarUpload";
import BannerUpload from "./bannerUpload";
// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

const AuthorProfile = () => {
    const [modalSho, setModalSho] = React.useState(false);
    const [modalShoww, setModalShoww] = React.useState(false);
    const [modalShowadd, setModalShowadd] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowavatar, setModalShowavatar] = React.useState(false);
    const [loading, setLoading] = useState('')
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    console.log(userdet, 'user')
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const formData = new FormData()

        // formData.append('image', data.image[0])
        formData.append('username', data.username)
        formData.append('email', data.email)
        dispatch(UpdateProfileAction(formData))

    }
    useEffect(() => {
        dispatch(GetUserAction());
    }, []);
    useEffect(() => {
        if (userdet && Object.keys(userdet).length) {
            setValue("avatar", userdet.avatar);
            setValue("username", userdet.username);
            setValue("email", userdet.email);
        }
    }, [userdet]);
    return (
        <div className="col-12">
            <div className="container">
                {/* <h3 class="p-0">Author Name </h3> */}
                <div className="row pt-0">
                    <div className='col-md-8'>
                        <div className="banner item-thumb text-center">
                            <div>
                                <i class="fa-solid fa-pen-to-square item-thumb-edit"
                                    onClick={() => setModalSho(true)}
                                ></i>
                                <BannerUpload

                                    show={modalSho}
                                    onHide={() => setModalSho(false)} />

                            </div>
                            <img src={userdet.banner_image} alt="first nft" />
                        </div>
                        <div className="table-detail mt-4">
                            <UserdataTable />

                        </div>
                        <div className="profile_detail mt-4 position-relative">

                            <UserTransdataTable />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-4 mt-lg-0">
                        <div className="profile_main_right card wrap_card no-hover text-center">

                            <div className="image-over">
                                <div>
                                    <i class="fa-solid fa-pen-to-square item-thumb-edit"
                                        onClick={() => setModalShowavatar(true)}
                                    ></i>
                                    <AvatarUpload

                                        show={modalShowavatar}
                                        onHide={() => setModalShowavatar(false)} />

                                </div>
                                <img className="card-img-top" src={userdet.avatar} alt="" />
                            </div>
                            {/* Card Caption */}
                            <div className="card-caption col-12 p-0">
                                {/* Card Body */}


                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="item-form card no-hover p-0">

                                <div className="card-body">
                                    <from className="Edite_able">
                                        <label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                placeholder="username"
                                                {...register("username", { required: true })}
                                                aria-invalid={errors.username ? "true" : "false"}
                                            />
                                            {errors.username?.type === 'required' && <p style={{ color: 'red' }} role="alert">username is required</p>}
                                            <i class="fa-solid fa-pen"></i>
                                        </label>
                                        <label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                disabled={userdet.role == 3 ? true : false}
                                                // value={userdet.role == 3 && userdet.email}
                                                placeholder="email"
                                                {...register("email")}
                                                aria-invalid={errors.email ? "true" : "false"}
                                            />
                                            {/* {errors.address?.type === 'required' && <p style={{ color: 'red' }} role="alert">Address is required</p>} */}
                                            {userdet.role == 2 &&

                                                <i class="fa-solid fa-pen"></i>
                                            }
                                        </label>

                                        {/* Social Icons */}
                                        <div className="social-icons d-flex justify-content-center my-3">
                                            <svg
                                                class="svg-inline--fa fa-facebook-f fa-w-10"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="facebook-f"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                                data-fa-i2svg=""
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                                ></path>
                                            </svg>
                                            <svg
                                                class="svg-inline--fa fa-twitter fa-w-16"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="twitter"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                data-fa-i2svg=""
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                                ></path>
                                            </svg>
                                            <svg
                                                class="svg-inline--fa fa-google-plus-g fa-w-20"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="google-plus-g"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 512"
                                                data-fa-i2svg=""
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"
                                                ></path>
                                            </svg>
                                            <svg
                                                class="svg-inline--fa fa-vine fa-w-12"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="vine"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 384 512"
                                                data-fa-i2svg=""
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M384 254.7v52.1c-18.4 4.2-36.9 6.1-52.1 6.1-36.9 77.4-103 143.8-125.1 156.2-14 7.9-27.1 8.4-42.7-.8C137 452 34.2 367.7 0 102.7h74.5C93.2 261.8 139 343.4 189.3 404.5c27.9-27.9 54.8-65.1 75.6-106.9-49.8-25.3-80.1-80.9-80.1-145.6 0-65.6 37.7-115.1 102.2-115.1 114.9 0 106.2 127.9 81.6 181.5 0 0-46.4 9.2-63.5-20.5 3.4-11.3 8.2-30.8 8.2-48.5 0-31.3-11.3-46.6-28.4-46.6-18.2 0-30.8 17.1-30.8 50 .1 79.2 59.4 118.7 129.9 101.9z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <button className="btn btn-bordered-white btn-smaller" type="submit" >
                                            Update
                                        </button>
                                    </from>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {" "}
            </div>
            {" "}
        </div>
    );
};

export default AuthorProfile;
// import React, { Component, useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { GetUserAction } from '../../redux/Actions/authAction';



// const AuthorProfile = () => {
//     const userdet = useSelector(state => {
//         return state?.user?.userdetail
//     })
//     const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(GetUserAction())

//     })
//     useEffect(() => {
//         if (userdet && Object.keys(userdet).length) {

//             setValue("avatar", userdet.avatar)
//             setValue("username", userdet.username)
//             setValue("email", userdet.email)

//         }

//     }, [userdet])
//     return (
//         <div className="card no-hover text-center">
//             <form onSubmit={handleSubmit} className="item-form card no-hover">
//                 <div className="image-over">
//                     {/* <img className="card-img-top" src={""} alt="" /> */}
//                     {/* Author */}
//                     <div className="author">
//                         <div className="author-thumb avatar-lg">
//                             <img className="rounded-circle" src={userdet.avatar} alt="" />
//                         </div>
//                     </div>
//                 </div>
//                 {/* Card Caption */}
//                 <div className="card-caption col-12 p-0">
//                     {/* Card Body */}
//                     <div className="card-body mt-4">
//                         <h5 className="mb-3">Author</h5>
//                         <p className="my-3">Author content</p>
//                         <div className="col-12">
//                             {/* {type == 1 && ( */}

//                             <div className="form-group mt-3">
//                                 <label>Avatar</label>
//                                 <input
//                                     type="file"
//                                     className="form-control"
//                                     name="avatar"
//                                     placeholder="avatar"
//                                     {...register("avatar", { required: true })}
//                                     aria-invalid={errors.avatar ? "true" : "false"}
//                                 />
//                                 {errors.avatar?.type === 'required' && <p style={{ color: 'red' }} role="alert">avatar is required</p>}

//                             </div>
//                             {/* )} */}
//                         </div>
//                         <div className="col-12">
//                             {/* {type == 1 && ( */}

//                             <div className="form-group mt-3">
//                                 <label>Username</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="username"
//                                     placeholder="username"
//                                     {...register("username", { required: true })}
//                                     aria-invalid={errors.username ? "true" : "false"}
//                                 />
//                                 {errors.username?.type === 'required' && <p style={{ color: 'red' }} role="alert">username is required</p>}

//                             </div>
//                             {/* )} */}
//                         </div>
//                         <div className="col-12">
//                             <div className="form-group mt-3">
//                                 <label>Email</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     name="email"
//                                     value={userdet.email}
//                                 // {...register("address", { required: true })}
//                                 // aria-invalid={errors.address ? "true" : "false"}
//                                 />
//                                 {/* {errors.address?.type === 'required' && <p style={{ color: 'red' }} role="alert">Address is required</p>} */}

//                             </div>
//                         </div>
//                         <div className="input-group">
//                             <input type="email" disabled={true} className="form-control" placeholder="" />

//                         </div>
//                         {/* Social Icons */}

//                         <a className="btn btn-bordered-white btn-smaller" href="#">update</a>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }


// export default AuthorProfile;
import React, { Component } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { GetUserAction, UpdateProfileAction } from '../../redux/Actions/authAction';
import { useEffect } from 'react';
// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

const AuthorProfile = () => {
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetUserAction())

    }, [])
    useEffect(() => {
        if (userdet && Object.keys(userdet).length) {

            setValue("avatar", userdet.avatar)
            setValue("username", userdet.username)
            setValue("email", userdet.email)

        }

    }, [userdet])
    const OnSubmit = (data) => {
        debugger
        const formData = new FormData()

        // formData.append('image', data.image[0])
        formData.append('avatar', data.avatar[0])
        formData.append('username', data.username)



        dispatch(UpdateProfileAction(formData))
    }


    return (
        <div className="card no-hover text-center">
            <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">

                <div className="image-over">
                    {/* <img className="card-img-top"  alt="" /> */}
                    {/* Author */}
                    <div className="author">
                        <div className="author-thumb avatar-lg">
                            <img className="rounded-circle" src={userdet.avatar} alt="" />
                        </div>
                    </div>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body mt-4">
                        <h5 className="mb-3">{userdet.username}</h5>
                        <div className="input-group author_detail">

                            <div>
                                <label> Avatar  </label>
                                <input
                                    type="file"
                                    // className="form-control"
                                    name="avatar"
                                    // placeholder="username"
                                    {...register("avatar", { required: true })}
                                    aria-invalid={errors.avatar ? "true" : "false"}
                                />
                                {errors.avatar?.type === 'required' && <p style={{ color: 'red' }} role="alert">avatar is required</p>}
                            </div>
                            <div>
                                <label> Username  </label>
                                <input
                                    type="text"
                                    // className="form-control"
                                    name="username"
                                    // placeholder="username"
                                    {...register("username", { required: true })}
                                    aria-invalid={errors.username ? "true" : "false"}
                                />
                                {errors.username?.type === 'required' && <p style={{ color: 'red' }} role="alert">username is required</p>}
                            </div>
                            <div>
                                <label> Email  </label>
                                <input
                                    type="email"
                                    // className="form-control"
                                    name="email"
                                    disabled={true}
                                    // placeholder="username"
                                    {...register("email", { required: true })}
                                    aria-invalid={errors.email ? "true" : "false"}

                                />
                                {errors.email?.type === 'required' && <p style={{ color: 'red' }} role="alert">email is required</p>}
                            </div>
                            <button className="btn btn-bordered-white btn-smaller" type="submit">Update</button>
                            {/* <a className="btn btn-bordered-white btn-smaller" type="submit">update</a> */}
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}


export default AuthorProfile;
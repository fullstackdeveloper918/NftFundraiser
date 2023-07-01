import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { GetUserAction, UpdateProfileAction } from "../../redux/Actions/authAction";
import { useEffect } from "react";
import UserTransdataTable from "./userTransTable";
import UserdataTable from "./userDetails";
import AvatarUpload from "./avatarUpload";
import BannerUpload from "./bannerUpload";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AuthorProfile = () => {

    const [modalSho, setModalSho] = React.useState(false);
    const [modalShowavatar, setModalShowavatar] = React.useState(false);
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetUserAction());
    }, [])

    useEffect(() => {

        if (userdet && Object.keys(userdet).length) {
            setValue("avatar", userdet.avatar);
            setValue("username", userdet.username);
            setValue("email", userdet.email);
        }
    }, [userdet]);

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('email', data.email)
        dispatch(UpdateProfileAction(formData,null,history))
    }


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
                                    <from className="Edite_able" >
                                        <label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ textTransform: 'none' }}
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
                                                className="form-control "
                                                name="email"
                                                // disabled={userdet.role == 3 ? true : false}
                                                placeholder="email"
                                                {...register("email", { required: true })}
                                                aria-invalid={errors.email ? "true" : "false"}
                                            />
                                            {errors.email?.type === 'required' && <p style={{ color: 'red' }} role="alert">email is required</p>}
                                            <i class="fa-solid fa-pen"></i>

                                        </label>
                                        <button className="btn btn-bordered-white btn-smaller" type="submit" >
                                            Update
                                        </button>
                                        <div>
                                            <br />
                                            {userdet.role == 3 ? (
                                                <>You are logged in as a Creator/merchant<br />
                                                    <span>click here to <Link to="/create">create project</Link></span></>
                                            ) : (
                                                <span>You are logged in as a Buyer</span>
                                            )}
                                        </div>
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
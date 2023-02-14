import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CountSet, GetUserAction, NotiDelete } from '../../redux/Actions/authAction';
import swal from 'sweetalert';
import { loginSuccess, logoutSuccess } from '../../redux/Slices/authSlice';
import { ConnectWallet, getCurrentWalletConnected, Roles } from '../Wallet/interact';
import Swal from 'sweetalert2';
import { isCancel } from 'axios';
import moment from "moment";

const Header = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState(null)

    const add1 = address?.slice(0, 4).toUpperCase()
    const add2 = address?.slice(35, 44).toUpperCase()

    const LogoutHandler = () => {
        dispatch(logoutSuccess())
        setAddress(null)
    }

    const userRole = useSelector(state => {
        return state.user.userdetail.role
    })
    // console.log(userRole)
    const userToken = useSelector(state => {
        return state.user.userToken
    })

    const history = useHistory()


    useEffect(() => {
        dispatch(GetUserAction())
        getCurrentWalletConnected()
        setAddress(getSelectedAddress)

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                if (!accounts.length) {
                    setAddress(null)
                    //  setIsLoggedIn(false)
                    localStorage.removeItem('auth_token')
                }
            })
        }

    }, [dispatch, address])

    function getSelectedAddress() {
        return window.ethereum?.selectedAddress;
    }

    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    // const names = Object?.keys(userdet?.notification?.status);
    // console.log(names)
    const notiHandler = () => {
        // debugger
        dispatch(CountSet())
    }
    const deleteHandler = (id) => {
        dispatch(NotiDelete(id))
    }
    const WalletHandler = async () => {
        const response = await ConnectWallet("BUYER")
        const { res } = response

        // debugger
        if (!res?.data?.data?.is_new_user && Roles["BUYER"] == res?.data?.data.role) {
            dispatch(loginSuccess(res))
            setAddress(window.ethereum.selectedAddress)
            history.push('/all/LatestProjects')
        }
        else if (res?.data?.data?.is_new_user && Roles["BUYER"] == res?.data?.data?.role) {
            dispatch(loginSuccess(res))
            setAddress(window.ethereum.selectedAddress)
            history.push('/create')

            swal({
                title: "Welcome to Karmatica!!!",
                text: "Karmatica would like to know more about yourself. Update your profile",
                icon: "success",
                buttons: {
                    continue: '',
                    skip: '',
                }
            }).then((value) => {
                switch (value) {
                    case "continue":
                        window.location = '/profile'
                        break;

                    case "skip":
                        window.location = '/projectlist'
                        break;

                }
            });



        }
        else if (!res?.data?.data?.is_new_user && Roles["CREATOR"] == res?.data?.data?.role) {
            dispatch(loginSuccess(res))
            setAddress(window.ethereum.selectedAddress)
        }
    }

    const handleCreate = () => {

        if (Roles["CREATOR"] == userRole) {
            history.push('/create')
        }
        else if (Roles["BUYER"] == userRole) {
            Swal.fire({
                icon: 'info',
                html:
                    'You need to Signup as a Creator to Create a Project',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
        }
        else if (!window.ethereum?.selectedAddress) {
            Swal.fire({
                icon: 'info',
                html:
                    'You need to Signup as a Creator to Create a Project',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
        }

    }

    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <Link to="/" className="navbar-brand">
                        <img className="navbar-brand-sticky desktop_logo" src="/img/karmatica.png" alt="karmatica" />
                        <img className="mobile-logo" src="/img/logo.png" alt="" />
                    </Link>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/">Explore</Link>
                        </li>
                        {/* {log !== null && ( */}
                        <li className="nav-item">
                            <a onClick={handleCreate} className="nav-link">Create</a>
                        </li>
                        <li className="nav-item">
                            <Link to={`/all/${"LatestProjects"}`} className="nav-link">Latest</Link>
                        </li>
                        <li className="nav-item">
                            <a target="_blank" href="https://changelly.com/?from=btc&to=matic&amount=0.1&ref_id=_-GPCBjccW7TMMjO" className="nav-link">Swap</a>
                        </li>
                    </ul>
                    {/* Navbar Toggler */}
                    {window.ethereum?.selectedAddress &&
                        <div className="dropdown notification relative">
                            <i className="btn btn-secondary dropdown-toggle fa-sharp fa-solid fa-bell  text-white w-auto m-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => notiHandler()} ></i>
                            {userdet?.notification_count > 0 &&

                                <small className='dropdown-notification'>{userdet?.notification_count}</small>
                            }
                            <ul className="creator-dropdown dropdown-menu notification-menu dropdown-scrollbar" aria-labelledby="dropdownMenuButton1">

                                {userdet?.notification?.map((item) => {
                                    return (

                                        <><li>{item.title}</li>
                                            <li className='btn_wrap'><span>{moment(item.created_at).format("ddd D MMM YY")}</span>
                                                <span><button type='submit' onClick={() => deleteHandler(item.id)}>Clear</button></span></li></>
                                    )
                                })}
                                {userdet?.notification?.length > 0 &&
                                    <span><button type='submit' className='noty_all'><Link to='/allnotifications'>See all</Link></button></span>
                                }
                                {userdet?.notification?.length == 0 &&
                                    <li>No Notification</li>
                                }
                            </ul>

                        </div>
                    }
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        {window.ethereum?.selectedAddress &&
                            <>

                                <li className="nav-item mr-2">
                                    <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />{add1}...{add2}</a>
                                </li>
                            </>
                        }
                        {!window.ethereum?.selectedAddress &&
                            <li className="nav-item ml-3">
                                <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />Connect Wallet</a>
                            </li>
                        }
                    </ul>
                    {window.ethereum?.selectedAddress && localStorage.getItem('authToken') ? (
                        <>
                            <div className="dropdown dropdown_login">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-solid fa-user"></i>
                                </button>
                                <ul class="creator-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ left: '-37%' }}>
                                    {/* <li>{userdet?.username}</li> */}
                                    <li>{userdet?.email}</li>
                                    <li><button type='button' class="dropdown-item"><Link to='/profile'>My Profile</Link></button></li>
                                    <li><button type='button' class="dropdown-item"><Link to='/projectlist'>My Projects</Link></button></li>
                                    {userRole == 3 && (

                                        <li><button type='button' class="dropdown-item"><Link to={`/fundraiser/detail/${userdet.user_id}`}>Fundraise</Link></button></li>
                                    )}
                                    <li><button type='button' class="dropdown-item" onClick={LogoutHandler}><a href='/'>Logout</a></button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <ul className="navbar-nav action">
                            <li className="nav-item ml-3">
                                <a className="creator-button btn ml-md-auto btn-bordered-white"
                                    onClick={() => history.push('/wallet-connect')}><i className="fa fa-user" />
                                    <div>Creator</div></a>
                                {/* <Link to="/login" className="creator-button btn ml-md-auto btn-bordered-white">
                                    <i className="fa fa-user" />
                                    <div>CREATOR</div>
                                </Link> */}
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </header >
    )
}
export default Header;











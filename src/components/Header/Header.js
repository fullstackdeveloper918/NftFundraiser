import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ChangeUserRole, CountSet, GetUserAction, NotiDelete } from '../../redux/Actions/authAction';
import swal from 'sweetalert';
import { loginSuccess, logoutSuccess } from '../../redux/Slices/authSlice';
import { ConnectWallet, getCurrentWalletConnected, Roles } from '../Wallet/interact';
import Swal from 'sweetalert2';
import { isCancel } from 'axios';
import moment from "moment";
import { NavLink } from 'react-router-dom';
import { Space, Switch, Tooltip } from 'antd';

const Header = () => {
    const location = useLocation();
    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState(null)
    const [active, setActive] = useState(null)
    const add1 = address?.slice(0, 4).toUpperCase()
    const add2 = address?.slice(35, 44).toUpperCase()

    const LogoutHandler = () => {
        dispatch(logoutSuccess())
        setAddress(null)
    }

    const userRole = useSelector(state => {
        return state?.user.userdetail?.role
    })
    // console.log(userRole)
    const userToken = useSelector(state => {
        return state.user.userToken
    })




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
    const SwitchOptions = [{
        OPTION1: "Buyer",
        OPTION2: "Creator"
    }]
    const [activeOption, setActiveOption] = useState(false);


    const roleHandler = () => {
        dispatch(ChangeUserRole(history))
        setActiveOption(!activeOption)
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
            // history.push('/create')

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
                        window.location = '/all/LatestProjects'
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
                    'Sign up as a Creator to start a project and upload NFTs',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
        }
        else if (!userToken) {
            Swal.fire({
                icon: 'info',
                html:
                    'Sign up as a Creator to start a project and upload NFTs',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
        }

    }
    console.log(activeOption, "active")
    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    {/* <div className="your-required-wrapper" style={{ width: 100, height: 30 }}> */}

                    {/* </div> */}
                    <Link to="/" className="navbar-brand">
                        <img className="navbar-brand-sticky desktop_logo" src="/img/karmatica.png" alt="karmatica" />
                        <img className="mobile-logo" src="/img/logo.png" alt="" />
                    </Link>
                    <div className="ml-auto" />


                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item">
                            <NavLink exact activeClassName="navbar__link--active" className="nav-link" to="/">Explore</NavLink>
                        </li>
                        {/* {log !== null && ( */}
                        <li className="nav-item text-left nav-main" >
                            <a onClick={() => handleCreate()} className={location.pathname === `/create` && "nav-link-active"} activeClassName={location.pathname === `/create` && "navbar__link--active"} >Create</a>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName="navbar__link--active" to={`/all/${"LatestProjects"}`} className="nav-link">Latest</NavLink>
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
                                    <li>No new notifications</li>
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
                        {window.ethereum?.selectedAddress && localStorage.getItem('authToken') ? (

                            <>

                                <li className="nav-item mr-2">
                                    <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />{add1}...{add2}</a>
                                </li>
                            </>
                        ) : (


                            <li className="nav-item ml-3">
                                <Tooltip title='You will be signed in as a buyer' color='#4528dc'> <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />Connect Wallet</a></Tooltip>
                            </li>

                        )}

                    </ul>
                    {window.ethereum?.selectedAddress && localStorage.getItem('authToken') ? (
                        <>

                            <div className="dropdown dropdown_login">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-solid fa-user"></i>
                                </button>
                                <ul className="creator-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {/* <li>{userdet?.username}</li> */}
                                    <div className="background">
                                        <div className="SwitchContainer">
                                            <div
                                                className="ToggleItem"
                                                style={{
                                                    backgroundColor:
                                                        userRole == 2 ? "#4528DC" : "transparent"
                                                }}
                                                onClick={() => roleHandler(SwitchOptions.OPTION1)}
                                            >
                                                <div className={"Text"}>Buyer</div>
                                            </div>
                                            <div
                                                className="ToggleItem"
                                                style={{
                                                    backgroundColor:
                                                        userRole == 3 ? "#4528DC" : "transparent"
                                                }}
                                                onClick={() => roleHandler(SwitchOptions.OPTION2)}
                                            >
                                                <div className={"Text"}>Creator</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <li>
                                        
                                        <Space direction="vertical">
                                           

                                            <Switch
                                                className='switch_custom'
                                                checkedChildren={<div onClick={() => roleHandler()}> {userRole == 2 ? 'switch to creator' : 'switch to buyer'}</div>}
                                                unCheckedChildren={<div onClick={() => roleHandler()}>{userRole == 2 ? 'switch to creator' : 'switch to buyer'}</div>}

                                            />
                                          
                                        </Space>
                                    </li> */}
                                    <li> {userdet?.email}</li>
                                    <li><button type='button' class="dropdown-item"><Link to='/profile'><i class="fa-regular fa-user"></i> My Profile</Link></button></li>
                                    {userRole == 2 && (
                                        <li><button type='button' class="dropdown-item"><Link to='/my/nfts'><i class="fa-regular fa-file-image" style={{ color: 'white', display: "table-cell" }} /> My NFTs</Link></button></li>
                                    )}
                                    <li><button type='button' class="dropdown-item"><Link to='/referals-detail'><i class="fa-solid fa-coins" style={{ color: 'white', display: "table-cell" }}></i> My Referrals</Link></button></li>
                                    {userRole == 3 && (
                                        <><li><button type='button' class="dropdown-item"><Link to='/projectlist'><i class="fa-regular fa-file" style={{ color: 'white', display: "table-cell" }}></i> My Projects</Link></button></li>

                                            <li><button type='button' class="dropdown-item"><Link to={`/fundraiser/detail/${userdet.user_id}`}><i class="fa-solid fa-hand-holding-heart" style={{ display: "table-cell", color: "white" }}></i> Fundraise</Link></button></li></>
                                    )}
                                    {/* {userRole == 2 ? ( */}


                                    {/* <li><button type='button' class="dropdown-item" onClick={() => roleHandler()}>Switch to Creator</button></li></> */}
                                    {/* ) : (
                                        <li><button type='button' class="dropdown-item" onClick={() => roleHandler()}>Switch to Buyer</button></li>
                                    )} */}
                                    <li><button type='button' class="dropdown-item" onClick={LogoutHandler}><a href='/'><i class="fa-solid fa-right-from-bracket" style={{ display: "table-cell", color: "white" }}></i> Logout</a></button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <ul className="navbar-nav action">
                            <li className="nav-item ml-3">
                                <Tooltip title='You will be signed in as a creator' color='#4528dc'>  <a className="creator-button btn ml-md-auto btn-bordered-white"
                                    onClick={() => history.push('/wallet-connect')} style={{ color: '#f8f9fa' }}><i className="fa fa-user" />
                                    <div>Creator</div></a></Tooltip>
                                {/* <Link to="/login" className="creator-button btn ml-md-auto btn-bordered-white">
                                    <i className="fa fa-user" />
                                    <div>CREATOR</div>
                                </Link> */}
                            </li>
                        </ul>
                    )}
                </div>
            </nav >
        </header >

    )
}
export default Header;











import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { GetUserAction } from '../../redux/Actions/authAction';

import { logoutSuccess } from '../../redux/Slices/authSlice';
import { isLogin } from '../../routers/utils';
import { ConnectWallet, getCurrentWalletConnected, Roles } from '../Wallet/interact';
import Swal from 'sweetalert2';

const Header = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState(null)
    const [role,setRole] = useState(2)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    // const [latitide, setLatitude] = useState([])
    // const [longitude, setLongitude] = useState([])
    // console.log('latitidell', latitide)
    // console.log('longitudeeee', longitude)
    const add1 = address?.slice(0, 4).toUpperCase()
    const add2 = address?.slice(35, 44).toUpperCase()

    const LogoutHandler = () => {
        dispatch(logoutSuccess())
        setIsLoggedIn(false)
        setAddress(null)
    }

    const log = useSelector(state => {
        return state.user.userToken
    })

    const history = useHistory()

    useEffect(() => {
        if(isLogin()){
            setIsLoggedIn(true)
        }
          else{
           setIsLoggedIn(false)  
        }
    
    },[address])

    useEffect(() => {
        dispatch(GetUserAction())
        getCurrentWalletConnected()
        setAddress(getSelectedAddress)

        if(window.ethereum){
          window.ethereum.on('accountsChanged', function (accounts) {
            if(!accounts.length){
             setAddress(null)
             setIsLoggedIn(false)
             setRole(-1)
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

    const WalletHandler = async () => {
        const response = await ConnectWallet("BUYER", setAddress)
        const { res } = response

        if (res?.data?.data?.auth_token && !res?.data?.data?.isNewUser && Roles["CREATOR"] == res?.data?.data?.role) {
            setRole(res?.data?.data.role)
            history.push('/projectlist')
        }
        else if (res?.data?.data?.auth_token && !res?.data?.data?.isNewUser && Roles["BUYER"] == res?.data?.data.role) {
            setRole(res?.data?.data.role)
            history.push('/all/LatestProjects')
            localStorage.setItem('auth_token', res?.data?.data?.auth_token)
        }
        else if (res?.data?.data?.auth_token && res?.data?.data?.isNewUser && Roles["CREATOR"] == res?.data?.data?.role) {
            setRole(res?.data?.data.role)
            history.push('/wallet-connect')
        }
        else if (res?.data?.data?.auth_token && res?.data?.data?.isNewUser && Roles["BUYER"] == res?.data?.data?.role) {
            setRole(res?.data?.data.role)
            history.push('/profile')
            localStorage.setItem('auth_token', res?.data?.data?.auth_token)
        }
    }

    const handleCreate = () => {
        if (address && Roles["CREATOR"] == role) {
          history.push('/create')
        }
        if (address && Roles["BUYER"] == role) {
            Swal.fire({
                icon: 'info',
                html:
                  'You need to Signup as a Creator to Create a Project',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
            })
        }
        else if(!address){
            history.push('/wallet-connect')
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
                            <Link to={`/all/${"LatestProjects"}`} className="nav-link">Latest Projects</Link>
                        </li>
                    </ul>
                    {/* Navbar Toggler */}
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
                        {address &&
                            <li className="nav-item mr-2">
                                <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />{add1}...{add2}</a>
                            </li>
                        }
                        {!address &&
                            <li className="nav-item ml-3">
                                <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />CONNECT WALLET</a>
                            </li>
                        }
                    </ul>
                    {isLoggedIn? (
                        <>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-solid fa-user"></i>
                                </button>
                                <ul class="creator-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ left: '-37%' }}>
                                    <li>{userdet?.username}</li>
                                    <li>{userdet?.email}</li>
                                    <li><button type='button' class="dropdown-item"><a href='/profile'>My Profile</a></button></li>
                                    <li><button type='button' class="dropdown-item"><a href='/projectlist'>My Projects</a></button></li>
                                    <li><button type='button' class="dropdown-item" onClick={LogoutHandler}><a href='/'>Logout</a></button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <ul className="navbar-nav action">
                            <li className="nav-item ml-3">
                                <a className="creator-button btn ml-md-auto btn-bordered-white"
                                    onClick={() => history.push('/wallet-connect')}><i className="fa fa-user" />
                                    <div>CREATOR</div></a>
                                {/* <Link to="/login" className="creator-button btn ml-md-auto btn-bordered-white">
                                    <i className="fa fa-user" />
                                    <div>CREATOR</div>
                                </Link> */}
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    )
}
export default Header;











import { redirect } from 'next/dist/server/api-utils';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { GetUserAction, walletSignin } from '../../redux/Actions/authAction';
import { getPublicLiveProjects } from '../../redux/Actions/projectAction';
import { logoutSuccess } from '../../redux/Slices/authSlice';
import { ConnectWallet, getCurrentWalletConnected } from '../Wallet/interact';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const Header = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState(null)
    // const [latitide, setLatitude] = useState([])
    // const [longitude, setLongitude] = useState([])
    // console.log('latitidell', latitide)
    // console.log('longitudeeee', longitude)
    const add1 = address?.slice(0, 4).toUpperCase()
    const add2 = address?.slice(35, 44).toUpperCase()
    function removeSelectedAddress() {
        return web3.eth.accounts.wallet?.remove(window.ethereum?.selectedAddress);
    }
    const LogoutHandler = () => {
        // debugger
        dispatch(logoutSuccess())

        // dispatch(removeSelectedAddress());
        setAddress(null)
    }
    const log = useSelector(state => {
        // debugger
        return state.user.userToken
    })
    console.log(log)
    // const tok = localStorage.getItem("auth_token")
    const wallsig = useSelector(state => {
        // debugger
        return state.user.wallToken
    })
    // console.log(wallsig)
    useEffect(() => {
        // localStorage.getItem('authToken')
        dispatch(GetUserAction())
        getCurrentWalletConnected()
        setAddress(getSelectedAddress)

    }, [dispatch, address])
    function getSelectedAddress() {
        return window.ethereum?.selectedAddress;
    }
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    console.log('userdet', userdet)
    const history = useHistory()
    const WalletHandler = async () => {
        const res = await ConnectWallet()
        setAddress(res?.address)
        // debugger
        dispatch(walletSignin(window.ethereum.selectedAddress, history))
        // if (userdet.role === 3) {
        //     return redirect('/projectlist')
        // }
        // if (address) {
        //     log()
        // } else {
        //     redirect('/signup')
        // }
    }

    const accc = () => {
        getCurrentWalletConnected()
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
                        {/* <li className="nav-item">
                            <Link className="nav-link" onClick={currentLocation}><i className="fa-solid fa-location-pin"></i></Link>
                        </li> */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/">Explore</Link>
                        </li>
                        {/* {log !== null && ( */}
                        <li className="nav-item">
                            {address ? (

                                <a href="/create" className="nav-link">Create</a>
                            ) : (
                                <a onClick={WalletHandler} className="nav-link">Create</a>
                            )}
                        </li>
                        {/* )} */}
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
                    {address && localStorage.getItem('auth_token') ? (
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
                                <a className="creator-button btn ml-md-auto btn-bordered-white" onClick={WalletHandler}><i className="fa fa-user" />
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











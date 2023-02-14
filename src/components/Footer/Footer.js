import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { getFooter } from '../../redux/Actions/footerAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { ConnectWallet, getCurrentWalletConnected, Roles } from '../Wallet/interact';
import Swal from 'sweetalert2';

const Footer = () => {

    const dispatch = useDispatch()

    const footer = useSelector(state => {
        return state.footer
    })

    useEffect(() => {
        dispatch(getFooter())
    }, [])
    // console.log(footer, 'footer')
    const userRole = useSelector(state => {
        return state.user.userdetail.role
    })
    // console.log(userRole)
    const userToken = useSelector(state => {
        return state.user.userToken
    })

    const history = useHistory()
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
        else if (!userToken) {
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


        <footer className="footer-area">
            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Logo */}
                                <a className="navbar-brand" href="/">
                                    <img src="/img/logo.png" alt="" />
                                </a>
                                <p>Mint NFTs that are based on real-life projects or events related to important causes.</p>
                                {/* Social Icons */}

                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">Useful Links</h4>
                                <ul>
                                    <li className="nav-item">
                                        <a onClick={() => handleCreate()} className="">Create Project</a>
                                    </li>
                                    {/* <li><Link to="/create" onClick={handleCreate}>Create Project</Link></li> */}
                                    <li><Link to={`/all/${"LatestProjects"}`}>Explore NFTs</Link></li>
                                    <li><Link to="/terms&conditions">Terms of Service</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">Community</h4>
                                <ul>
                                    <li><a target="_blank" href="https://www.canopycrypto.io/our-team/">About Us</a></li>
                                    {/* <li><Link to='/https://www.canopycrypto.io/our-team/'>About Us</Link></li> */}
                                    <li><Link to='/contact'>Get Support</Link></li>
                                    <li><Link to='/rewards'>Rewards</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Copyright Area */}
                            <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                {/* Copyright Left */}

                                <div className="copyright-left">© 2023 Copyright Karmatica.</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;
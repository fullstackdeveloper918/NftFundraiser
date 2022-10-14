import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { getFooter } from '../../redux/Actions/footerAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const Footer = () => {

    const dispatch = useDispatch()

    const footer = useSelector(state => {
        return state.footer
    })

    useEffect(() => {
        dispatch(getFooter())
    }, [])
    console.log(footer, 'footer')
    return (
        //         <footer className="footer-area">
        //             {/* Footer Top */}
        //             <div className="footer-top">
        //                 <div className="container">
        //                     <div className="row">
        //                         <div className="col-12 col-sm-12 col-lg-12 res-margin">
        //                             {/* Footer Items */}
        //                             <div className="footer-items">
        //                                 {/* Logo */}


        //                                 <h3><Link to='/terms&conditions' style={{ color: '#fff ' }}>{footer?.footer?.title}</Link></h3>





        //                             </div>
        //                         </div>




        //                     </div>
        //                 </div>
        //             </div>
        //             {/* Footer Bottom */}

        //         </footer>
        //     );
        // }

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
                                    <li><Link to="/create">Create Project</Link></li>
                                    <li><a href={`/all/${"Latest Projects"}`}>Explore NFTs</a></li>
                                    <li><Link to="/terms&conditions">Terms & Conditions</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">Community</h4>
                                <ul>
                                    <li><Link to='/aboutus'>About Us</Link></li>
                                    <li><Link to='/contact'>Get Support</Link></li>
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
                                <div className="copyright-left">© 2022 Canopy Labs Ltd.</div>
                                {/* Copyright Right */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;
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
        <footer className="footer-area">
            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-12 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Logo */}


                                <h3><Link to='/terms&conditions' style={{ color: '#fff ' }}>{footer?.footer?.title}</Link></h3>





                            </div>
                        </div>




                    </div>
                </div>
            </div>
            {/* Footer Bottom */}

        </footer>
    );
}


export default Footer;
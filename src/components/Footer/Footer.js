import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-2/footer";

const Footer = () => {

    return (
        <footer className="footer-area">
            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-lg-6 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Logo */}


                                <span><h4>Terms & Restrictions</h4></span>
                                <span>No illegal activity.<br />
                                    Nothing fraudulent or misleading.<br />
                                    No controlled substances or related paraphernalia.<br />
                                    No weapons.<br />
                                    Nothing to do with investments, equity contracts, money service businesses, debt collection, or cryptocurrencies.<br />
                                    No gambling.<br />
                                    No promoting hate, violence, harassment, discrimination, terrorism, or intolerance.<br />
                                    No dealing with entities under Canada or US sanctions.<br />

                                </span>
                                {/* Social Icons */}

                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-lg-6 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                <span>No human trafficking/ransom/exploitation.<br />
                                    No porn.<br />
                                    No “offensive, graphic, perverse or sensitive content”.<br />
                                    Nothing in defence of or in support of anyone alleged to be involved in criminal activity.<br />
                                    No offering monetary rewards/gift cards.<br />
                                    No transactions for the sale of items before the seller has control or possession of the item.<br />
                                    No collection of payments on behalf of merchants.<br />
                                    No credit repair or debt settlement services.<br /></span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}

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
                                <div className="copyright-left">©2021 NetStorm, All Rights Reserved.</div>
                                {/* Copyright Right */}
                                <div className="copyright-right">Made with <i className="fas fa-heart" /> By <a href="#">Themeland</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
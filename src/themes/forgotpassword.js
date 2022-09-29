import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import LoginSection from '../components/Login/Login';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import ForgotPassword from '../components/ForgotPassword/forgotPassword';

const Forgot = () => {
    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Forgot Password" subpage="Pages" page="ForgotPassword" />
            <ForgotPassword />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default Forgot

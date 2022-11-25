import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import SignupSection from '../components/Signup';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import TermsConditions from '../components/Footer/t&c';


const TermsCond = () => {
    return (
        <div className="main">
            <Header />
            <TermsConditions />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />

        </div>
    )
}

export default TermsCond

import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import EditProject from '../Edit/editProject';
import ExploreAll from '../components/Explore/viewAllLatest';
import { Breadcrumb } from 'react-bootstrap';

const All = () => {

    return (
        <div className="main">
            <Header />
            {/* <Breadcrumb title="Explore" subpage="Explore" page="Explore Style 4" /> */}
            <ExploreAll type="Latest Projects" />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );

}

export default All;
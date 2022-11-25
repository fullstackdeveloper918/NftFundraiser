import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ProjectList';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import GetAllProjects from '../components/Explore/ProjectList';
import ProjDetails from '../components/Create/projdetails';
import ProjNftDetails from '../components/Create/projdetails';

const ProjNft = () => {
    return (
        <div className="main">
            <Header />
            {/* <Breadcrumb title="Projects" subpage="Explore" page="" /> */}
            <ProjNftDetails />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default ProjNft;
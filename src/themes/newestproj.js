import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ProjectList';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import GetAllProjects from '../components/Explore/ProjectList';
import LiveAuctions from '../components/Auctions/AuctionsTwo';

const NewestProj = () => {
    return (
        <div className="main">
            <Header />
            {/* <Breadcrumb title="Projects" subpage="Explore" page="" /> */}
            <LiveAuctions />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default NewestProj;
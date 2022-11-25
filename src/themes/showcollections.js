import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ExploreFive';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import LatestProject from '../components/Explore/LatestProjects';
import AuctionsOne from '../components/Auctions/AuctionsOne';
import ShowCollections from '../components/Create/showCollections';

const Showcollections = () => {
    return (
        <div className="main">
            <Header />
            {/* <Breadcrumb title="Explore" subpage="Explore" page="Explore Style 4" /> */}
            <ShowCollections />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default Showcollections;
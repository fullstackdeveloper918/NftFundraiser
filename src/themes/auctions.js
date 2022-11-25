import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import LiveAuctions from '../components/Auctions/AuctionsTwo';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import ExploreFour from './latestProjects';
import LatestProject from '../components/Explore/LatestProjects';

const Auctions = () => {

    return (
        <div className="main">
            <Header />
            <LatestProject />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}


export default Auctions;
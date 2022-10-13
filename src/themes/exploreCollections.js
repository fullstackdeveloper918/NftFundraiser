import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ItemDetail from '../components/ItemDetails/ItemDetails';
import LiveAuctions from '../components/Auctions/AuctionsTwo';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import AllCollections from '../components/Collections/exploreCollection';

const ColExplore = () => {

    return (
        <div className="main">
            <Header />
            {/* <Breadcrumb title="Explore" subpage="Explore" page="Explore Style 4" /> */}
            <AllCollections />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );

}

export default ColExplore;
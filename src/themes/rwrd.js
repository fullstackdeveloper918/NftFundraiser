import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ProjectList';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import NftDetails from '../components/ItemDetails/nftDetails';
import Rewards from '../components/Footer/reward';

const NftReward = () => {
    return (
        <div className="main">
            <Header />
            {/* <Breadcrumb title="Projects" subpage="Explore" page="" /> */}
            <Rewards />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default NftReward;
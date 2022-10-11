import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Auctions from '../components/Auctions/AuctionsOne';
import TopSeller from '../components/TopSeller/TopSellerOne';
import Collections from '../components/Collections/Collections';
import Explore from '../components/Explore/ExploreOne';
import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import ExploreFour from './latestProjects';


const Home = () => {
    return (
        <div className="main">
            <Header />
            <Hero />

            <Auctions type={"Latest Projects"} />
            {/* <Auctions type={"Top Fundraisers"} /> */}
            <Auctions type={"Recent Campaigns"} />

            {/* <Auctions type={"Popular Connections"} /> */}
            <TopSeller />
            <Collections />
            {/* <Explore /> */}
            <Work />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    )
}

export default Home;
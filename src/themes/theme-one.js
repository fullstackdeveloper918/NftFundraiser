import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Auctions from '../components/Auctions/AuctionsOne';
import TopSeller from '../components/TopSeller/topfundraiser';
import Collections from '../components/Collections/Collections';
import Explore from '../components/Explore/ExploreOne';
import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Fundraiser from '../components/TopSeller/topfundraiser';


const Home = () => {
    return (
        <div className="main">
            <Header />
            <Hero />
            <Auctions key="latestProjects" type={"LatestProjects"} />
            {/* <Auctions type={"Top Fundraisers"} /> */}
            <Auctions key="recentCampaigns" type={"RecentCampaigns"} />
            {/* <Auctions type={"Popular Connections"} /> */}
            <Fundraiser />
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
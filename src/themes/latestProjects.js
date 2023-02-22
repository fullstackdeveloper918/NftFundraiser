import { React } from 'react';

import Header from '../components/Header/Header';


import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import AuctionsOne from '../components/Auctions/AuctionsOne';

const LatestProjects = () => {
    return (
        <div className="main">
            <Header />

            <AuctionsOne type="LatestProjects" />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default LatestProjects;
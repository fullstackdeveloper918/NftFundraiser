import { React } from 'react';

import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import LatprojNftDetails from '../components/Auctions/nftBuy';

const latnftprojDetails = () => {

    return (
        <div className="main">
            <Header />
            <LatprojNftDetails />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}


export default latnftprojDetails;
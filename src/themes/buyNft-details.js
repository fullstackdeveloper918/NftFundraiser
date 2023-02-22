import { React } from 'react';

import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import BuyedNftDetails from '../components/Explore/NftBuyedDetails';
const BuyNftDetail = () => {

    return (
        <div className="main main-fund-detail">

            <Header />
            <BuyedNftDetails />

            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}


export default BuyNftDetail;
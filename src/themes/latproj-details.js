import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ItemDetail from '../components/ItemDetails/ItemDetails';
import LiveAuctions from '../components/Auctions/AuctionsTwo';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import ProjDetails from '../components/ItemDetails/viewProdetails';
import ProjNFTS from '../components/Auctions/projectnfts';

class latprojDetails extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <ProjDetails />
                {/* <ProjNFTS /> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default latprojDetails;
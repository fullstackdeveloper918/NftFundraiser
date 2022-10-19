import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ItemDetail from '../components/ItemDetails/ItemDetails';
import LiveAuctions from '../components/Auctions/AuctionsTwo';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import CollectionDetails from '../components/Create/collectionDetail';
import CollBreadCrumb from '../components/Create/bread-crumb';
import Author from './author';

class CollectionDetail extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                {/* <CollBreadCrumb /> */}
                <CollectionDetails />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default CollectionDetail;
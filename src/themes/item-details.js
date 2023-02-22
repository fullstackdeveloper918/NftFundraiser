import { React } from 'react';
import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import CollectionDetails from '../components/Explore/popularDetails';

const ItemDetails = () => {

    return (
        <div className="main">
            <Header />
            <CollectionDetails />

            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}


export default ItemDetails;
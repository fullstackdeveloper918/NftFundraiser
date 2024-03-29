import { React } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import ShowCollections from '../components/Create/showCollections';

const Showcollections = () => {
    return (
        <div className="main">
            <Header />
            <ShowCollections />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default Showcollections;
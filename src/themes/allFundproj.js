import { React } from 'react';

import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import GetAllFundraise from '../components/Explore/fundraiserProjects';

const AllFundraiser = () => {
    return (
        <div className="main">
            <Header />

            <GetAllFundraise />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default AllFundraiser;
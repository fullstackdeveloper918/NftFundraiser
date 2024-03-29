import { React } from 'react';

import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import MyFundraiserDetail from '../components/Explore/my_fundraise';

const FundraiserProjects = () => {
    return (
        <div className="main">
            <Header />

            <MyFundraiserDetail />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default FundraiserProjects;
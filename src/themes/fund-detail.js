import { React } from 'react';

import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import FundraiserDetail from '../components/TopSeller/fundraiserDetails';
import Fundraiser from '../components/TopSeller/topfundraiser';

const FundDetail = () => {

    return (
        <div className="main main-fund-detail">

            <Header />
            <FundraiserDetail />
            <Fundraiser />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}


export default FundDetail;
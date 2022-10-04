import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ExploreThree';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import ReadProject from '../components/Explore/ExploreThree';

class ExploreTwo extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                {/* <Breadcrumb title="Projects" subpage="Explore" page="" /> */}
                <ReadProject />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreTwo;
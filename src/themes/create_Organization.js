import React from 'react'

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import CreateOrganizationSection from '../components/Signup/createOrganization';

export const createOrganization = () => {
    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Create Organization" subpage="Pages" page="createOrganization" />
            <CreateOrganizationSection />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    )
}

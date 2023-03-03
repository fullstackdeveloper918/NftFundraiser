import { React } from 'react';

import Header from '../components/Header/Header';

import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import RoleChangeOrganizationdetails from '../components/Signup/roleChangeOrginazationdetails';

export const createOrganizationafterRoleChange = () => {
    return (
        <div className="main">
            <Header />

            <RoleChangeOrganizationdetails />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    )
}

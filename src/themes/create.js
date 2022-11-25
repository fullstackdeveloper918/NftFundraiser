import React, { Component, useEffect } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Creates from '../components/Create/Create';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import { isLogin } from '../routers/utils';
import { useHistory } from "react-router-dom";
import UploadNftIndex from '../components/Create';

const Create = () => {
  const history = useHistory();

  useEffect(() => {
    if (!isLogin()) {
      history.push('/login')
    }
  }, [])

  return (
    <div className="main">
      <Header />
      <UploadNftIndex />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );

}

export default Create;
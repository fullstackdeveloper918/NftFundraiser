import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import ProjectForm from "../components/Project/projectForm";
function projectForm() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb />
      <ProjectForm />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
}

export default projectForm;

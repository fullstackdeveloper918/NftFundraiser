import React, { useEffect } from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Auctions from "../components/Auctions/AuctionsOne";
import Collections from "../components/Collections/Collections";
import Work from "../components/Work/Work";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import Fundraiser from "../components/TopSeller/topfundraiser";
import Resell from "../components/Auctions/resellNft";
import { useSelector } from "react-redux";

const Home = () => {
  const fund = useSelector((state) => {
    return state?.fundraiser?.fundraiser;
  });

  return (
    <div className="main">
      <Header />
      <Hero />
      <Auctions key="latestProjects" type={"LatestProjects"} />
      <Resell />
      {fund.length > 0 && <Fundraiser />}
      <Collections />
      <Work />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Home;

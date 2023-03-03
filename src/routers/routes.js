import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
import ExploreTwo from "../themes/project-list";
import ExploreFour from "../themes/latestProjects";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
import Activity from "../themes/activity";
import HelpCenter from "../themes/help-center";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Contact from "../themes/contact";
import Forgot from "../themes/forgotpassword";
import PrivateRoute from "./privateRoutes";
import ProjectUpdate from "../themes/update";
import TermsCond from "../themes/term&cond";
import All from "../themes/viewalllatest";
import ColExplore from "../themes/exploreCollections";
import Aboutus from "../themes/Aboutus";
import latprojDetails from "../themes/latproj-details";
import Showcollections from "../themes/showcollections";
import CollectionDetail from "../themes/collectn-details";
import ProjNft from "../themes/projnft-details";
import Nft from './../themes/nft-list';
import FundDetail from "../themes/fund-detail";
import latnftprojDetails from "../themes/Latnft";
import ScrollToTop from "../ScrollToTop";
import EditNft from "../components/Create/editNft";
import AddNFT from "../themes/addnftTheme";
import AllFundraiser from "../themes/allFundproj";
import AllFundraiserProjects from "../themes/fund-projects";
import FundraiserProjects from "../themes/fundraise";
import NftReward from "../themes/rwrd";
import Notifi from "../themes/allnot";
import BuyedNft from "../themes/buyed-nft";
import BuyNftDetail from "../themes/buyNft-details";
import { createOrganizationafterRoleChange } from "../themes/rolechange-organization";
import ResellDetail from "../themes/resell-details";
import AllResellNft from "../themes/allresellNfts";
import AllReraltrans from "../themes/all-refrals";


const MyRouts = () => {


  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={ThemeOne} />
          <Route exact path="/explore-1" component={ExploreOne} />
          <Route exact path="/projectlist" component={ExploreTwo} />
          <Route exact path="/create/organization" component={createOrganizationafterRoleChange} />
          <Route exact path="/allnotifications" component={Notifi} />
          <Route exact path="/updateproject/:id" component={ProjectUpdate} />
          {/* <Route exact path="/projectlist" component={ExploreThree} /> */}
          <Route exact path="/explore-4" component={ExploreFour} />
          <Route exact path="/nft/resell/details/:slug" component={ResellDetail} />
          <Route exact path="/my/nfts" component={BuyedNft} />
          <Route exact path="/my/nfts-detail/:slug" component={BuyNftDetail} />
          <Route exact path="/rewards" component={NftReward} />
          <Route exact path="/auctions" component={Auctions} />
          <Route exact path="/popularcollection/details/:slug" component={ItemDetails} />
          <Route exact path="/projects/:slug" component={latprojDetails} />
          <Route exact path="/referals-detail" component={AllReraltrans} />
          <Route exact path="/nftprojdetails/:slug" component={latnftprojDetails} />
          <Route exact path="/fundraiser/detail/:user_id" component={FundDetail} />
          <Route exact path="/myfundraiser/detail/:user_id" component={FundraiserProjects} />
          <Route exact path="/projnftdetails/:slug" component={ProjNft} />
          <Route exact path="/allfundraise" component={AllFundraiser} />
          <Route exact path="/all/fundraise/projects/:user_id" component={AllFundraiserProjects} />
          <Route exact path="/nft/details/:id" component={Nft} />
          <Route exact path="/nftedit/:id/:id" component={EditNft} />
          <Route exact path="/addnft/:id" component={AddNFT} />
          <Route exact path="/activity" component={Activity} />
          <Route exact path="/help-center" component={HelpCenter} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/profile" component={Author} />
          <Route exact path="/terms&conditions" component={TermsCond} />
          <Route exact path="/all/:type" component={All} />
          <Route exact path="/all/resll/nfts" component={AllResellNft} />
          <Route exact path="/aboutus" component={Aboutus} />
          <Route exact path="/allcollections" component={ColExplore} />
          <Route exact path="/wallet-connect" component={WalletConnect} />
          <Route exact path="/my-collections" component={Showcollections} />
          <Route exact path="/collection/:id" component={CollectionDetail} />
          {/* <Route exact path="/newest-projects" component={NewestProj} /> */}

          <Route exact path="/create" component={Create} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/* <PrivateRoute exact path="/create-organization" component={createOrganization} /> */}
          <PrivateRoute exact path="/forgotpassword" component={Forgot} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default MyRouts

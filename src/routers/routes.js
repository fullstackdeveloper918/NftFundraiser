import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
import ExploreTwo from "../themes/project-list";
import ReadProject from "../components/Explore/ProjectList";
import ExploreFour from "../themes/latestProjects";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
import Activity from "../themes/activity";
import Blog from "../themes/blog";
import BlogSingle from "../themes/blog-single";
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
import LiveAuctions from "../components/Auctions/AuctionsTwo";
import NewestProj from "../themes/newestproj";
import latprojDetails from "../themes/latproj-details";

const MyRouts = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ThemeOne} />
          <Route exact path="/explore-1" component={ExploreOne} />
          <Route exact path="/projectlist" component={ExploreTwo} />
          <Route exact path="/updateproject/:id" component={ProjectUpdate} />
          {/* <Route exact path="/projectlist" component={ExploreThree} /> */}
          <Route exact path="/explore-4" component={ExploreFour} />
          <Route exact path="/auctions" component={Auctions} />
          <Route exact path="/item-details/:id" component={ItemDetails} />
          <Route exact path="/proj-details/:id" component={latprojDetails} />
          <Route exact path="/activity" component={Activity} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog-single" component={BlogSingle} />
          <Route exact path="/help-center" component={HelpCenter} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/author" component={Author} />
          <Route exact path="/terms&conditions" component={TermsCond} />
          <Route exact path="/all/:type" component={All} />
          <Route exact path="/aboutus" component={Aboutus} />
          <Route exact path="/allcollections" component={ColExplore} />
          <Route exact path="/wallet-connect" component={WalletConnect} />
          {/* <Route exact path="/newest-projects" component={NewestProj} /> */}
          <Route exact path="/create" component={Create} />
          <PrivateRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/signup" component={Signup} />
          {/* <PrivateRoute exact path="/create-organization" component={createOrganization} /> */}
          <PrivateRoute exact path="/forgotpassword" component={Forgot} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default MyRouts

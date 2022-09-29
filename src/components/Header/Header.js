import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header">
      {/* Navbar */}
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar navbar-expand"
      >
        <div className="container header">
          {/* Navbar Brand*/}
          <a className="navbar-brand" href="/">
            <img
              className="navbar-brand-sticky"
              src="img/logo.png"
              alt="sticky brand-logo"
            />
          </a>
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className="navbar-nav items mx-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">
                Explore <i className="fas fa-angle-down ml-1" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <Link to="/explore-1" className="nav-link">
                    Explore Style 1
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/explore-2" className="nav-link">
                    Explore Style 2
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/explore-3" className="nav-link">
                    Explore Style 3
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/explore-4" className="nav-link">
                    Explore Style 4
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auctions" className="nav-link">
                    Live Auctions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/item-details" className="nav-link">
                    Item Details
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/activity" className="nav-link">
                Activity
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">
                Community <i className="fas fa-angle-down ml-1" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <Link to="/blog" className="nav-link">
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/blog-single" className="nav-link">
                    Blog Single
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/help-center" className="nav-link">
                    Help Center
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">
                Pages <i className="fas fa-angle-down ml-1" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <Link to="/authors" className="nav-link">
                    Authors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/author" className="nav-link">
                    Author
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/wallet-connect" className="nav-link">
                    Wallet Connect
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create" className="nav-link">
                    Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
          {/* Navbar Icons */}
          <ul className="navbar-nav icons">
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#search"
              >
                <i className="fas fa-search" />
              </Link>
            </li>
          </ul>
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#menu"
              >
                <i className="fas fa-bars toggle-icon m-0" />
              </Link>
            </li>
          </ul>
          {/* Navbar Action Button */}
          <ul className="navbar-nav action">
            <li className="nav-item ml-3">
              <Link to="/signup" className="btn ml-md-auto btn-bordered-white">
                <i class="fa fa-user" />
                CREATOR
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav action">
            <li className="nav-item ml-3">
              <Link
                to="/wallet-connect"
                className="btn ml-lg-auto btn-bordered-white"
              >
                <i className="icon-wallet mr-md-2" />
                Wallet Connect
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

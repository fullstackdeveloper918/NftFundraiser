import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/Slices/authSlice';

const Header = () => {
    const dispatch = useDispatch()

    const LogoutHandler = () => {
        dispatch(logoutSuccess())
    }

    const log = useSelector(state => {
        return state.user.userToken
    })

    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <a className="navbar-brand" href="/">
                        <img className="navbar-brand-sticky" src="/img/karmatica.png" alt="karmatica" />
                    </a>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    {/* <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <Link to='/' className="nav-link">Home</Link>
                        </li> */}
                    {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Explore <i className="fas fa-angle-down ml-1" /></a> */}
                    {/* <ul className="dropdown-menu">
                                <li className="nav-item"><Link to="/auctions" className="nav-link">Newest Projects</Link></li>
                            </ul> */}
                    {/* </li> */}
                    {/* <li className="nav-item">
                            <Link to="/activity" className="nav-link">Activity</Link>
                        </li> */}
                    {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><Link to="/blog" className="nav-link">Blog</Link></li>
                                <li className="nav-item"><Link to="/blog-single" className="nav-link">Blog Single</Link></li>
                                <li className="nav-item"><Link to="/help-center" className="nav-link">Help Center</Link></li>
                            </ul>
                        </li> */}
                    {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><Link to="/authors" className="nav-link">Authors</Link></li>
                                <li className="nav-item"><Link to="/author" className="nav-link">Author</Link></li>
                                <li className="nav-item"><Link to="/wallet-connect" className="nav-link">Wallet Connect</Link></li>
                                <li className="nav-item"><Link to="/create" className="nav-link">Create</Link></li>
                                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                                <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
                            </ul>
                        </li> */}
                    {/* <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li> */}
                    {/* </ul> */}
                    {/* Navbar Icons */}
                    {/* <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <Link to="#" className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="fas fa-search" />
                            </Link>
                        </li>
                    </ul> */}
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <Link to="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </Link>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    {log !== null ? (

                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-solid fa-user"></i>
                            </button>
                            <ul class="creator-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><button type='button' class="dropdown-item"><a href='/author'>Profile</a></button></li>
                                <li><button type='button' class="dropdown-item"><a href='/projectlist'>My Projects</a></button></li>
                                <li><button type='button' class="dropdown-item" onClick={LogoutHandler}><a href='/'>Logout</a></button></li>
                            </ul>
                        </div>
                    ) : (
                        <><ul className="navbar-nav action">
                            <li className="nav-item ml-3">
                                <Link to="/signup" className="creator-button btn ml-md-auto btn-bordered-white">
                                    <i className="fa fa-user" />
                                    <div>CREATOR</div>
                                </Link>
                            </li>
                        </ul><ul className="navbar-nav action">
                                <li className="nav-item ml-3">
                                    <Link to="/wallet-connect" className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />Wallet Connect</Link>
                                </li>
                            </ul></>
                    )}
                    {/* {!user?.status === 200 && ( */}
                    {/* )} */}
                </div>
            </nav>
        </header >
    );
};

export default Header;
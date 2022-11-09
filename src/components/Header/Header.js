import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetUserAction } from '../../redux/Actions/authAction';
import { getPublicLiveProjects } from '../../redux/Actions/projectAction';
import { logoutSuccess } from '../../redux/Slices/authSlice';
import { ConnectWallet, getCurrentWalletConnected } from '../Wallet/interact';

const Header = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState()

    const add1 = address?.slice(0, 4).toUpperCase()
    const add2 = address?.slice(35, 44).toUpperCase()
    // console.log(add2)
    // console.log(add1)
    console.log(address, 'address')
    const LogoutHandler = () => {
        dispatch(logoutSuccess())
    }
    // useEffect(() => {

    // }, [])




    const log = useSelector(state => {
        return state.user.userToken
    })

    function getSelectedAddress() {
        return window.ethereum?.selectedAddress;
    }
    const WalletHandler = () => {

        ConnectWallet()

    }
    // const [data, setData] = useState('')
    // console.log('dataaa', data)
    useEffect(() => {
        dispatch(GetUserAction())
        getCurrentWalletConnected()
        setAddress(getSelectedAddress)

    }, [dispatch])
    const userdet = useSelector(state => {
        // debugger 

        return state?.user?.userdetail
    })
    console.log(userdet, 'user')
    const accc = () => {
        getCurrentWalletConnected()
    }

    // const address = JSON.parse(localStorage.getItem('addressArray'))

    // const add = JSON.stringify(address, null).substring(2, 6)
    // const add1 = JSON.stringify(address, null).substring(38, 44)
    // const ad = address.slice(4, 15)
    // address?.split("")
    // const walladdress = address?.split("", 3)
    // console.log(ad, 'addddtss')
    // const [items, setItems] = useState([]);
    // console.log('item', items)

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('addressArray'));
    //     // const splititems = items.split("")
    //     if (items) {
    //         setItems(items);
    //     }
    // }, []);
    return (
        // <header id="header">
        //     {/* Navbar */}
        //     <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
        //         <div className="container header">
        //             {/* Navbar Brand*/}
        //             <a className="navbar-brand" href="/">
        //                 <img className="navbar-brand-sticky" src="/img/karmatica.png" alt="karmatica" />
        //             </a>
        //             <div className="ml-auto" />
        //             {/* Navbar */}
        //             <ul className="navbar-nav items mx-auto">
        //                 <li className="nav-item dropdown">
        //                     <li className="nav-item"><Link to="/auctions" className="nav-link">Newest Projects</Link></li>
        //                 </li>
        //             </ul>
        //             <li className="nav-item dropdown">
        //                 <a className="nav-link" href="#">Explore <i className="fas fa-angle-down ml-1" /></a>
        //                 <ul className="dropdown-menu">
        //                     <li className="nav-item"><Link to="/auctions" className="nav-link">Newest Projects</Link></li>
        //                 </ul>
        //             </li>
        //             {/* <li className="nav-item">
        //                     <Link to="/activity" className="nav-link">Activity</Link>
        //                 </li> */}
        //             {/* <li className="nav-item dropdown">
        //                     <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
        //                     <ul className="dropdown-menu">
        //                         <li className="nav-item"><Link to="/blog" className="nav-link">Blog</Link></li>
        //                         <li className="nav-item"><Link to="/blog-single" className="nav-link">Blog Single</Link></li>
        //                         <li className="nav-item"><Link to="/help-center" className="nav-link">Help Center</Link></li>
        //                     </ul>
        //                 </li> */}
        //             {/* <li className="nav-item dropdown">
        //                     <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
        //                     <ul className="dropdown-menu">
        //                         <li className="nav-item"><Link to="/authors" className="nav-link">Authors</Link></li>
        //                         <li className="nav-item"><Link to="/author" className="nav-link">Author</Link></li>
        //                         <li className="nav-item"><Link to="/wallet-connect" className="nav-link">Wallet Connect</Link></li>
        //                         <li className="nav-item"><Link to="/create" className="nav-link">Create</Link></li>
        //                         <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
        //                         <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
        //                     </ul>
        //                 </li> */}
        //             {/* <li className="nav-item">
        //                     <Link to="/contact" className="nav-link">Contact</Link>
        //                 </li> */}
        //             {/* </ul> */}
        //             {/* Navbar Icons */}
        //             {/* <ul className="navbar-nav icons">
        //                 <li className="nav-item">
        //                     <Link to="#" className="nav-link" data-toggle="modal" data-target="#search">
        //                         <i className="fas fa-search" />
        //                     </Link>
        //                 </li>
        //             </ul> */}
        //             {/* Navbar Toggler */}
        //             <ul className="navbar-nav toggle">
        //                 <li className="nav-item">
        //                     <Link to="#" className="nav-link" data-toggle="modal" data-target="#menu">
        //                         <i className="fas fa-bars toggle-icon m-0" />
        //                     </Link>
        //                 </li>
        //             </ul>
        //             {/* Navbar Action Button */}
        //             {log !== null ? (

        //                 <div className="dropdown">
        //                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        //                         <i className="fa fa-solid fa-user"></i>
        //                     </button>
        //                     <ul class="creator-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton1">
        //                         <li><button type='button' class="dropdown-item"><a href='/author'>Profile</a></button></li>
        //                         <li><button type='button' class="dropdown-item"><a href='/projectlist'>My Projects</a></button></li>
        //                         <li><button type='button' class="dropdown-item" onClick={LogoutHandler}><a href='/'>Logout</a></button></li>
        //                     </ul>
        //                 </div>
        //             ) : (
        //                 <><ul className="navbar-nav action">
        //                     <li className="nav-item ml-3">
        //                         <Link to="/signup" className="creator-button btn ml-md-auto btn-bordered-white">
        //                             <i className="fa fa-user" />
        //                             <div>CREATOR</div>
        //                         </Link>
        //                     </li>
        //                 </ul><ul className="navbar-nav action">
        //                         <li className="nav-item ml-3">
        //                             <Link to="/wallet-connect" className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />Wallet Connect</Link>
        //                         </li>
        //                     </ul></>
        //             )}
        //             {/* {!user?.status === 200 && ( */}
        //             {/* )} */}
        //         </div>
        //     </nav>
        // </header >
        //     );
        // }
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <Link to="/" className="navbar-brand">
                        <img className="navbar-brand-sticky" src="/img/karmatica.png" alt="karmatica" />
                    </Link>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <Link to className="nav-link" href="/">Explore</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Explore <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/explore-1" className="nav-link">Explore Style 1</a></li>
                                <li className="nav-item"><a href="/explore-2" className="nav-link">Explore Style 2</a></li>
                                <li className="nav-item"><a href="/explore-3" className="nav-link">Explore Style 3</a></li>
                                <li className="nav-item"><a href="/explore-4" className="nav-link">Explore Style 4</a></li>
                                <li className="nav-item"><a href="/auctions" className="nav-link">Live Auctions</a></li>
                                <li className="nav-item"><a href="/item-details" className="nav-link">Item Details</a></li>
                            </ul>
                        </li> */}
                        {log !== null && (

                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Create</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link to={`/all/${"LatestProjects"}`} className="nav-link">Newest Projects</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                                <li className="nav-item"><a href="/blog-single" className="nav-link">Blog Single</a></li>
                                <li className="nav-item"><a href="/help-center" className="nav-link">Help Center</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/authors" className="nav-link">Authors</a></li>
                                <li className="nav-item"><a href="/author" className="nav-link">Author</a></li>
                                <li className="nav-item"><a href="/wallet-connect" className="nav-link">Wallet Connect</a></li>
                                <li className="nav-item"><a href="/create" className="nav-link">Create</a></li>
                                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                                <li className="nav-item"><a href="/signup" className="nav-link">Signup</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item">
                            <a href="/contact" className="nav-link">Contact</a>
                        </li> */}
                    </ul>
                    {/* Navbar Icons */}
                    {/* <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="fas fa-search" />
                            </a>
                        </li>
                    </ul> */}
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        {address &&

                            <li className="nav-item ml-3">
                                <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />{add1}...{add2}</a>
                            </li>
                        }
                        {!address &&

                            <li className="nav-item ml-3">
                                <a className="btn ml-lg-auto btn-bordered-white" onClick={WalletHandler} style={{ color: '#f8f9fa' }}><i className="icon-wallet mr-md-2" />CONNECT WALLET</a>
                            </li>
                        }

                    </ul>
                    {log !== null ? (
                        <>

                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-solid fa-user"></i>
                                </button>
                                <ul class="creator-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ left: '-37%' }}>
                                    <li>{userdet?.username}</li>
                                    <li>{userdet?.email}</li>
                                    <li><button type='button' class="dropdown-item"><a href='/author'>Profile</a></button></li>
                                    <li><button type='button' class="dropdown-item"><a href='/projectlist'>My Projects</a></button></li>
                                    <li><button type='button' class="dropdown-item" onClick={LogoutHandler}><a href='/'>Logout</a></button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <ul className="navbar-nav action">
                            <li className="nav-item ml-3">
                                <Link to="/signup" className="creator-button btn ml-md-auto btn-bordered-white">
                                    <i className="fa fa-user" />
                                    <div>CREATOR</div>
                                </Link>
                            </li>
                        </ul>
                    )}


                </div>
            </nav>
        </header>
    )
}
export default Header;
import React, { Component } from 'react';
import { logoutSuccess } from '../../redux/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const ModalSearch = () => {
    const dispatch = useDispatch()
    const LogoutHandler = () => {
        dispatch(logoutSuccess())
    }
    return (
        <div id="search" className="modal fade p-0">
            <div className="modal-dialog dialog-animated">

                <div className="modal-content h-100">
                    <div className="modal-header" data-dismiss="modal">
                        {/* {this.state.data.menuName} <i className={this.state.data.menuIcon} /> */}
                    </div>
                    <div className="modal-body">
                        <form className="row">
                            <div className="col-12 align-self-center">
                                <div className="row">
                                    <div className="col-12 pb-3">
                                        <Link to='/author'>Profile</Link>
                                        <Link to='/projectlist'>My Projects</Link>
                                        {/* <button type='button' class="dropdown-item"><a href='/author'>Profile</a></button>
                <button type='button' class="dropdown-item"><a href='/projectlist'>My Projects</a></button> */}
                                        <button type='button' class="dropdown-item" onClick={LogoutHandler}><a href='/'>Logout</a></button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 input-group mt-4">
                                        <input type="text" placeholder="Enter your keywords" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 input-group align-self-center">
                                        {/* <button className="btn btn-bordered-white mt-3">{this.state.data.btnText}</button> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ModalSearch;
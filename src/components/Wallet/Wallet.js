import React from 'react';
import { useHistory } from 'react-router-dom'
import { ConnectWallet, Roles } from './interact';
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/Slices/authSlice';

const data = {
    "preHeading": "Wallet Connect",
    "heading": "Connect your Wallet",
    "content": "Connect your wallet to continue browsing our website",
    "walletData": [
        {
            "id": 1,
            "img": "/img/metamask.png",
            "title": "MetaMask",
            "content": "A browser extension with great flexibility. The web's most popular wallet"
        },
    ]
}

const Wallet = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleConnect = async () => {
        const res = await ConnectWallet("CREATOR")

        if (res?.res?.response?.status === 401) {
           history.push('/signup')
        }
        else {
          dispatch(loginSuccess(res?.res))
          localStorage.setItem('authToken',res?.res?.data?.data?.auth_token)
          history.push('/projectlist')
        }
    }

    return (
        <section className="wallet-connect-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center my-4">
                            {/* <span>{data.preHeading}</span> */}
                            <h3 className="mt-3 mb-0">{data.heading}</h3>
                            <p>{data.content}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center items">
                    {data?.walletData?.map((item, idx) => {
                        return (
                            <div key={`wd_${idx}`} onClick={handleConnect}
                                className="col-12 col-md-6 col-lg-4 item">
                                {/* Single Wallet */}
                                <div className="card single-wallet">
                                    <a className="d-block text-center">
                                        <img className="avatar-lg" src={item.img} alt="" />
                                        <h4 className="mb-0">{item.title}</h4>
                                        <p>{item.content}</p>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );

}

export default Wallet;
import React, { Component } from 'react';
import axios from 'axios';

const data = {
    preHeading: "How It Works",
    heading: "Create and sell your NFTs",
    workData: [
        {
            "id": 1,
            "icon": "icons icon-wallet text-effect",
            "title": "Setup your wallet",
            "text": "Click Connect Wallet in the top right corner to login and get started."
        },
        {
            "id": 2,
            "icon": "icons icon-grid text-effect",
            "title": "Create your collection",
            "text": "Click Creator and set up your organization profile, description, fundraising goal and more."
        },
        {
            "id": 3,
            "icon": "icons icon-drawer text-effect",
            "title": "Add your NFTs",
            "text": "Upload your project art or images and description."
        },
        {
            "id": 4,
            "icon": "icons icon-bag text-effect",
            "title": "List them for sale",
            "text": "Choose how you want to price and sell your NFTs!"
        }
    ]
}

const Work = () => {


    return (
        <section className="work-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro mb-4">
                            <div className="intro-content">
                                <span>{data.preHeading}</span>
                                <h3 className="mt-3 mb-0">{data.heading}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {data?.workData?.map((item, idx) => {
                        return (
                            <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                {/* Single Work */}
                                <div className="single-work">
                                    <i className={item.icon} />
                                    <h4>{item.title}</h4>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


export default Work;
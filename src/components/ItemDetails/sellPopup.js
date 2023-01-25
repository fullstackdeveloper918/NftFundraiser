import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction, UpdateProject } from '../../redux/Actions/projectAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import JoditEditor from 'jodit-react';
import { useParams } from 'react-router';
import Web3 from 'web3';
import React from 'react';
import { CityList, StateList } from '../../redux/Actions/authAction';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NFTContract from '../../backend/contracts/artWork.sol/NFTContract.json'
import { CreateMetaDataAndMint } from '../Wallet/interact';
import NftPopup from './nftPopup';
const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// console.log(NFTContract.abi,"abi")
const web3 = createAlchemyWeb3(alchemyKey);
const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/ZjIVunDzH2DkgiNzLSHe-c04fp9ShA6B");

function SellPopup(props) {
    const [current, setCurrent] = React.useState(0)
    const dispatch = useDispatch()
    const slug = useParams()
    const [modalShow, setModalShow] = React.useState(false);
    const [auctiontype, setAuctionType] = useState("1")
    console.log(auctiontype, 'auctiontype')

    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});

    const OnSubmit = (data) => {
        debugger
        console.log(data, 'dtaaa')
    }

    const nftdetail = useSelector(state => {
        return state.projectdetails.nftlist
    })

    const mint = (contractAddress) => {
        CreateMetaDataAndMint({
            _name: nftdetail.title,
            _des: nftdetail.description,
            _imgBuffer: nftdetail.image,
            contractAddress,
            setCurrent,
            collid: nftdetail?.collection_id,
            nft_file_content: nftdetail?.nft_file_content,
            slug,
            setModalShow
        })
    }

    const deployContract = async () => {

        try {
            if (nftdetail?.collectionData?.contract_id == null) {

                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex('80001') }],
                })

                // const { address } = await ConnectWallet()
                const address = window?.ethereum?.selectedAddress
                const MyNFTContract = new web3.eth.Contract(NFTContract.abi)
                const gas = await web3.eth.getGasPrice();
                // const gas = 500000

                MyNFTContract.deploy({
                    data: NFTContract.bytecode,
                    arguments: [nftdetail?.collectionData?.title, nftdetail?.collectionData?.symbol],
                }).send({
                    from: address,
                })
                    .on('error', (error) => {
                        // console.log(error)
                    })
                    .on('transactionHash', (transactionHash) => {
                        // console.log(transactionHash, "transactionHash")
                    })
                    .on('receipt', (receipt) => {
                        // receipt will contain deployed contract address
                        // console.log(receipt, "reciept")
                    })
                    .on('confirmation', (confNumber, receipt) => {
                        // console.log(receipt.contractAddress, "confirmRecipet")
                        if (confNumber == 1) {
                            mint(receipt?.contractAddress)
                            // setContractAdd(receipt?.contractAddress)
                            // UpdateContract(id)
                        }

                    })
            } else {
                mint(nftdetail?.collectionData?.contract_id)
            }
            return {
                success: true,
                // status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>" + txHash
                status: ":white_check_mark: Check out your transaction on Etherscan: <https://ropsten.etherscan.io/tx/>"
            }
        } catch (error) {
            // 
            alert("went wrong")
            return {
                success: false,
                status: ":disappointed_relieved: Something went wrong: " + error.message
            }
        }

    }

    const deployAndMint = async () => {

        setModalShow(true)
        // mint()
        await deployContract()
        // nftdetail.id()
    }
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const today = new Date();
    const numberOfDaysToAdd = 30;
    const date = today.setDate(today.getDate());
    const date1 = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd
    const defaultValue1 = new Date(date1).toISOString().split('T')[0] // yyyy-mm-dd
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >

                <div className='d-flex justify-content-between w-full'>
                    <label className='modal-title h4 '>List for sale</label> <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover form-sell">
                    <div className="row">

                        <div className="col-12 ">
                            <div className="form-group">
                                <div className='mb-3'>Choose a type of sale</div>
                                <div className="gap-5 form-check flex-wrap form-check-inline mr-2 w-full">
                                    {/* {data.usertype == 2 ? ( */}
                                    <div className='d-flex'>
                                         <>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radiobutton"
                                            id="1"
                                            defaultChecked
                                            value="1"

                                            {...register("auctiontype", { required: true })}
                                            aria-invalid={errors.auctiontype ? "true" : "false"}
                                            onChange={(e) => setAuctionType(e.target.value)}

                                        />
                                        <label className="form-check-label mr-2" htmlFor="buy">Fixed Price</label>
                                         </>

                                    </div>

                                    <div className='d-flex'>
                                        <>
                                        <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiobutton"
                                        id="2"
                                        value="2"
                                        {...register("auctiontype", { required: true })}

                                        onChange={(e) => setAuctionType(e.target.value)}
                                        aria-invalid={errors.auctiontype ? "true" : "false"}

                                    />
                                        <label className="form-check-label" htmlFor="auction">English Auction</label>
                                       
                                        </>
                                        </div>
                                    {/* )} */}
                                </div>

                                {errors.auctiontype?.type === 'required' && <p style={{ color: 'red' }} role="alert">Type is required</p>}

                            </div>
                        </div>
                        <div className="col-md-12 col-12">
                            {/* {type == 1 && ( */}

                            <div className="form-group m-0">
                                <label>Set Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    {...register("price", { required: true })}
                                    aria-invalid={errors.price ? "true" : "false"}
                                />
                                {/* {errors.title && errors.title?.type === 'pattern' && <p style={{ color: 'red' }} role="alert">Only VarChar allowed</p>} */}
                                {errors.price?.type === 'required' && <p style={{ color: 'red' }} role="alert">price is required</p>}

                            </div>
                            {/* )} */}
                        </div>
                        <>
                            <div className='col-12 my-3'>Set Duration</div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Start date</label>
                                    <input
                                        type="date"
                                        // placeholder='dd-mm-yy'
                                        // hidden={data.type == 1}
                                        defaultValue={defaultValue}
                                        className="form-control"
                                        name="start_date"
                                        min={disablePastDate()}

                                        {...register("start_date", { required: true })}
                                    // aria-invalid={errors.start_date ? "true" : "false"} 
                                    />
                                    {/* {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>} */}
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="end_date"
                                        min={disablePastDate()}
                                        defaultValue={defaultValue1}
                                        {...register("end_date")}
                                        aria-invalid={errors.end_date ? "true" : "false"}
                                    />
                                    <div >

                                    </div>
                                    {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                </div>
                            </div></>
                            <div className='text-center w-full'>
                        <button type="submit" className="mt-2  mb-0 btn btn-bordered-white" style={{ color: '#FFF' }}
                            id="nftdetail.id" onClick={() => deployAndMint(slug)}>Mint</button><NftPopup
                            show={modalShow}
                            current={current}
                            onHide={() => setModalShow(false)} />
                            </div>
                    </div>



                </form>
            </Modal.Body>

        </Modal >
    );
}

export default SellPopup
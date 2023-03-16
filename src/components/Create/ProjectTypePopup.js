import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

function ProTypePopup(props) {

    // const { data, setFormValues, prevValues } = useFormData();
    // const [type, setType] = useState()
    // const [dataStartdate, setDatastartDate] = useState("")
    // console.log('dataStartdate', dataStartdate)
    // const [dataEnddate, setDataEndDate] = useState("")
    // console.log('dataEnddate', dataEnddate)
    // const [numberNft, setNumberNft] = useState("")
    // console.log('nonft', numberNft)
    // const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});


    const OnSubmit = (data) => {
        // debugger
        // setFormValues
        // setDatastartDate(data.start_date)
        // setDataEndDate(data.end_date)
        // setNumberNft(data.number_of_nft)
        // if (dataStartdate && dataEnddate && numberNft) {

        props.startdate(data.start_date)
        props.enddate(data.end_date)
        props.nftno(data.number_of_nft)
        props.onHide(true)
        // }
        // startDateHandler()
        // endDateHandler()
        // nftNumbereHandler()

    }
    const today = new Date();
    const numberOfDaysToAdd = 30;
    const date = today.setDate(today.getDate())
    const date1 = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().substr(0, 10) // yyyy-mm-dd
    const defaultValue1 = new Date(date1).toISOString().substr(0, 10) // yyyy-mm-dd

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 0).padStart(2, "0");
        const mm = String(today.getMonth() + 0).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    // useEffect(() => {
    //     startDateHandler()
    //     endDateHandler()
    //     nftNumbereHandler()
    // })

    // const startDateHandler = (event) => {

    //     props.startdate(dataStartdate)
    // }
    // const endDateHandler = (event) => {

    //     props.enddate(dataEnddate)
    // }
    // const nftNumbereHandler = (event) => {
    //     props.nftno(numberNft)

    // }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <div>
                    <label>Switch to Campaign for multiple NFTs</label><br />
                    <span>fill the following mandatory fields to continue</span>
                </div>
                <div>

                    {/* <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a> */}
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                    <div className="row">


                        <><div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Campaign Start date</label>
                                <input
                                    type="date"
                                    // placeholder='dd-mm-yy'
                                    // hidden={data.type == 1}
                                    className="form-control"
                                    name="start_date"
                                    min={disablePastDate()}
                                    defaultValue={defaultValue}
                                    // onChange={startDateHandler}
                                    // placeholder="Start date :"
                                    {...register("start_date", { required: true })}
                                    aria-invalid={errors.start_date ? "true" : "false"}
                                />
                                {errors.start_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">Start date is required</p>}
                            </div>
                        </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Campaign End Date</label>
                                    <input
                                        type="date"
                                        // hidden={data.type == 1}
                                        className="form-control"
                                        name="end_date"
                                        defaultValue={defaultValue1}
                                        min={disablePastDate()}
                                        // onChange={endDateHandler}
                                        // value={endDateHandler}

                                        // placeholder="End date"
                                        {...register("end_date", { required: true })}
                                        aria-invalid={errors.end_date ? "true" : "false"}
                                    />
                                    {/* <div >

                                        <span className='logo-dis'>End date should be greater then or equal to start date</span>
                                    </div> */}
                                    {errors.end_date && errors?.end_date?.type === 'min' && <p style={{ color: 'red' }} role="alert">End date should be greater or equal to startdate</p>}
                                    {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                </div>
                            </div></>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Number of NFTs</label>
                                <input
                                    // onInput={(e) => {
                                    //     if (e?.target?.value?.length < e.target.maxLength)
                                    //         e.target.value = e.target.value.slice(0, e.target.maxLength);
                                    // }}
                                    type="number"
                                    className="form-control"
                                    name="number_of_nft"
                                    // onChange={nftNumbereHandler}
                                    // defaultValue={1}
                                    min={1}
                                    max={10}
                                    maxLength={10}

                                    // onKeyUp={imposeMinMax()}
                                    // min=1 max=4 onkeyup=imposeMinMax(this)

                                    // disabled={type == 1}
                                    placeholder="Select your number of NFTs (1-10)"
                                    {...register("number_of_nft", { required: true, min: 1, max: 10 })}

                                    // {...register("number_of_nft", { maxLength: 12 })}
                                    aria-invalid={errors.number_of_nft ? "true" : "false"}
                                />
                                {/* {errors.number_of_nft?.message && <p>{errors.number_of_nft.message}</p>} */}
                                {/* {errors.number_of_nft && errors.number_of_nft.type === "max" && (
                                    <p style={{ color: 'red' }}>
                                        10 NFTs Maximum per Campaign
                                    </p> */}
                                {/* )} */}
                                {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of NFTs per project is required with a limit of 10</p>}
                                {/* {errors.number_of_nft?.type === "maxLength" && <p style={{ color: 'red' }} role="alert">Max length exceeded</p>} */}
                            </div>
                        </div>
                        {/* {numberNft > 0 && */}

                        <div className="col-12">
                            {/* <button className="btn w-100 mt-3 mt-sm-4" onClick={() => numberNft && props.onHide}>switch</button> */}
                            <button className="btn w-100 mt-3 mt-sm-4" type='submit'>switch</button>
                        </div>
                        {/* } */}
                    </div>



                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal >
    );
}

export default ProTypePopup
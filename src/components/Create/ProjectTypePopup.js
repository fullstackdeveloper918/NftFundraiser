import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
function ProTypePopup(props) {
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const OnSubmit = (data) => {
        props.startdate(data.start_date)
        props.enddate(data.end_date)
        props.nftno(data.number_of_nft)
        props.onHide(true)
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
                                    className="form-control"
                                    name="start_date"
                                    min={disablePastDate()}
                                    defaultValue={defaultValue}
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
                                        className="form-control"
                                        name="end_date"
                                        defaultValue={defaultValue1}
                                        min={disablePastDate()}
                                        {...register("end_date", { required: true })}
                                        aria-invalid={errors.end_date ? "true" : "false"}
                                    />
                                    {errors.end_date && errors?.end_date?.type === 'min' && <p style={{ color: 'red' }} role="alert">End date should be greater or equal to startdate</p>}
                                    {errors.end_date?.type === 'required' && <p style={{ color: 'red' }} role="alert">End date is required</p>}
                                </div>
                            </div></>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Number of NFTs</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="number_of_nft"
                                    min={1}
                                    max={10}
                                    maxLength={10}
                                    placeholder="Select your number of NFTs (1-10)"
                                    {...register("number_of_nft", { required: true, min: 1, max: 10 })}
                                    aria-invalid={errors.number_of_nft ? "true" : "false"}
                                />
                                {errors.number_of_nft?.type === 'required' && <p style={{ color: 'red' }} role="alert">Number of NFTs per project is required with a limit of 10</p>}
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn w-100 mt-3 mt-sm-4" type='submit'>switch</button>
                        </div>
                        {/* } */}
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    );
}
export default ProTypePopup
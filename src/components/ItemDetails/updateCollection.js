// import { getValue } from '@mui/system';
import React, {  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { UpdateCollection } from '../../redux/Actions/projectAction';
const EditCollection = () => {


    // console.log(id, "idd")
    const dispatch = useDispatch()

    

    // console.log(projdetail, "gfgfhghgghhgh")

    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
    const contractAddress = "0xE915A57e52A1f5a432b15727EA79e2542d435087"
    const collupdate = useSelector(state => {
        return state?.projectdetails?.collectiondetails
    })
    useEffect(() => {
        if (collupdate) {
            setValue([
                { contract_id: "0xE915A57e52A1f5a432b15727EA79e2542d435087" },
            ]);
        }

        dispatch(UpdateCollection())
    }, [collupdate]);

    return (
        <div>

        </div>
    );

}

export default EditCollection;
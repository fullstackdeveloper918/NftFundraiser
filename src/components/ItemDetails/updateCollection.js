// import { getValue } from '@mui/system';
import React, { Component, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import Modal from 'react-bootstrap/Modal';
import { UpdateCollection } from '../../redux/Actions/projectAction';
const EditCollection = () => {


    const { id } = useParams();
    console.log(id, "idd")
    const dispatch = useDispatch()
    const history = useHistory()

    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })

    console.log(projdetail, "gfgfhghgghhgh")

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
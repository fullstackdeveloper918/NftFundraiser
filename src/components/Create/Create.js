import React, { useState } from "react";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { ProjectFormData } from "../../redux/Actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Create() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(ProjectFormData(data));
  };

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            {/* Author Profile */}
            <AuthorProfile />
          </div>
          <div className="col-12 col-md-7">
            {/* Intro */}
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="intro-content">
                <span>Get Started</span>
                <h3 className="mt-3 mb-0">Create Project</h3>
              </div>
            </div>
            {/* Item Form */}
            <form
              className="item-form card no-hover"
              enctype="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Title"
                      {...register("title", { required: true })}
                      aria-invalid={errors.title ? "true" : "false"}
                    />
                    {errors.title?.type === "required" && (
                      <p role="alert">Title is required</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Item Name"
                      {...register("name", { required: true })}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name?.type === "required" && (
                      <p role="alert">Name is required</p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept=".jpg, .jpeg, .png"
                      {...register("image", { required: true })}
                      aria-invalid={errors.image ? "true" : "false"}
                    />
                  </div>
                  {errors.image?.type === "required" && (
                    <p role="alert">Image is required</p>
                  )}
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      cols={30}
                      rows={3}
                      {...register("description", { required: true })}
                      aria-invalid={errors.textarea ? "true" : "false"}
                    />
                    {errors.description?.type === "required" && (
                      <p role="alert">Text Area is required</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="Price"
                      {...register("price", { required: true })}
                      aria-invalid={errors.price ? "true" : "false"}
                    />
                    {errors.price?.type === "required" && (
                      <p role="alert">Price is required</p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="number"
                      className="form-control"
                      name="latitude"
                      placeholder="Latitude"
                      {...register("latitude", { required: true })}
                      aria-invalid={errors.latitude ? "true" : "false"}
                    />
                    {errors.latitude?.type === "required" && (
                      <p role="alert">Latitude is required</p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="number"
                      className="form-control"
                      name="logitude"
                      placeholder="Longitude"
                      {...register("logitude", { required: true })}
                      aria-invalid={errors.logitude ? "true" : "false"}
                    />
                    {errors.logitude?.type === "required" && (
                      <p role="alert">Longitude is required</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                      {...register("address", { required: true })}
                      aria-invalid={errors.address ? "true" : "false"}
                    />
                    {errors.address?.type === "required" && (
                      <p role="alert">Address is required</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_nft"
                      placeholder="number_of_nft"
                      {...register("number_of_nft", { required: true })}
                      aria-invalid={errors.number_of_nft ? "true" : "false"}
                    />
                    {errors.number_of_nft?.type === "required" && (
                      <p role="alert">Number of Nft are required</p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group mt-3">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      name="start_date"
                      dateFormat="MM/dd/yyyy"
                    />
                  </div>
                </div>
                <div className="col-12 ">
                  <div className="form-group">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      name="end_date"
                      dateFormat="MM/dd/yyyy"
                    />
                  </div>
                </div>
                {/* <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="royality"
                      placeholder="Royality"
                      required="required"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Size"
                      required="required"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="copies"
                      placeholder="No of Copies"
                      required="required"
                    />
                  </div>
                </div> */}
                {/* <div className="col-12"> */}
                {/* <div className="form-group mt-3">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        defaultValue="option1"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Put on Sale
                      </label>
                    </div> */}
                {/* <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        defaultValue="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Instant Sale Price
                      </label>
                    </div> */}
                {/* <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio3"
                        defaultValue="option3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio3"
                      >
                        Unlock Purchased
                      </label>
                    </div> */}
                {/* </div>
                </div> */}
                <div className="col-12">
                  <button
                    className="btn w-100 mt-3 mt-sm-4"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Create Item
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Create;

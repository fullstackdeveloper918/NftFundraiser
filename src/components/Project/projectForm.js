import React, { useState } from "react";
import { ProjectFormData } from "../../redux/Actions/projectAction";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
const ProjectForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(ProjectFormData(data));
  };

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-between">
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
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      {...register("image", { required: true })}
                      aria-invalid={errors.image ? "true" : "false"}
                    />
                  </div>
                  {errors.image?.type === "required" && (
                    <p role="alert">Image is required</p>
                  )}
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
                    <input
                      type="date"
                      className="form-control"
                      name="start_date"
                      placeholder="Start Date"
                      {...register("start_date", { required: true })}
                      aria-invalid={errors.start_date ? "true" : "false"}
                    />
                    {errors.start_date?.type === "required" && (
                      <p role="alert">Start Date is required</p>
                    )}
                  </div>
                </div>
                <div className="col-12 ">
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control"
                      name="end_date"
                      placeholder="End Date"
                      {...register("end_date", { required: true })}
                      aria-invalid={errors.end_date ? "true" : "false"}
                    />
                    {errors.end_date?.type === "required" && (
                      <p role="alert">End Date is required</p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <button
                    onClick={handleSubmit}
                    className="btn w-100 mt-3 mt-sm-4"
                    type="submit"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectForm;

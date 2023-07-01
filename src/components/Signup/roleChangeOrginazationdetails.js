import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AnnualRevenueList,
  CountryList,
  CreateOrganizationAfterRoleChange,
  HearAboutList,
} from "../../redux/Actions/authAction";
import { Controller, useForm } from "react-hook-form";
import { GetSocialMediaIcons } from "../../redux/Actions/projectAction";
import { useState } from "react";
import JoditEditor from "jodit-react";
import { useHistory } from "react-router-dom";

const RoleChangeOrganizationdetails = () => {
  const [description, setDescription] = useState();
  const [einNumber, setEinNumber] = useState(0);
  const [fundraisingGoal, setFundraisingGoal] = useState(0);
  const history = useHistory();
  const userdet = useSelector((state) => {
    return state?.user?.userdetail;
  });
  const dispatch = useDispatch();

  const { countries } = useSelector((state) => state.countries);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: "all",
  });

  const OnSubmit = (values) => {
    const formData = new FormData();
    formData.append("banner_image", values.banner_image[0]);
    formData.append("logo", values.logo[0]);
    formData.append("wallet_id", userdet.wallet_id);
    formData.append("goal", values.goal);
    formData.append("organization_name", values.organization_name);
    formData.append("url", values.url);
    formData.append("country", values.country);
    formData.append("tax_id", values.tax_id === "0"? "": values.tax_id );

    formData.append("social", values.social);
    formData.append("social_link", values.social_link);
    formData.append("description", description);

    dispatch(CreateOrganizationAfterRoleChange(formData, history));
  };

  const socialmedia = useSelector((state) => {
    return state?.getSocialmediaIcons?.getsocial;
  });
  useEffect(() => {
    setValue("wallet_id", userdet.wallet_id)
    dispatch(CountryList());
    dispatch(AnnualRevenueList());
    dispatch(HearAboutList());
    dispatch(GetSocialMediaIcons());
  }, [dispatch]);

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9">
           
              <h3 className="mt-3 mb-0">Organization Detail</h3>

            <form
              onSubmit={handleSubmit(OnSubmit)}
              className="item-form card no-hover"
            >
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="form-group number-input mt-3">
                    <label>Fundraising Goal in Matic (Polygon)</label>
                    <div class="position-relative">
                      <span
                        className="plus_icon"
                        onClick={() =>
                          setFundraisingGoal(
                            (fundraisingGoal) => Number(fundraisingGoal) + 1
                          )
                        }
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </span>
                      <input
                        value={fundraisingGoal}
                        type="number"
                        className="form-control"
                        name="goal"
                        min="0"
                        step="0.01"
                        placeholder="Fundraising goal (MATIC)"
                        {...register("goal", {
                          required: true,
                        })}
                        aria-invalid={errors.goal ? "true" : "false"}
                        onChange={(e) => setFundraisingGoal(e.target.value)}
                      />
                      <span
                        className="minus_icon"
                        onClick={() => {
                          if (Number(fundraisingGoal) <= 0) {
                            setFundraisingGoal(Number(0));
                          } else {
                            setFundraisingGoal(Number(fundraisingGoal) - 1);
                          }
                        }}
                      >
                        <i className="fa fa-minus" aria-hidden="true"></i>
                      </span>
                    </div>
                    {errors.goal && (
                      <p style={{ color: "red" }} role="alert">
                        Fundraising goal is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Funding Wallet </label>
                    <input
                      type="text"
                      className="form-control"
                      name="wallet_id"
                      defaultValue={userdet.wallet_id}
                      value={userdet.wallet_id}
                      placeholder="Funding Wallet"
                      {...register("wallet_id", { required: true })}
                      // {...register("email")}
                      aria-invalid={errors.wallet_id ? "true" : "false"}
                    />
                    {errors.wallet_id?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Wallet address is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="organization_name"
                      placeholder="Organization name"
                      {...register("organization_name", { required: true })}
                      // {...register("email")}
                      aria-invalid={errors.organization_name ? "true" : "false"}
                    />
                    {errors.organization_name?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Organization name is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Website</label>
                    <input
                      type="text"
                      className="form-control"
                      name="url"
                      placeholder="Website"
                      {...register("url", {
                        required: true,
                        pattern: {
                          value:
                           /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})/,
                        },
                      })}
                      // {...register("email")}
                      aria-invalid={errors.url ? "true" : "false"}
                    />

                    {errors.url && errors.url?.type === "pattern" && (
                      <p style={{ color: "red" }} role="alert">
                        Not valid URL
                      </p>
                    )}
                    {errors.url?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Url is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form- group mt-3">
                    <label>Description</label>
                    <Controller
                      control={control}
                      name="description"
                      defaultValue=""
                      rules={{ required: true, min: 150 }}
                      render={({ field }) => {
                        return (
                          <JoditEditor
                            ref={field.ref}
                            value={description}
                            // config={config}
                            aria-invalid={errors.description ? "true" : "false"}
                            placeholder="start typing"
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={field.onChange}
                          />
                        );
                      }}
                    />
                    {errors?.description?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Description is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Country</label>
                    <div class="position-relative select-box">
                      <select
                        name="country"
                        {...register("country", { required: true })}
                      >
                        aria-invalid={errors.country ? "true" : "false"}
                        <option
                          value=""
                          disabled
                          selected
                          style={{ color: "#495057" }}
                        >
                          Select your country
                        </option>
                        {countries.data?.data?.map((option, key) => (
                          <>
                            <option key={key.id} value={option.id}>
                              {option.name}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                    {errors.country?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Country is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group number-input mt-3">
                    <label>EIN Number/Tax Id (optional)</label>
                    <div class="position-relative">
                      <span
                        className="plus_icon"
                        onClick={() =>
                          setEinNumber((einNumber) => Number(einNumber) + 1)
                        }
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </span>
                      <input
                        value={einNumber}
                        type="number"
                        className="form-control"
                        name="tax_id"
                        min="0"
                        placeholder="EIN Number/Tax Id(optional)"
                        {...register("tax_id")}
                        // {...register("email")}

                        onChange={(e) => setEinNumber(e.target.value)}
                      />
                      <span
                        className="minus_icon"
                        onClick={() => {
                          if (Number(einNumber) <= 0) {
                            setEinNumber(Number(0));
                          } else {
                            setEinNumber(Number(einNumber) - 1);
                          }
                        }}
                      >
                        <i className="fa fa-minus" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Social Media (optional)</label>
                    <div class="position-relative select-box">
                      <select name="social" {...register("social")}>
                        aria-invalid={errors.social ? "true" : "false"}
                        <option
                          value=""
                          disabled
                          selected
                          style={{ color: "#495057" }}
                        >
                          Select your social media
                        </option>
                        {socialmedia?.map((option, key) => (
                          <>
                            <option key={key.id} value={option.id}>
                              {option.title}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Social Media (secondary)</label>
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupPrepend2"
                      >
                        @
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="social_link"
                        placeholder="social link(optional) "
                        {...register("social_link")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Banner</label>
                    <input
                      className="form-control p-2"
                      type="file"
                      name="banner_image"
                      placeholder="Select file"
                      disp
                      {...register("banner_image", { required: true })}
                      aria-invalid={errors.banner_image ? "true" : "false"}
                    />
                    <span className="banner-dis">
                      maximum height should be 500 pixels & width should be 1500
                      pixels
                    </span>

                    {errors.banner_image?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Banner is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="form-group mt-3">
                    <label>Logo</label>
                    <input
                      className="form-control p-2"
                      type="file"
                      name="logo"
                      placeholder="Select file"
                      {...register("logo", { required: true })}
                      aria-invalid={errors.logo ? "true" : "false"}
                    />
                    <div className="logo_one">
                      <span className="logo-dis">
                        maximum height should be 250 pixels
                      </span>
                    </div>
                    {errors.logo?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        logo is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                    Create
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

export default RoleChangeOrganizationdetails;

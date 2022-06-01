import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.config";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      radio: 5,
    },
  });

  const onSubmit = (data) => {
    const review = {
      rating: data.radio,
      feedback: data?.feedback,
      name: data?.name,
      photoURL: data.photoURL,
    };
    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success(data.massage);
        }
      });
  };
  if (loading) {
    <h1>loading...</h1>;
  }
  return (
    <div className="w-full place-items-center bg-cover bg-center grid bg-base-100">
      <h1 className="text-5xl font-bold my-10">Login now!</h1>
      <div className="hero-content flex-col lg:flex-row lg:mt-10 lg:mb-32">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <div className="rating rating-md">
                  <input
                    className="mask mask-star-2 bg-orange-400"
                    {...register("radio")}
                    type="radio"
                    value="1"
                  />
                  <input
                    className="mask mask-star-2 bg-orange-400"
                    {...register("radio")}
                    type="radio"
                    value="2"
                  />
                  <input
                    className="mask mask-star-2 bg-orange-400"
                    {...register("radio")}
                    type="radio"
                    value="3"
                  />
                  <input
                    className="mask mask-star-2 bg-orange-400"
                    {...register("radio")}
                    type="radio"
                    value="4"
                  />
                  <input
                    className="mask mask-star-2 bg-orange-400"
                    {...register("radio")}
                    type="radio"
                    value="5"
                  />
                </div>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">FeedBack</span>
                </label>
                <input
                  type="textarea"
                  placeholder="Write your feedback..."
                  className="input input-bordered w-full h-24 max-w-xs"
                  {...register("feedback")}
                />
                <input
                  className="hidden"
                  type="text"
                  value={user?.displayName}
                  {...register("name")}
                />
                <input
                  className="hidden"
                  type="text"
                  value={
                    user?.photoURL ||
                    "https://as2.ftcdn.net/v2/jpg/00/97/00/09/1000_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
                  }
                  {...register("photoURL")}
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;

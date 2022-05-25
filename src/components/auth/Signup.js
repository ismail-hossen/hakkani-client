import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.config";

const Signup = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user2, loading2, error2] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, loading3, error3] = useUpdateProfile(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user || user2) {
      navigate("/");
    }
  }, [user, user2, navigate]);

  // post user for user collection
  useEffect(() => {
    const email = user?.user?.email || user2?.user.email;
    if (email) {
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [user , user2]);

  let signInError;

  if (loading || loading2 || loading3) {
    return <h1>loading...</h1>;
  }

  if (error || error2 || error3) {
    signInError = (
      <p className="text-red-500">
        <small>
          {error?.message || error2?.message || error3?.message}
        </small>
      </p>
    );
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };

  return (
    <div className="w-full place-items-center bg-cover bg-center grid min-h-full bg-base-100">
      <h1 className="text-5xl font-bold my-10">Sign Up!</h1>
      <div className="hero-content flex-col lg:flex-row lg:mt-10 lg:mb-32">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 characters or longer",
                    },
                  })}
                />
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Already have an account? please login.
                  </Link>
                </label>
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              {signInError}

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="divider lg:divider-horizontal">OR</div>

        <div className="text-center lg:text-left">
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-primary btn-wide"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

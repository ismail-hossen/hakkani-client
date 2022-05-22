import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <div className="w-full place-items-center bg-cover bg-center grid min-h-full bg-base-100">
      <h1 className="text-5xl font-bold my-10">Login now!</h1>
      <div className="hero-content flex-col lg:flex-row lg:mt-10 lg:mb-32">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
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

export default Login;

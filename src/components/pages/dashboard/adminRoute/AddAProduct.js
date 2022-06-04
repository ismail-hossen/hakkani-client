import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import auth from "../../../../firebase.config";

const AddAProduct = () => {
  const [user, loading] = useAuthState(auth);
  const { register, handleSubmit, reset } = useForm();
  const imageStorage = "cc77d53eda2a115ad4dd2b379aff0d85";
  const onSubmit = async (data) => {
    console.log(data);

    const image = data.ProductImage[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageStorage}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageUp) => {
        if (imageUp.success) {
          const image = imageUp.data.url;
          const product = {
            userName: user.displayName,
            toolsName: data.productName,
            email: user.email,
            available: data.available,
            toolsPrice: data.price,
            minOrder: data.minOrder,
            toolsImage: image,
            toolsDec: data.description,
          };
          // send product data in database
          fetch("https://pure-refuge-14003.herokuapp.com/tools-collection", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                toast.success("Added successfully");
                reset();
              } else {
                toast.error("Failed to add the product");
              }
            });
        }
      });
  };

  if (loading) {
    return <h5>loading...</h5>;
  }
  return (
    <div className="bg-cover bg-center bg-base-100 flex flex-col h-auto my-20 justify-center items-center">
      <h1 className="text-5xl font-bold">Add A Product!</h1>
      <div className="card flex-shrink-0 w-full mt-10 max-w-5xl shadow-2xl bg-base-100">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                {...register("productName")}
              />
            </div>
            <div className="flex gap-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Available</span>
                </label>
                <input
                  type="number"
                  placeholder="Available"
                  className="input input-bordered w-full max-w-xs"
                  {...register("available")}
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-full max-w-xs"
                  {...register("price")}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Minimum Order</span>
                </label>
                <input
                  type="number"
                  placeholder="Min Order"
                  className="input input-bordered w-full max-w-xs"
                  {...register("minOrder")}
                />
              </div>
            </div>
            <div className="form-control w-full max-w-xl">
              <label className="label">
                <span className="label-text">
                  Write something about product
                </span>
              </label>
              <textarea
                placeholder="Write Here"
                className="input input-bordered w-full"
                {...register("description")}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Add Product Image</span>
              </label>
              <input
                type="file"
                className="input input-bordered w-full"
                {...register("ProductImage")}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddAProduct;

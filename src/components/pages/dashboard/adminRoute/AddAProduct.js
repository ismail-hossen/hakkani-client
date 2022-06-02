import React from "react";
import { useForm } from "react-hook-form";

const AddAProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const imageStorage = "cc77d53eda2a115ad4dd2b379aff0d85";
  const onSubmit = async (data) => {
    const image = data.ProductImage[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageStorage}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("data", data));

    // reset();
  };

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
                {...register("ProductName")}
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
                  {...register("Available")}
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
                  {...register("Price")}
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
                  {...register("MinOrder")}
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
                {...register("Description")}
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
        </div>
      </div>
    </div>
  );
};

export default AddAProduct;

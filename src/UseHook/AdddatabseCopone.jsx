import Swal from "sweetalert2";
import UseAxios from "./UseAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const AdddatabseCopone = () => {
    const axiosSecure = UseAxios();
    const queryClient = useQueryClient();
    const { mutateAsync: addCoupon } = useMutation({
      mutationFn: async (newCoupon) =>
        await axiosSecure.post("/coupons", newCoupon),
      onSuccess: () => {
        queryClient.refetchQueries("couponse");
      },
    });
  
    const handleAdddiscountCoupon = async (event) => {
      event.preventDefault();
  
      const form = event.target;
  
      const Code = form.Code.value;
      const expireDates = form.expireDates.value;
      const description = form.description.value;
      const disountamount = form.disountamount.value;
  
      const newCoupon = {
        Code,
        expireDates,
        description,
        disountamount,
      };
  
      try {
        await addCoupon(newCoupon);
        form.reset();
        Swal.fire({
          title: "Success",
          text: "Coupon added successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Request failed",
        });
      }
    };
  
    return (
        <div>
             <div className="flex flex-col justify-center sm:px-6 lg:px-8">
      <h2 className="mt-2 italic text-center text-3xl leading-9 font-semibold text-gray-900">
        Add a Coupon
      </h2>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleAdddiscountCoupon}>
            <div>
              <label
                htmlFor="Code"
                className="block text-sm font-medium leading-5  text-gray-700"
              >
                Coupon Code
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="Code"
                  name="Code"
                  placeholder="Enter a Coupon Code"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="expireDates"
                className="block text-sm font-medium leading-5  text-gray-700"
              >
                Expiry Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="expireDates"
                  name="expireDates"
                  placeholder="Enter Expire Date"
                  type="date"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
          "
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Coupon code Description
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Describe About the Coupon"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="disountamount"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Discount disountAmount
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="disountamount"
                  name="disountamount"
                  type="price"
                  placeholder="Enter Discount disountAmount"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Add Coupon
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
        </div>
    );
};

export default AdddatabseCopone;

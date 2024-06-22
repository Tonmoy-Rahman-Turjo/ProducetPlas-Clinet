
import Swal from 'sweetalert2';
import Loader from "../Route/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import UseAxios from './UseAxios';

const EditCoupon = () => {
    const { id } = useParams();
    const axiosSecure = UseAxios();
    const navigate = useNavigate();
  
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["coupon", id],
        queryFn: async () => await axiosSecure.get(`/allCoupons/${id}`),
    });
      
    const { mutateAsync: updateCoupon } = useMutation({
        mutationFn: async (updatedCoupon) =>
            await axiosSecure.put(`/updatecopon/${id}`, updatedCoupon),
    });
  
    if (isLoading) {
        return (
            <div className="flex justify-center mt-8">
                <Loader />
            </div>
        );
    }
  
    const coupon = data?.data || {};
    const { Code,expireDates, description,  disountamount} = coupon;
  
    const handleUpdateCoupon = async (event) => {
        event.preventDefault();
  
        const form = event.target;
  
        const updatedCou = {
            Code:form.Code.value,
            expireDates: form.expireDates.value,
            description: form.description.value,
            disountamount: form.disountamount.value,
        };
  
        try {
            await updateCoupon(updatedCou);
            refetch();
            Swal.fire({
                title: "Success!",
                text: "Coupon Updated Successfully",
                icon: "success",
                confirmButtonText: "OK",
            });
            navigate("/deshbord/managcopun");
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
        <div className="flex flex-col justify-center sm:px-6 lg:px-8">
            <h2 className="mt-14 mb-3 text-center text-3xl leading-9 font-semibold text-gray-900">
                Update Coupon: {Code}
            </h2>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleUpdateCoupon}>
                        <div>
                            <label
                                htmlFor="couponCode"
                                className="block text-base mb-4 font-bold leading-5 text-gray-700"
                            >
                                Coupon Code
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="couponCode"
                                    name="Code"
                                    placeholder="Enter a Coupon Code"
                                    defaultValue={Code}
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out text-lg font-medium sm:leading-5"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="expireDate"
                                className="block text-base mb-4 font-bold leading-5 text-gray-700"
                            >
                                Expiry Date
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="expireDate"
                                    name="expireDates"
                                    placeholder="Enter Expire Date"
                                    defaultValue={expireDates}
                                    type="date"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out text-lg font-medium sm:leading-5"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="description"
                                className="block text-base mb-4 font-bold leading-5 text-gray-700"
                            >
                                Coupon Code Description
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Describe About the Coupon"
                                    defaultValue={description}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out text-lg font-medium sm:leading-5"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="amount"
                                className="block text-base mb-4 font-bold leading-5 text-gray-700"
                            >
                                Discount Amount
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="amount"
                                    name="disountamount"
                                    type="number"
                                    placeholder="Enter Discount Amount"
                                    defaultValue={disountamount}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out text-lg font-medium sm:leading-5"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-xl font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                >
                                    Update Coupon
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCoupon;


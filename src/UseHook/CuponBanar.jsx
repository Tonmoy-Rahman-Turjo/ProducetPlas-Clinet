





import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import useAxiosHook from "./UseAxiosHook";
import Loader from "../Route/Loader";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const CuponBanar = () => {
    const axiosPublic = useAxiosHook();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => await axiosPublic.get("/couponse"),
        onError: (error) => {
            console.error("Error coupons:", error);
            toast.error("Failed  coupons");
        }
    });

    const allCoupons = data?.data || [];

    const handleCopy = (Code) => {
        navigator.clipboard.writeText(Code);
        toast.success("Coupon code copy susscessfully: " + Code);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center mt-8">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-600">Failed to load coupons</div>;
    }

    return (
        <div className="py-8 bg-gradient-to-b from-purple-600 to-blue-600">
            <h2 className="text-center text-3xl text-white uppercase font-bold">Cupon  Discount Sections </h2>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false}
                interval={3000}
                transitionTime={1000}
                className="rounded-lg shadow-lg"
            >
                {allCoupons.map((coupon) => (
                    <div
                        key={coupon._id}
                        className="bg-white my-10 p-6 rounded-lg shadow-xl w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto"
                    >
                        <div className="text-3xl font-bold mb-4 text-gray-800">Special Discount!</div>
                        <div className="text-lg mb-4 text-gray-700">
                            Get{" "}
                            <span className="text-red-700 font-bold text-2xl">
                                $ {coupon?.discountamount}
                            </span>{" "}
                            <span className="text-red-700 font-bold">off</span> on your next purchase!
                        </div>
                        <div className="text-base mb-6 text-gray-800">
                            Coupon Details: {coupon?.description}
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-between">
                            <span className="text-lg font-semibold">{coupon?.Code}</span>
                            <button
                                onClick={() => handleCopy(coupon?.Code)}
                                className="bg-green-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Copy Code
                            </button>
                        </div>
                        <div className="text-base mt-4 mb-4 text-gray-800">
                            Valid until{" "}
                            <span className="font-semibold">{coupon?.expireDates}</span>
                        </div>
                    </div>
                ))}
            </Carousel>
            <ToastContainer />
        </div>
    );
};

export default CuponBanar;


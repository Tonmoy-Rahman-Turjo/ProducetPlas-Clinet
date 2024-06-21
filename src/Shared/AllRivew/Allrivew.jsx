/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import UseAxios from "../../UseHook/UseAxios";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

// import Rating from "react-rating";
import { useQuery } from "@tanstack/react-query";


const Allrivew = ({productId}) => {
  const axiosSecure = UseAxios();
  const { data } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => await axiosSecure.get("/allReviews"),
  });

  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    if (data) {
      const allReviews = data.data;
      const reviewsProduct = allReviews.filter(
        (review) => review.productId === productId
      );
      setProductReviews(reviewsProduct);
    }
  }, [data, productId]);
    return (
   


      <section className="my-10 bg-white shadow-md rounded-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className=" text-center  text-2xl font-bold underline uppercase pt-7 text-[#f14242]">This Products All rivew</h2>
        <div className="grid gap-6 py-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productReviews.length === 0 ? (
            <p className="text-center text-lg text-gray-600 py-8">
              No reviews found for this products - Thank you.
            </p>
          ) : (
            productReviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#51d0e0] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="p-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src={review.photoURL}
                      className="w-12 h-12 bg-center bg-cover border rounded-full"
                      alt=""
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {review.displayName}
                      </h3>
                      <Rating
                      value={review.rating}
                      style={{ maxWidth: 150 }}
                      readOnly
                     Styles={{
                        activeFillColor: "#FFFC33", // Yellow color code #FFFC33
                        inactiveFillColor: "#FFFC33", // Yellow color code #FFFC33
                      }}
                    />
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.feedback}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    
    );
};

export default Allrivew;
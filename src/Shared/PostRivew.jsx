

import { useState } from "react";
// import UseAuth from "../UseHook/UseAuth";
// import UseAxios from "../UseHook/UseAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../UseHook/UseAxios";
import { toast } from "react-toastify";
// import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import UseAuth from "../UseHook/UseAuth";
// import { AuthContext } from "../AuthProvider/Authprovider";


const PostRivew = ({productId}) => {
    const{user} = UseAuth()
    console.log(user)
    const {displayName, photoURL} = user;
    const axiosSecure = UseAxios();
    const [rating, setRating] = useState(0);
    const queryClient = useQueryClient();
  
    const { mutateAsync: addReview } = useMutation({
      mutationFn: async (usersReview) =>
        await axiosSecure.post("/addReview", usersReview),
      onSuccess: () => {
        queryClient.invalidateQueries("allReviewse");
      },
    });
    // const [rating, setRating] = useState(0); // State to manage the rating value
    const [hover, setHover] = useState(0);
    const handleAddProduct = async (event) => {
      event.preventDefault();
  
      const form = event.target;
      const feedback = form.feedback.value;
  
      const usersReview = { displayName,photoURL,feedback,rating, productId,
      };
  
      try {
        await addReview(usersReview);
        form.reset();
        setRating(0);
        toast.success("Thanks for your Feedback");
      } catch (error) {
        console.error(error);
      }
    }
    return (
        <div>
             <form
      onSubmit={handleAddProduct}
      className="w-7/12 mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg"
    >
      <h2 className="text-3xl text-center text-red-600 underline font-bold mb-6">Feedback Form</h2>
      <div className="mb-8">
        <label className="block text-gray-700 font-bold mb-3" htmlFor="name">
          Name :
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 font-semibold italic text-xl leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          defaultValue={displayName}
          readOnly
        />
      </div>
      <div className="">
        <label className="block text-gray-700 font-bold mb-3" htmlFor="photo">
          PhotoURL :
        </label>
        <input
          className="shadow text-base appearance-none border rounded w-full py-2 px-3 text-gray-900 font-medium leading-tight focus:outline-none focus:shadow-outline"
          id="photo"
          type="text"
          name="photo"
          placeholder="Your photoURL"
          defaultValue={photoURL}
          readOnly
        />
      </div>
      <div className="mb-6 mt-6">
       
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: 'none' }} 
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                style={{ cursor: 'pointer' }} 
              />
            </label>
          );
        })}
      </div>
      <p>The rating is {rating}.</p>
    </div>
      </div>
      <div className="mb-4">
        <label
          className="block mt-4 text-gray-700 font-bold mb-3"
          htmlFor="feedback"
        >
          Your Feedback :
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="feedback"
          name="feedback"
          rows={5}
          placeholder="Enter your feedback"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </form>
        </div>
    );
};

export default PostRivew;
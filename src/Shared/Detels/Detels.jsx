import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Route/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import UseAuth from "../../UseHook/UseAuth";
import { useParams } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";
import UseAxios from "../../UseHook/UseAxios";
import PostRivew from "../PostRivew";
// import Allrivew from "../AllRivew/Allrivew";

import "@smastrom/react-rating/style.css";

const Detels = () => {
    const axiosSecure = UseAxios();
    const { user } = UseAuth();
    const { id } = useParams();
  
    const { data, isLoading, refetch } = useQuery({
      queryKey: ["details", id],
      queryFn: async () => await axiosSecure.get(`/allProducts/${id}`),
    });
  
    const { mutateAsync: voteIncrement } = useMutation({
      mutationFn: async () =>
        await axiosSecure.put(`/voteCount/${id}`, { userEmail: user?.email }),
    });
  
    const handleVoteCount = async () => {
      try {
        await voteIncrement();
        refetch();
        toast("successfully count your vote", {
          icon: "👏",
        });
      } catch (error) {
        // toast.error(error.response?.data?.message || "Error voting for product");
        console.log(error || "Error voting for product");
      }
    };
  
    const handleReportedProduct = async (productId) => {
      try {
        await axiosSecure.put(`/reportdProduct/${productId}`, {
          status: "Reported",
        });
        refetch();
        console.log("Product Feedback change successfully");
        toast.success("We'll consider your Feedback.. Thanks!");
      } catch (error) {
        console.error("Error Type updating product:", error);
      }
    };
  
    if (isLoading) {
      return (
        <div className="flex justify-center mt-8">
          <Loader></Loader>
        </div>
      );
    }
  
    const { productsName,productsImg, description, tags, externalLinks, upVote, _id, ProductFeedback, voters, email, } = data.data;
    return (
        <div className="bg-[#4aaad6] py-10">
          <div className="flex rounded-xl md:w-[700px] w-full gap-2 m-auto  bg-white  shadow-lg mx-auto md:flex-row flex-col">
          <img src={productsImg} className="rounded-l-xl " />
          <div>

          </div>


          <div>
   <div className="flex mt-3  items-center justify-between">
   <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
   {Array.isArray(tags) &&
     tags?.map((tag, index) => (
       <span
         key={index}
         className="mr-2 mb-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm font-semibold"
       >
         {tag}
       </span>
     ))}
 </h6>
  <button
   onClick={() => handleReportedProduct(_id)}
   className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-xl px-6 italic py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
 >
   {ProductFeedback === "Reported" ? "Reported" : "Report"}
  </button>
   </div>
 <h4 className="block mb-6 mt-6 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    {productsName}
  </h4>
  <p className="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
   {description}
  </p>
  <a
   href={
       externalLinks}
   target="_blank"
   rel="noopener noreferrer"
   className="block  antialiased font-medium text-blue-700 hover:underline leading-snug tracking-normal text-blue-gray-900"
 >
   {externalLinks}
 </a>
 <div className="mt-3">
   <button
     onClick={() => {
       if (voters?.includes(user?.email)) {
         toast.error("You've already voted this product");
       } else {
         handleVoteCount();
       }
     }}
     disabled={user?.email === email}
     className={`py-1 px-4 hover:text-black mb-5 text-white bg-green-700 hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
       user?.email === email
         ? "cursor-not-allowed opacity-60 hover:text-black"
         : ""
     }`}
   >
     <BiUpvote className="text-2xl"></BiUpvote>
      <span className="text-lg">{upVote}</span>
   </button>
   <ToastContainer />
 </div>
            
          </div>
          </div>
          <PostRivew productId={_id} /> 
        </div>
      
    );
};



export default Detels;

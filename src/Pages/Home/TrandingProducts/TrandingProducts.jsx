import {BiUpvote } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../Route/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAuth from "../../../UseHook/UseAuth";
import UseAxios from "../../../UseHook/UseAxios";
import useAxiosHook from "../../../UseHook/UseAxiosHook";


const TrandingProducts = () => {
    const axiosPublic = useAxiosHook();
    const axiosSecure = UseAxios();
    const navigate = useNavigate();
    const { user } = UseAuth();
    const location = useLocation();
  
    // eslint-disable-next-line no-unused-vars
    const [filter, setfilters] = useState("desc");
    const { data, isLoading, refetch } = useQuery({
      queryKey: ["userVotetrendingProducts"],
      queryFn: async () =>
        await axiosPublic.get(`/trendingProducts/?upVote=${filter}`),
    });
  
    const allTrendingProduct = data?.data;
  
    const { mutateAsync: voteIncrsements } = useMutation({
      mutationFn: async ({ id, userEmail }) =>
        await axiosSecure.put(`/voteCount/${id}`, { userEmail }),
    });
  
    const handleVoteCount = async (product) => {
      if (!user) {
        navigate("/login", { state: { from: location } });
        return;
      }
  
      try {
        await voteIncrsements({ id: product._id, userEmail: user.email });
        refetch();
        toast(" count your vote successfully ", {
          icon: "👏",
        });
      } catch (error) {
       
        // console.log(error);
      }
    };
  
    if (isLoading) {
      return (
        <div className="flex justify-center mt-8">
          <Loader></Loader>
        </div>
      );
    }
    return (
        <div className="bg-[#70e9cf60]">
             <div className="w-11/12 mx-auto py-20 ">
      
      <div data-aos="fade-down">
          <h1 className="text-xl text-center pt-20  font-semibold  text-white capitalize md:text-4xl "> 😍 <span className="italic">Trending Products </span></h1>
          <p className=" text-xl text-[#4948489a] pb-14 pt-3 md:w-1/3  w-full italic m-auto text-center">This description quickly conveys the key features and benefits of the product in a succinct manner, enticing potential customers with its capabilities</p>
          </div>
      <div className="grid gap-10 delay-75 tranzision w-full h-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {allTrendingProduct?.slice(0, 6).map((trending) => (
          <div key={trending._id} data-aos="fade-up" className="rounded map-card shadow-2xl delay-200  cursor-pointer transform  transition duration-300 hover:scale-105 hover:bg-[#4ff3f3] hover:relative top-7 shadow-[#5fbec5] p-4">
            <img
              className="w-full rounded h-64"
              src={trending.productsImg}
              alt=""
            />
            <div className="flex justify-between  items-center gap-5">
            <div className="my-3">
              <NavLink to={`/detels/${trending._id}`}>
                <div className="font-bold hover:underline text-2xl mb-1">
                  {trending.productsName}
                </div>
              </NavLink>
            </div>
              <button
                onClick={() => {
                  if (trending.voters?.includes(user?.email)) {
                    toast.error("You've already voted this product");
                  } else {
                    handleVoteCount(trending);
                  }
                }}
                disabled={user?.email === trending?.email}
                className={`py-1 px-4 hover:bg-black bg-green-800 text-white font-semibold  hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                  user?.email === trending?.email
                    ? "cursor-not-allowed opacity-60 hover:text-black"
                    : ""
                }`}
              >
                <BiUpvote className="text-xl"></BiUpvote>
                <span className="text-lg">{trending.upVote || 0}</span>
              </button>
            
            </div>
           
            <div className="px-6 pb-6 flex flex-wrap gap-3">
              {Array.isArray(trending?.tags) &&
                trending?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-green-200 rounded-2xl px-3 py-1 text-base font-semibold text-green-900  "
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-10 justify-center items-center">
        <NavLink to="/products">
          
          <button className=" bg-[#30c6d1] p-2 rounded hover:bg-red-700 text-2xl font-bold">
            <span className="p-2 hover:text-white">
              Show All Products
            </span>
          </button>
        </NavLink>
      </div>
      <ToastContainer />
    </div>
        </div>
    );
};

export default TrandingProducts;

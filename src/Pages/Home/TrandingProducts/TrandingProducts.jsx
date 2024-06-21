import { BiDownvote, BiUpvote } from "react-icons/bi";
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
      queryKey: ["trendingProducts"],
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
          <div key={trending._id} data-aos="fade-up" className="rounded hover:bg-[#fff]  shadow-2xl shadow-[#5fbec5] bg-[#43c6ca] p-3">
            <img
              className="w-full h-64"
              src={trending.productsImg}
              alt=""
            />
            <div className="flex justify-end mt-3 mr-4 gap-5">
              <button
                onClick={() => {
                  if (trending.voters?.includes(user?.email)) {
                    toast.error("You've already voted this product");
                  } else {
                    handleVoteCount(trending);
                  }
                }}
                disabled={user?.email === trending?.email}
                className={`py-1 px-4 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                  user?.email === trending?.email
                    ? "cursor-not-allowed opacity-60 hover:text-black"
                    : ""
                }`}
              >
                <BiUpvote className="text-xl"></BiUpvote>
                <span className="text-lg">{trending.upVote || 0}</span>
              </button>
              <button className="py-1 px-4 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2">
                <BiDownvote className="hover:text-red-600 text-xl"></BiDownvote>
                <span className="text-lg">0</span>
              </button>
            </div>
            <div className="px-6 py-4">
              <NavLink to={`/detels/${trending._id}`}>
                <div className="font-bold hover:underline text-2xl mb-1">
                  {trending.productsName}
                </div>
              </NavLink>
            </div>
            <div className="px-6 pb-6 flex flex-wrap gap-3">
              {Array.isArray(trending?.tags) &&
                trending?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-green-200 rounded-full px-3 py-1 text-base font-semibold text-green-900  mr-2"
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
          
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-16 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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

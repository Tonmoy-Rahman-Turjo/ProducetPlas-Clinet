import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UseAxios from "../../../UseHook/UseAxios";
import useAxiosHook from "../../../UseHook/UseAxiosHook";

import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import UseAuth from "../../../UseHook/UseAuth";

import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { BiUpvote } from "react-icons/bi";

AOS.init();
const Fetechardse = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosHook();
    const axiosSecure = UseAxios();
     const{user}= UseAuth()
    const location = useLocation();
    const { data,  refetch } = useQuery({
        queryKey: ["featuredProduct"],
        queryFn: async () => await axiosPublic.get("/featuredProducts"),
      });

      const allFeaturedProduct = data?.data;

  const { mutateAsync: voteIncrement } = useMutation({
    mutationFn: async ({ id, userEmail }) =>
      await axiosSecure.put(`/voteCount/${id}`, { userEmail }),
  });

  const handlecountuserVoteCount = async (product) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      await voteIncrement({ id: product._id, userEmail: user.email });
      refetch();
      toast("Count your vote successfully", {
        icon: "😍", 
      });
    } catch (error) {
      
      console.log(error || "Error voting for product");
    }
  };

    return (
        <section className="bg-[#adecee]">
        <div className="w-11/12 pb-20 m-auto">
          <h1 className="text-xl text-center pt-10  font-semibold italic text-white capitalize md:text-4xl "> 🚀 Featured Products </h1>
          <p className=" text-xl text-[#494848] pb-14 pt-3 md:w-1/3  w-full italic m-auto text-center">Ideal design and usability for users.
          Gune means more and these products have good reviews</p>
          <div className="grid grid-cols-1  gap-8 md:grid-cols-2 2xl:grid-cols-3 ">
            {allFeaturedProduct?.slice(0, 6).map((featured) => (
              <div key={featured._id} data-aos="fade-up"  className="lg:flex md:w-[500px] m-auto w-full  justify-center border py-3 bg-[#fff] rounded-lg shadow-2xl  shadow-[#7a7979]">
                <img
                  className="object-cover w-full h-56 rounded-lg lg:w-64"
                  src={featured.productsImg}alt=""
                />
                <div className="flex flex-col lg:mx-6">
                  <NavLink to={`/detels/${featured._id}`}>
                    {" "}
                    <h1 className="text-3xl mt-2 font-semibold text-gray-800 hover:underline dark:text-white">
                      {featured.productsName}
                    </h1>
                  </NavLink>
                  <a className="text-sm mt-4 font-semibold text-gray-500  dark:text-white">
                    {new Date(featured.timestamp).toLocaleString()}
                  </a>
                  <div className="flex flex-wrap mt-6 gap-3 items-center">
                    {Array.isArray(featured?.tags) &&
                      featured?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-600 py-1 px-2 rounded-3xl text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <div className="flex mt-5 gap-2">
                    <button
                      onClick={() => {
                        if (featured.voters?.includes(user?.email)) {
                          toast.error("You've already voted this product");
                        } else {
                          handlecountuserVoteCount(featured);
                        }
                      }}
                      disabled={user?.email === featured?.email}
                      className={`py-1 px-4 hover:text-white bg-[#5fa735] hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                        user?.email === featured?.email
                          ? "cursor-not-allowed opacity-60 hover:text-black"
                          : ""
                      }`}
                    >
                      <BiUpvote className="text-xl "></BiUpvote>
                      <span className="text-lg">{featured.upVote || 0}</span>
                    </button>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </section>
    );
};

export default Fetechardse;

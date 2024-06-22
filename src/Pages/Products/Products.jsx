

// import { useEffect, useState } from "react";
// import { BiUpvote } from "react-icons/bi";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import UseAxios from "../../UseHook/UseAxios";
// import UseAuth from "../../UseHook/UseAuth";
// import { useMutation } from "@tanstack/react-query";
// import useAxiosHook from "../../UseHook/UseAxiosHook";
// import UseProducts from "../../UseHook/UseProducts";
// import { IoSearch } from "react-icons/io5";
// const Products = () => {
//   const [acceptedProducts, refetch] = UseProducts();
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;
//   const axios = useAxiosHook();
//   const axiosSecure = UseAxios();
//   const { user } = UseAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const { mutateAsync: voteIncrement } = useMutation({
//     mutationFn: async ({ id, userEmail }) =>
//       await axiosSecure.put(`/voteCount/${id}`, { userEmail }),
//   });

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = searchTerm ? filteredProducts : acceptedProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleVoteCount = async (product) => {
//     if (!user) {
//       navigate("/login", { state: { from: location } });
//       return;
//     }

//     try {
//       await voteIncrement({ id: product._id, userEmail: user.email });
//       refetch();
//       toast("Count your vote successfully", { icon: "👏" });
//     } catch (error) {
//       // Handle error appropriately
//     }
//   };

//   useEffect(() => {
//     // Function to fetch accepted products from backend
//     const fetchAcceptedProducts = async () => {
//       try {
//         const response = await axios.get("/api/products");
//         setAcceptedProducts(response.data);
//         setFilteredProducts(response.data); // Initialize filtered products with all accepted products
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchAcceptedProducts();
//   }, [axios]);

//   const handleSearchChange = async (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);

//     try {
//       const response = await axios.get(`/api/products/search?keyword=${searchTerm}`);
//       setFilteredProducts(response.data); 
//     } catch (error) {
//       console.error("Error searching products:", error);
//     }
//   };

//   return (
//     <div className="bg-[#3ec8f1] py-20">
//       {/* Search */}
//       <label className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300" htmlFor="search-bar">
//         <input
//           id="search-bar"
//           placeholder="Enter your keyword here"
//           className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <button className="w-full flex gap-1  items-center  md:w-auto text-2xl p-2 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
//          search <IoSearch />
//         </button>
//       </label>

//       <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
//         {currentProducts?.map((product) => (
//           <div key={product._id} className="bg-[#47d634af] p-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
//             <img className="h-56 w-96 rounded-t-xl" src={product.productsImg} alt="" />
//             <div className="px-4 py-3">
//               <div className="flex flex-wrap items-center">
//                 {Array.isArray(product?.tags) &&
//                   product?.tags?.map((tag, index) => (
//                     <span key={index} className="mr-2 mb-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm font-semibold">
//                       {tag}
//                     </span>
//                   ))}
//               </div>
//               <NavLink to={`/detels/${product._id}`}>
//                 <p className="text-2xl mt-1 hover:underline font-bold text-black">
//                   {product.productsName}
//                 </p>
//               </NavLink>
//               <p className="text-sm mt-4 h-auto font-semibold text-gray-500 italic">
//                 {product.description}
//               </p>
//               <div className="flex justify-between my-2 items-center">
//                 <button className="px-4 bg-[#4ae2e2] italic text-base text-white font-semibold rounded py-1">
//                   {product.ProductStatus}
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (product.voters?.includes(user?.email)) {
//                       toast.error("You've already voted this product");
//                     } else {
//                       handleVoteCount(product);
//                     }
//                   }}
//                   disabled={user?.email === product?.email}
//                   className={`py-1 px-4 hover:bg-red-600 hover:scale-105 bg-[#4ae2e2] hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
//                     user?.email === product?.email ? "cursor-not-allowed opacity-60 hover:text-black" : ""
//                   }`}
//                 >
//                   <BiUpvote className="text-xl" />
//                   <span className="text-lg">{product?.upVote || 0}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Pagination */}
//       <div className="flex justify-center">
//         {Array.from({
//           length: Math.ceil(acceptedProducts.length / productsPerPage),
//         }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => paginate(index + 1)}
//             className={`px-6 py-2 text-3xl mx-2 bg-white rounded-md hover:bg-gray-300 focus:outline-none ${currentPage === index + 1 ? "bg-white" : ""}`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Products;





// import { useEffect, useState } from "react";
// import { BiUpvote } from "react-icons/bi";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import UseAxios from "../../UseHook/UseAxios";
// import UseAuth from "../../UseHook/UseAuth";
// import { useMutation } from "@tanstack/react-query";
// import useAxiosHook from "../../UseHook/UseAxiosHook";
// import UseProducts from "../../UseHook/UseProducts";
// import { IoSearch } from "react-icons/io5";

// const Products = () => {
//   const [acceptedProducts, refetch] = UseProducts();
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;
//   const axios = useAxiosHook();
//   const axiosSecure = UseAxios();
//   const { user } = UseAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const { mutateAsync: voteIncrement } = useMutation({
//     mutationFn: async ({ id, userEmail }) =>
//       await axiosSecure.put(`/voteCount/${id}`, { userEmail }),
//   });

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = searchTerm ? filteredProducts : acceptedProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleVoteCount = async (product) => {
//     if (!user) {
//       navigate("/login", { state: { from: location } });
//       return;
//     }

//     try {
//       await voteIncrement({ id: product._id, userEmail: user.email });
//       refetch();
//       toast("Count your vote successfully", { icon: "👏" });
//     } catch (error) {
//       console.error("Error incrementing vote:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchAcceptedProducts = async () => {
//       try {
//         const response = await axios.get("/api/products");
//         setAcceptedProducts(response.data);
//         setFilteredProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchAcceptedProducts();
//   }, [axios]);

//   const handleSearchChange = async (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);

//     try {
//       const response = await axios.get(`/api/products/search?keyword=${searchTerm}`);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error searching products:", error);
//     }
//   };

//   return (
//     <div className="bg-[#3ec8f1] py-20">
//       <label className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300" htmlFor="search-bar">
//         <input
//           id="search-bar"
//           placeholder="Enter your keyword here"
//           className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <button className="w-full flex gap-1 items-center md:w-auto text-2xl p-2 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
//           Search <IoSearch />
//         </button>
//       </label>

//       <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
//         {currentProducts?.map((product) => (
//           <div key={product._id} className="bg-[#47d634af] p-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
//             <img className="h-56 w-96 rounded-t-xl" src={product.productsImg} alt="" />
//             <div className="px-4 py-3">
//               <div className="flex flex-wrap items-center">
//                 {Array.isArray(product?.tags) &&
//                   product?.tags?.map((tag, index) => (
//                     <span key={index} className="mr-2 mb-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm font-semibold">
//                       {tag}
//                     </span>
//                   ))}
//               </div>
//               <NavLink to={`/detels/${product._id}`}>
//                 <p className="text-2xl mt-1 hover:underline font-bold text-black">
//                   {product.productsName}
//                 </p>
//               </NavLink>
//               <p className="text-sm mt-4 h-auto font-semibold text-gray-500 italic">
//                 {product.description}
//               </p>
//               <div className="flex justify-between my-2 items-center">
//                 <button className="px-4 bg-[#4ae2e2] italic text-base text-white font-semibold rounded py-1">
//                   {product.ProductStatus}
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (product.voters?.includes(user?.email)) {
//                       toast.error("You've already voted for this product");
//                     } else {
//                       handleVoteCount(product);
//                     }
//                   }}
//                   disabled={user?.email === product?.email}
//                   className={`py-1 px-4 hover:bg-red-600 hover:scale-105 bg-[#4ae2e2] hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
//                     user?.email === product?.email ? "cursor-not-allowed opacity-60 hover:text-black" : ""
//                   }`}
//                 >
//                   <BiUpvote className="text-xl" />
//                   <span className="text-lg">{product?.upVote || 0}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center">
//         {Array.from({
//           length: Math.ceil(acceptedProducts.length / productsPerPage),
//         }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => paginate(index + 1)}
//             className={`px-6 py-2 text-3xl mx-2 bg-white rounded-md hover:bg-gray-300 focus:outline-none ${currentPage === index + 1 ? "bg-white" : ""}`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Products;

import { useEffect, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UseAxios from "../../UseHook/UseAxios";
import UseAuth from "../../UseHook/UseAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosHook from "../../UseHook/UseAxiosHook";
import UseProducts from "../../UseHook/UseProducts";
import { IoSearch } from "react-icons/io5";

const Products = () => {
  const [acceptedProducts, refetch] = UseProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const axios = useAxiosHook();
  const axiosSecure = UseAxios();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { mutateAsync: voteIncrement } = useMutation({
    mutationFn: async ({ id, userEmail }) =>
      await axiosSecure.put(`/voteCount/${id}`, { userEmail }),
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchTerm ? filteredProducts : acceptedProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleVoteCount = async (product) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      await voteIncrement({ id: product._id, userEmail: user.email });
      refetch();
      toast("Count your vote successfully", { icon: "👏" });
    } catch (error) {
      console.error("Error incrementing vote:", error);
    }
  };

  useEffect(() => {
    const fetchAcceptedProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setAcceptedProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAcceptedProducts();
  }, [axios]);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    try {
      const response = await axios.get(`/api/products/search?keyword=${searchTerm}`);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="bg-[#3ec8f1] py-20">
      <label className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300" htmlFor="search-bar">
        <input
          id="search-bar"
          placeholder="Enter your keyword here"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="w-full flex gap-1 items-center md:w-auto text-2xl p-2 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
          Search <IoSearch />
        </button>
      </label>

      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {currentProducts?.map((product) => (
          <div key={product._id} className="bg-[#47d634af] p-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <img className="h-56 w-96 rounded-t-xl" src={product.productsImg} alt="" />
            <div className="px-4 py-3">
              <div className="flex flex-wrap items-center">
                {Array.isArray(product?.tags) &&
                  product?.tags?.map((tag, index) => (
                    <span key={index} className="mr-2 mb-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm font-semibold">
                      {tag}
                    </span>
                  ))}
              </div>
              <NavLink to={`/detels/${product._id}`}>
                <p className="text-2xl mt-1 hover:underline font-bold text-black">
                  {product.productsName}
                </p>
              </NavLink>
              <p className="text-sm mt-4 h-auto font-semibold text-gray-500 italic">
                {product.description}
              </p>
              <div className="flex justify-between my-2 items-center">
                <button className="px-4 bg-[#4ae2e2] italic text-base text-white font-semibold rounded py-1 btn-accept">
                  {product.ProductStatus}
                </button>
                <button
                  onClick={() => {
                    if (product.voters?.includes(user?.email)) {
                      toast.error("You've already voted for this product");
                    } else {
                      handleVoteCount(product);
                    }
                  }}
                  disabled={user?.email === product?.email}
                  className={`py-1 px-4 hover:bg-red-600 hover:scale-105 bg-[#4ae2e2] hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                    user?.email === product?.email ? "cursor-not-allowed opacity-60 hover:text-black" : ""
                  }`}
                >
                  <BiUpvote className="text-xl" />
                  <span className="text-lg">{product?.upVote || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {Array.from({
          length: Math.ceil(acceptedProducts.length / productsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-6 py-2 text-3xl mx-2 bg-white rounded-md hover:bg-gray-300 focus:outline-none ${currentPage === index + 1 ? "bg-white" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;

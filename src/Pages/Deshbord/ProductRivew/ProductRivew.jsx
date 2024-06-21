// import { NavLink } from "react-router-dom";
// import UseAxios from "../../../UseHook/UseAxios";

// import { useEffect, useState } from "react";
// import HookProducts from "../../../UseHook/HookProducts";
// import Loader from "../../../Route/Loader";
// import { toast } from "react-toastify";


// const ProductRivew = () => {
//   const [products, loading, refetch] = HookProducts();
//   const axiosSecure = UseAxios();

//   // getitem from sessionStorage
//   const initialDisabledButtons =
//     JSON.parse(sessionStorage.getItem("disabledButtons")) || {};
//   const [disabledButtons, setDisabledButtons] = useState(
//     initialDisabledButtons
//   );

//   useEffect(() => {
//     sessionStorage.setItem("disabledButtons", JSON.stringify(disabledButtons));
//   }, [disabledButtons]);

//   // Accepted product
//   const handleAcceptProduct = async (productId) => {
//     try {
//       await axiosSecure.put(`/acceptedProduct/${productId}`, {
//         status: "Accepted",
//       });
//       setDisabledButtons((prev) => ({ ...prev, [productId]: true }));
//       refetch();
//       console.log("Product accepted successfully");
//     } catch (error) {
//       console.error("Error accepting product:", error);
//     }
//   };

//   // Rejected product
//   const handleRejectProduct = async (productId) => {
//     try {
//       await axiosSecure.put(`/rejectedProduct/${productId}`, {
//         status: "Rejected",
//       });
//       setDisabledButtons((prev) => ({ ...prev, [productId]: true }));
//       refetch();
//       console.log("Product rejected successfully");
//     } catch (error) {
//       console.error("Error rejecting product:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center mt-8">
//         <Loader></Loader>
//       </div>
//     );
//   }

//   // Featured products
//   const handleFeaturedProduct = async (productId) => {
//     try {
//       await axiosSecure.put(`/productType/${productId}`, {
//         status: "Featured",
//       });
//       refetch();
//       console.log("Product Type change successfully");
//       toast.success("Successfully mark as Featured");
//     } catch (error) {
//       console.error("Error Type updating product:", error);
//     }
//   };

//   // Sort products based on ProductStatus
//   const sortedProducts = [...products].sort((a, b) => {
//     if (a.ProductStatus === "Pending") {
//       return -1; // Move 'a' before 'b' if 'a' is "Pending"
//     }
//     if (a.ProductStatus === "Accepted" && b.ProductStatus === "Accept") {
//       return -1; // Move 'a' before 'b' if 'a' is "Accepted" and 'b' is "Rejected"
//     }
//     if (a.ProductStatus === "Rejected" && b.ProductStatus !== "Rejected") {
//       return 1; // Move 'b' before 'a' if 'a' is "Rejected" and 'b' is not "Rejected"
//     }
//     return 0; // Keep the order unchanged otherwise
//   });
  
//     return (
//       <>
//       {/* component */}
//       <div className="flex min-h-screen items-center justify-center bg-white">
//         <div className="p-6 overflow-scroll px-0">
//           <table className="w-full min-w-max table-auto text-left">
//             <thead>
//               <tr>
//               <th className="py-2 px-4 border">Product Name</th>
//               <th className="py-2 px-4 border">Status</th>
//               <th className="py-2 px-4 border">Accept</th>
//               <th className="py-2 px-4 border">Reject</th>
//               <th className="py-2 px-4 border">Featured</th>
//               <th className="py-2 px-4 border">Details</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {sortedProducts?.map((product) => (
//                 <tr key={product._id}>
                 
//                   <td className="p-4 border-b border-blue-gray-50">
//                     <p className="block antialiased font-semibold italic text-gray-700 text-xl leading-normal text-blue-gray-900">
//                       {product.productsName}
//                     </p>
//                   </td>

//                   <td className="p-4 border-b border-blue-gray-50">
//                     <div className="w-max">
//                       <div
//                         className={`relative mx-3 grid items-center font-semibold whitespace-nowrap select-none py-1 px-2 text-sm rounded-md ${
//                           product.ProductStatus === "Accepted"
//                             ? "bg-green-200 text-slate-700"
//                             : product.ProductStatus === "Pending"
//                             ? "bg-slate-200 text-slate-700"
//                             : "bg-red-300 text-slate-700"
//                         }`}
//                         style={{ opacity: 1 }}
//                       >
//                         <span>{product.ProductStatus}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4 border-b border-blue-gray-50">
//                     <button
//                       onClick={() => handleAcceptProduct(product._id)}
//                       disabled={disabledButtons[product._id]}
//                       className={`mx-4 text-sm ${
//                         disabledButtons[product._id]
//                           ? "bg-blue-400 hover:bg-blue-400 cursor-not-allowed"
//                           : "bg-blue-500 hover:bg-blue-700"
//                       } text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
//                     >
//                       {product.ProductStatus === "Accepted"
//                         ? "Accepted"
//                         : "Accept"}
//                     </button>
//                   </td>
//                   <td className="p-4 border-b border-blue-gray-50">
//                     <button
//                       onClick={() => handleRejectProduct(product._id)}
//                       disabled={disabledButtons[product._id]}
//                       className={`text-[15px] ${
//                         disabledButtons[product._id]
//                           ? "bg-red-300 hover:bg-red-300 cursor-not-allowed"
//                           : "bg-red-500 hover:bg-red-700"
//                       } text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
//                     >
//                       {product.ProductStatus === "Rejected"
//                         ? "Rejected"
//                         : "Reject"}
//                     </button>
//                   </td>
//                   <td className="p-4 border-b border-blue-gray-50">
//                     <button
//                       onClick={() => handleFeaturedProduct(product._id)}
//                       className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white dark:hover:text-gray-900"
//                     >
//                       <span
//                         className={`relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md ${
//                           product.ProductType === "Featured"
//                             ? "cursor-not-allowed bg-opacity-0"
//                             : "group-hover:bg-opacity-0"
//                         }`}
//                       >
//                         {product.ProductType === "Featured"
//                           ? "Featured"
//                           : "Make Feature"}
//                       </span>
//                     </button>
//                   </td>
//                   <td className="p-4 border-b border-blue-gray-50">
//                     <NavLink to={`/details/${product._id}`}>
//                       {" "}
//                       <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white">
//                         <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//                           View Details
//                         </span>
//                       </button>
//                     </NavLink>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//     );
// };

// export default ProductRivew;













import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UseAxios from "../../../UseHook/UseAxios";
import HookProducts from "../../../UseHook/HookProducts";
import Loader from "../../../Route/Loader";
import { toast } from "react-toastify";

const ProductRivew = () => {
    const [products, loading, refetch] = HookProducts();
    const axiosSecure = UseAxios();
  
    // getitem from sessionStorage
    const initialDisabledButtons =
      JSON.parse(sessionStorage.getItem("disabledButtons")) || {};
    const [disabledButtons, setDisabledButtons] = useState(
      initialDisabledButtons
    );

  useEffect(() => {
        sessionStorage.setItem("disabledButtons", JSON.stringify(disabledButtons));
      }, [disabledButtons]);
    
      // Accepted product
      const handleAcceptProduct = async (productId) => {
        try {
          await axiosSecure.put(`/acceptedProduct/${productId}`, {
            status: "Accepted",
          });
          setDisabledButtons((prev) => ({ ...prev, [productId]: true }));
          refetch();
          console.log("Product accepted successfully");
        } catch (error) {
          console.error("Error accepting product:", error);
        }
      };

       // Featured products
  const handleFeaturedProduct = async (productId) => {
    try {
      await axiosSecure.put(`/productType/${productId}`, {
        status: "Featured",
      });
      refetch();
      console.log("Product Type change successfully");
      toast.success("Successfully mark as Featured");
    } catch (error) {
      console.error("Error Type updating product:", error);
    }
  };

  // Sort products based on ProductStatus
  const sortedProducts = [...products].sort((a, b) => {
    if (a.ProductStatus === "Pending") {
      return -1; // Move 'a' before 'b' if 'a' is "Pending"
    }
    if (a.ProductStatus === "Accepted" && b.ProductStatus === "Accept") {
      return -1; // Move 'a' before 'b' if 'a' is "Accepted" and 'b' is "Rejected"
    }
    if (a.ProductStatus === "Rejected" && b.ProductStatus !== "Rejected") {
      return 1; // Move 'b' before 'a' if 'a' is "Rejected" and 'b' is not "Rejected"
    }
    return 0; // Keep the order unchanged otherwise
  });
  

  // Accepted product
 
  // Rejected product
  // const handleRejectProduct = async (productId) => {
  //   try {
  //     await axiosSecure.put(`/rejectedProduct/${productId}`, {
  //       status: "Rejected",
  //     });
  //     // Update product status in local state
  //     const updatedProducts = products.map((product) =>
  //       product._id === productId ? { ...product, ProductStatus: "Rejected" } : product
  //     );
  //     toast.success("Product rejected successfully");
  //     refetch();
  //   } catch (error) {
  //     console.error("Error rejecting product:", error);
  //   }
  // };
  const handleRejectProduct = async (productId) => {
        try {
          await axiosSecure.put(`/rejectedProduct/${productId}`, {
            status: "Rejected",
          });
          setDisabledButtons((prev) => ({ ...prev, [productId]: true }));
          refetch();
          console.log("Product rejected successfully");
        } catch (error) {
          console.error("Error rejecting product:", error);
        }
      };

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  // Featured products
  // const handleFeaturedProduct = async (productId) => {
  //   try {
  //     await axiosSecure.put(`/productType/${productId}`, {
  //       status: "Featured",
  //     });
  //     toast.success("Successfully marked as Featured");
  //     refetch();
  //   } catch (error) {
  //     console.error("Error updating product type:", error);
  //   }
  // };

  // Sort products based on ProductStatus
  // const sortedProducts = [...products].sort((a, b) => {
  //   if (a.ProductStatus === "Pending") {
  //     return -1; // Move 'a' before 'b' if 'a' is "Pending"
  //   }
  //   if (a.ProductStatus === "Accepted" && b.ProductStatus === "Pending") {
  //     return -1; // Move 'a' before 'b' if 'a' is "Accepted" and 'b' is "Pending"
  //   }
  //   if (a.ProductStatus === "Rejected" && b.ProductStatus !== "Rejected") {
  //     return 1; // Move 'b' before 'a' if 'a' is "Rejected" and 'b' is not "Rejected"
  //   }
  //   return 0; // Keep the order unchanged otherwise
  // });

  return (
    <>
      {/* component */}
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="p-6 w-full">
          <table className="w-full table-auto text-left bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Accept</th>
                <th className="py-2 px-4 border">Reject</th>
                <th className="py-2 px-4 border">Featured</th>
                <th className="py-2 px-4 border">Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product._id} className="bg-white">
                  <td className="p-4 border-b border-gray-200">{product.productsName}</td>
                  <td className="p-4 border-b border-gray-200">
                    <div
                      className={`py-1 px-2 text-sm rounded-md ${
                        product.ProductStatus === "Accepted"
                          ? "bg-green-200 text-green-800"
                          : product.ProductStatus === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {product.ProductStatus}
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => handleAcceptProduct(product._id)}
                      disabled={disabledButtons[product._id]}
                      className={`text-sm px-4 py-2 rounded ${
                        disabledButtons[product._id]
                          ? "bg-blue-400 text-white cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {product.ProductStatus === "Accepted" ? "Accepted" : "Accept"}
                    </button>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => handleRejectProduct(product._id)}
                      disabled={disabledButtons[product._id]}
                      className={`text-sm px-4 py-2 rounded ${
                        disabledButtons[product._id]
                          ? "bg-red-300 text-white cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700 text-white"
                      }`}
                    >
                      {product.ProductStatus === "Rejected" ? "Rejected" : "Reject"}
                    </button>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => handleFeaturedProduct(product._id)}
                      className={`text-sm px-4 py-2 rounded ${
                        product.ProductType === "Featured"
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-gray-600 hover:bg-gray-800 text-white"
                      }`}
                      disabled={product.ProductType === "Featured"}
                    >
                      {product.ProductType === "Featured" ? "Featured" : "Make Featured"}
                    </button>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <NavLink to={`/details/${product._id}`}>
                      <button className="text-sm px-4 py-2 rounded bg-green-400 hover:bg-green-600 text-white">
                        View Details
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductRivew;






// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import UseAxios from "../../../UseHook/UseAxios";
// import HookProducts from "../../../UseHook/HookProducts";
// import Loader from "../../../Route/Loader";
// import { toast } from "react-toastify";

// const ProductRivew = () => {
//   const [products, loading, refetch] = HookProducts();
//   const axiosSecure = UseAxios();

//   // get item from sessionStorage
//   const initialDisabledButtons =
//     JSON.parse(sessionStorage.getItem("disabledButtons")) || {};
//   const [disabledButtons, setDisabledButtons] = useState(
//     initialDisabledButtons
//   );

//   useEffect(() => {
//     sessionStorage.setItem("disabledButtons", JSON.stringify(disabledButtons));
//   }, [disabledButtons]);

//   // Accepted product
//   const handleAcceptProduct = async (productId) => {
//     try {
//       await axiosSecure.put(`/acceptedProduct/${productId}`, {
//         status: "Accepted",
//       });
//       // Update product status in local state
//       const updatedProducts = products.map((product) =>
//         product._id === productId ? { ...product, ProductStatus: "Accepted" } : product
//       );
//       toast.success("Product accepted successfully");
//       refetch();
//     } catch (error) {
//       console.error("Error accepting product:", error);
//     }
//   };

//   // Rejected product
//   const handleRejectProduct = async (productId) => {
//     try {
//       await axiosSecure.put(`/rejectedProduct/${productId}`, {
//         status: "Rejected",
//       });
//       // Update product status in local state
//       const updatedProducts = products.map((product) =>
//         product._id === productId ? { ...product, ProductStatus: "Rejected" } : product
//       );
//       toast.success("Product rejected successfully");
//       refetch();
//     } catch (error) {
//       console.error("Error rejecting product:", error);
//     }
//   };

//   // Featured product
//   const handleFeaturedProduct = async (productId) => {
//     try {
//       await axiosSecure.put(`/productType/${productId}`, {
//         status: "Featured",
//       });
//       toast.success("Successfully marked as Featured");
//       refetch();
//     } catch (error) {
//       console.error("Error updating product type:", error);
//     }
//   };

//   // Sorting products based on ProductStatus
//   const sortedProducts = [...products].sort((a, b) => {
//     if (a.ProductStatus === "Pending") {
//       return -1; // Move 'a' before 'b' if 'a' is "Pending"
//     }
//     if (a.ProductStatus === "Accepted" && b.ProductStatus === "Accept") {
//       return -1; // Move 'a' before 'b' if 'a' is "Accepted" and 'b' is "Rejected"
//     }
//     if (a.ProductStatus === "Rejected" && b.ProductStatus !== "Rejected") {
//       return 1; // Move 'b' before 'a' if 'a' is "Rejected" and 'b' is not "Rejected"
//     }
//     return 0; // Keep the order unchanged otherwise
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center mt-8">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-white">
//       <div className="p-6 w-full">
//         <table className="w-full table-auto text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="py-2 px-4 border">Product Name</th>
//               <th className="py-2 px-4 border">Status</th>
//               <th className="py-2 px-4 border">Accept</th>
//               <th className="py-2 px-4 border">Reject</th>
//               <th className="py-2 px-4 border">Featured</th>
//               <th className="py-2 px-4 border">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedProducts.map((product) => (
//               <tr key={product._id} className="border-b border-gray-100">
//                 <td className="py-3 px-4 border">{product.productsName}</td>
//                 <td className="py-3 px-4 border">
//                   <div
//                     className={`px-2 py-1 text-sm font-semibold rounded ${
//                       product.ProductStatus === "Accepted"
//                         ? "bg-green-200 text-green-800"
//                         : product.ProductStatus === "Pending"
//                         ? "bg-yellow-200 text-yellow-800"
//                         : "bg-red-200 text-red-800"
//                     }`}
//                   >
//                     {product.ProductStatus}
//                   </div>
//                 </td>
//                 <td className="py-3 px-4 border">
//                   <button
//                     onClick={() => handleAcceptProduct(product._id)}
//                     disabled={disabledButtons[product._id]}
//                     className={`py-1 px-4 rounded-md text-sm font-semibold focus:outline-none ${
//                       disabledButtons[product._id]
//                         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                         : "bg-green-500 hover:bg-green-600 text-white"
//                     }`}
//                   >
//                     {product.ProductStatus === "Accepted" ? "Accepted" : "Accept"}
//                   </button>
//                 </td>
//                 <td className="py-3 px-4 border">
//                   <button
//                     onClick={() => handleRejectProduct(product._id)}
//                     disabled={disabledButtons[product._id]}
//                     className={`py-1 px-4 rounded-md text-sm font-semibold focus:outline-none ${
//                       disabledButtons[product._id]
//                         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                         : "bg-red-500 hover:bg-red-600 text-white"
//                     }`}
//                   >
//                     {product.ProductStatus === "Rejected" ? "Rejected" : "Reject"}
//                   </button>
//                 </td>
//                 <td className="py-3 px-4 border">
//                   <button
//                     onClick={() => handleFeaturedProduct(product._id)}
//                     className={`py-1 px-4 rounded-md text-sm font-semibold focus:outline-none ${
//                       product.ProductType === "Featured"
//                         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                         : "bg-blue-500 hover:bg-blue-600 text-white"
//                     }`}
//                     disabled={product.ProductType === "Featured"}
//                   >
//                     {product.ProductType === "Featured" ? "Featured" : "Make Featured"}
//                   </button>
//                 </td>
//                 <td className="py-3 px-4 border">
//                   <NavLink to={`/details/${product._id}`}>
//                     <button className="py-1 px-4 rounded-md text-sm font-semibold focus:outline-none bg-blue-500 hover:bg-blue-600 text-white">
//                       View Details
//                     </button>
//                   </NavLink>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductRivew;




  
